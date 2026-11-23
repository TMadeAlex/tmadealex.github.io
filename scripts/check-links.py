#!/usr/bin/env python3
"""Check the built site: does every link and file it points to exist?

Run it after a build, from the top of the repository:

    npm run build
    python3 -I scripts/check-links.py            # checks the out/ folder
    python3 -I scripts/check-links.py some/dir   # or another folder

What it does:
  1. Walks every .html and .css file in the folder, including the styles
     written inside a page (<style> blocks and style="..." attributes).
  2. Checks that each link, picture, script, stylesheet and font that points
     inside the site is really there (and, for a link like page/#part, that
     the part exists on that page).
  3. Lists every link that leaves the site, for a person to read.
  4. Says so if a page would load anything from another website, would send
     a visitor to another website by itself (<meta http-equiv="refresh">), or
     has a form that sends to another website. This site is meant to do none
     of these.

It exits with 1 if something inside the site is broken, or if a page does one
of the three things in step 4. Otherwise it exits with 0. It uses only Python's
standard library, and it never goes online.
"""

import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

# Attributes that make the browser fetch a file as the page loads.
LOADS = {
    ("script", "src"), ("img", "src"), ("img", "srcset"), ("source", "src"), ("source", "srcset"),
    ("video", "src"), ("video", "poster"), ("audio", "src"), ("track", "src"), ("iframe", "src"),
    ("embed", "src"), ("object", "data"), ("input", "src"), ("link", "href"), ("link", "imagesrcset"),
    ("use", "href"), ("image", "href"),
}
# Attributes a person follows by choosing to.
FOLLOWS = {("a", "href"), ("area", "href")}
# Attributes that send what a visitor types somewhere.
SENDS = {("form", "action"), ("button", "formaction"), ("input", "formaction")}
# <link rel=...> values that only point somewhere and fetch nothing.
POINTERS = {"canonical", "alternate", "author", "license", "me", "help", "next", "prev", "search"}
SKIP = ("data:", "blob:", "about:", "javascript:")
CONTACT = ("mailto:", "tel:", "sms:")
CSS_URL = re.compile(r"""url\(\s*(['"]?)(.*?)\1\s*\)""")
# @import "file.css" (the url("file.css") form is caught by CSS_URL).
CSS_IMPORT = re.compile(r"""@import\s+['"]([^'"]+)['"]""")
# The address in <meta http-equiv="refresh" content="5; url=...">.
REFRESH_URL = re.compile(r"""^\s*[\d.]*\s*[;,]?\s*(?:url\s*=\s*)?(['"]?)(.*?)\1\s*$""", re.IGNORECASE)

# What each kind of reference does, said for a person when it points elsewhere.
WHY = {
    "load": "loads a file from another website",
    "move": "sends the visitor to another website by itself (meta refresh)",
    "send": "has a form that sends to another website",
}


def css_refs(text):
    """Every address a piece of CSS fetches: url(...) and @import."""
    found = [url.strip() for _, url in CSS_URL.findall(text) if url.strip()]
    return found + [url.strip() for url in CSS_IMPORT.findall(text) if url.strip()]


class Page(HTMLParser):
    """Collects what one page points to, and the ids it defines."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.refs = []   # (kind, tag, value): kind is "load", "follow", "move" or "send"
        self.ids = set()
        self.base = None
        self.in_style = False

    def handle_starttag(self, tag, attrs):
        attrs = {k: (v or "") for k, v in attrs}
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag == "a" and attrs.get("name"):
            self.ids.add(attrs["name"])
        if tag == "base" and attrs.get("href"):
            self.base = attrs["href"]
        if tag == "style":
            self.in_style = True
        if tag == "meta" and attrs.get("http-equiv", "").strip().lower() == "refresh":
            match = REFRESH_URL.match(attrs.get("content", ""))
            if match and match.group(2).strip():
                self.refs.append(("move", tag, match.group(2).strip()))
        rel = set(attrs.get("rel", "").lower().split())
        for name, value in attrs.items():
            value = value.strip()
            if not value:
                continue
            name = name.replace("xlink:", "")
            if (tag, name) in SENDS:
                self.refs.append(("send", tag, value))
            elif (tag, name) in FOLLOWS or (tag == "link" and name == "href" and rel & POINTERS):
                self.refs.append(("follow", tag, value))
            elif (tag, name) in LOADS:
                if name in ("srcset", "imagesrcset"):
                    for part in value.split(","):
                        if part.strip():
                            self.refs.append(("load", tag, part.strip().split()[0]))
                else:
                    self.refs.append(("load", tag, value))
            elif name == "style":
                for url in css_refs(value):
                    self.refs.append(("load", tag, url))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag == "style":
            self.in_style = False

    def handle_endtag(self, tag):
        if tag == "style":
            self.in_style = False

    def handle_data(self, data):
        if self.in_style:
            for url in css_refs(data):
                self.refs.append(("load", "style", url))


def target(root, page, ref):
    """The file an internal address means, or None if nothing is there."""
    path = unquote(urlsplit(ref).path)
    if path.startswith("/"):
        where = root / path.lstrip("/")
    elif path == "":
        return page
    else:
        where = page.parent / path
    where = Path(*where.parts)
    try:
        where.resolve().relative_to(root.resolve())
    except ValueError:
        return None
    if path.endswith("/"):
        candidates = [where / "index.html"]
    else:
        candidates = [where, where.with_name(where.name + ".html"), where / "index.html"]
    for candidate in candidates:
        if candidate.is_file():
            return candidate
    return None


def main():
    root = Path(sys.argv[1] if len(sys.argv) > 1 else "out")
    if not root.is_dir():
        print(f"FAIL  there is no {root}/ folder. Run the build first: npm run build")
        return 1

    pages = {}
    for file in sorted(root.rglob("*.html")):
        parser = Page()
        parser.feed(file.read_text(encoding="utf-8", errors="replace"))
        pages[file] = parser

    broken = []      # (where, what, why)
    outside = {}     # external link -> pages that carry it
    contact = {}     # mailto: and the like -> pages that carry it
    leaks = []       # (where, what, why): loads from, moves to or sends to another website
    checked = 0

    def look(file, kind, ref):
        nonlocal checked
        low = ref.lower()
        if low.startswith(SKIP):
            return
        shown = file.relative_to(root).as_posix()
        if low.startswith(CONTACT):
            contact.setdefault(ref, set()).add(shown)
            return
        parts = urlsplit(ref)
        if parts.scheme or parts.netloc:
            if kind in WHY:
                leaks.append((shown, ref, WHY[kind]))
            else:
                outside.setdefault(ref, set()).add(shown)
            return
        checked += 1
        found = target(root, file, ref)
        if found is None:
            broken.append((shown, ref, "nothing is at that address"))
            return
        if parts.fragment and found in pages and unquote(parts.fragment) not in pages[found].ids:
            broken.append((shown, ref, f"the page exists, but it has no part called #{parts.fragment}"))

    for file, parser in pages.items():
        if parser.base:
            broken.append((file.relative_to(root).as_posix(), parser.base, "a <base> tag changes every link; remove it"))
        for kind, _tag, ref in parser.refs:
            look(file, kind, ref)

    sheets = sorted(root.rglob("*.css"))
    for sheet in sheets:
        for url in css_refs(sheet.read_text(encoding="utf-8", errors="replace")):
            look(sheet, "load", url)

    print(f"Checked {len(pages)} pages and {len(sheets)} stylesheets in {root}/: {checked} internal links and files.")

    if outside:
        print(f"\nLinks that leave the site ({len(outside)}), for a person to read:")
        for ref in sorted(outside):
            print(f"  {ref}    (on {', '.join(sorted(outside[ref]))})")
    else:
        print("\nLinks that leave the site: none.")

    if contact:
        print(f"\nContact links ({len(contact)}), for a person to read:")
        for ref in sorted(contact):
            print(f"  {ref}    (on {', '.join(sorted(contact[ref]))})")

    if leaks:
        print(f"\nFAIL  {len(leaks)} reference(s) reach another website by themselves. This site loads nothing from elsewhere,")
        print("      sends nobody elsewhere unasked, and sends no form elsewhere:")
        for shown, ref, why in leaks:
            print(f"  {shown}: {ref}    ({why})")

    if broken:
        print(f"\nFAIL  {len(broken)} broken link(s) inside the site:")
        for shown, ref, why in broken:
            print(f"  {shown}: {ref}    ({why})")

    if broken or leaks:
        return 1
    print("\nok    every internal link and file resolves, and nothing loads from, moves to or sends to another website.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
