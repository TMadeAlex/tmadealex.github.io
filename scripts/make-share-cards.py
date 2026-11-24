"""Draw the pictures a link shows when it is shared, and the site's raster icons.

    npm run build                          # first: the cards borrow the site's own fonts from out/
    python3 -I scripts/make-share-cards.py

When a link to the site is pasted into a message, a chat or a post, the app shows a picture
with it (an Open Graph card). This draws one card for each page, 1200 by 630 pixels, in his
TRADERMADE colours, and writes them to public/social/. It also draws the round mark as PNG
icons for phones (public/apple-touch-icon.png, public/icon-512.png).

The words come from src/data (the same files as the site), the colours from src/data/site.ts,
and the fonts from the built site, so nothing is fetched from anywhere. No photograph of his is
drawn into a card: his pictures stay on his own site. The candles on the cards are made up, as
everywhere on the site.

Needs Google Chrome on this Mac; it runs without a window (headless). Run it again whenever the
words or colours change, and commit the new pictures.
"""

from __future__ import annotations

import html
import pathlib
import random
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data"
OUT = ROOT / "public" / "social"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
W, H = 1200, 630


def fail(message: str) -> None:
    sys.exit(f"make-share-cards: {message}")


def read(name: str) -> str:
    return (DATA / name).read_text()


def field(text: str, pattern: str, what: str) -> str:
    match = re.search(pattern, text, re.S)
    if not match:
        fail(f"could not find {what} in src/data; has its shape changed?")
    return match.group(1)


# ------------------------------------------------------------------ words and colours, from src/data

site_ts, home_ts, trading_ts, photo_ts, contact_ts, schedule_ts = (
    read(n) for n in ("site.ts", "home.ts", "trading.ts", "photography.ts", "contact.ts", "schedule.ts")
)
TONE = {k: field(site_ts, rf'\b{k}: "(#[0-9a-fA-F]{{6}})"', f"the colour {k}") for k in ("primary", "deep", "mid", "tint", "onDark", "onDarkSoft")}
NAME = field(site_ts, r'\bname: "([^"]+)"', "the site's name")
HOST = field(site_ts, r'href: "https://github\.com/TMadeAlex/(tmadealex\.github\.io)"', "the site's address")
KICKER = field(home_ts, r'kicker: \{ text: "([^"]+)"', "the front page's kicker")
TURNING = re.findall(r'"([^"]+)"', field(home_ts, r"turning: \[([^\]]+)\]", "the turning roles"))
TRADING_LEAD = field(trading_ts, r'lead: \{ text: "([^"]+)"', "the trading page's lead")
PHOTO_LEAD = field(photo_ts, r'lead: \{ text: "([^"]+)"', "the photography page's lead")
BYLINE = field(photo_ts, r'byline: "([^"]+)"', "the photography byline")
CONTACT_LEAD = field(contact_ts, r'lead: "([^".]+\.)', "the contact page's lead")
POSTED = re.findall(r'short: "([^"]+)",.*?posted: "([^"]+)"', schedule_ts, re.S)
HANDLES = re.findall(r'place: "([^"]+)",\s*handle: "([^"]+)"', contact_ts)[:4]


# ------------------------------------------------------------------ the site's own fonts, from the build

def font_faces() -> str:
    media = ROOT / "out" / "_next" / "static" / "media"
    sheets = [p for p in (ROOT / "out" / "_next" / "static").rglob("*.css") if "@font-face" in p.read_text()]
    if not media.is_dir() or not sheets:
        fail("the built site is missing: run `npm run build` first, so the cards can borrow its fonts.")
    faces = re.findall(r"@font-face\s*\{[^}]*\}", sheets[0].read_text())
    return "\n".join(f.replace("../media/", media.as_uri() + "/") for f in faces)


# ------------------------------------------------------------------ made-up candles (decoration, as on the site)

def candles(seed: int, count: int, width: float, height: float, pad: float = 0.1) -> str:
    rnd = random.Random(seed)
    series, price, trend = [], 0.0, 0.4
    for i in range(count):
        if i % 12 == 0:
            trend = (rnd.random() - 0.35) * 1.4
        move = (rnd.random() - 0.5 + trend * 0.18) * 1.6
        close = price + move
        high = max(price, close) + rnd.random() * 0.7
        low = min(price, close) - rnd.random() * 0.7
        series.append((price, high, low, close))
        price = close
    lo = min(c[2] for c in series)
    hi = max(c[1] for c in series)
    y = lambda v: height * pad + (1 - (v - lo) / (hi - lo)) * height * (1 - 2 * pad)
    step = width / count
    body = step * 0.56
    out, total, weight = [], 0.0, 0.0
    line = []
    for i, (o, h, l, c) in enumerate(series):
        x = step * i + step / 2
        up = c >= o
        top, bottom = y(max(o, c)), y(min(o, c))
        cls = "up" if up else "down"
        out.append(f'<line class="w {cls}" x1="{x:.1f}" x2="{x:.1f}" y1="{y(h):.1f}" y2="{y(l):.1f}"/>')
        out.append(f'<rect class="b {cls}" x="{x - body / 2:.1f}" y="{top:.1f}" width="{body:.1f}" height="{max(bottom - top, 1):.1f}" rx="1"/>')
        w = 1 + (i * 7) % 5
        total += (h + l + c) / 3 * w
        weight += w
        line.append(f"{'M' if i == 0 else 'L'}{x:.1f} {y(total / weight):.1f}")
    out.append(f'<path class="avg" d="{" ".join(line)}"/>')
    return f'<svg viewBox="0 0 {width} {height}" width="{width}" height="{height}">{"".join(out)}</svg>'


# ------------------------------------------------------------------ the cards

def page(body: str, faces: str) -> str:
    t = TONE
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>
{faces}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
html, body {{ width: {W}px; height: {H}px; overflow: hidden; background: {t['deep']}; }}
body {{ font-family: Poppins, sans-serif; color: color-mix(in oklab, {t['tint']} 92%, white); -webkit-font-smoothing: antialiased; }}
.card {{ position: relative; width: {W}px; height: {H}px; overflow: hidden;
  background:
    radial-gradient(760px 460px at 8% -10%, color-mix(in oklab, {t['deep']} 62%, {t['mid']}), transparent 70%),
    radial-gradient(620px 420px at 100% 110%, color-mix(in oklab, {t['mid']} 30%, transparent), transparent 70%),
    {t['deep']}; }}
.card::before {{ content: ""; position: absolute; inset: 0;
  background: repeating-linear-gradient(to right, color-mix(in oklab, {t['tint']} 5%, transparent) 0 1px, transparent 1px 96px);
  mask-image: linear-gradient(to bottom, black, transparent 85%); }}
.corner {{ position: absolute; width: 34px; height: 34px; border: 0 solid {t['primary']}; opacity: .9; }}
.tl {{ top: 28px; left: 28px; border-top-width: 3px; border-left-width: 3px; }}
.tr {{ top: 28px; right: 28px; border-top-width: 3px; border-right-width: 3px; }}
.bl {{ bottom: 28px; left: 28px; border-bottom-width: 3px; border-left-width: 3px; }}
.br {{ bottom: 28px; right: 28px; border-bottom-width: 3px; border-right-width: 3px; }}
.words {{ position: absolute; left: 76px; top: 78px; right: 76px; }}
.kicker {{ display: inline-flex; align-items: center; gap: 12px; padding: 9px 18px 9px 14px; border-radius: 999px;
  border: 1px solid color-mix(in oklab, {t['tint']} 16%, transparent); background: color-mix(in oklab, {t['deep']} 70%, transparent);
  font: 500 17px "JetBrains Mono", monospace; letter-spacing: .2em; text-transform: uppercase; color: {t['onDark']}; }}
.kdot {{ width: 11px; height: 11px; border-radius: 50%; background: {t['primary']}; box-shadow: 0 0 0 5px color-mix(in oklab, {t['primary']} 22%, transparent), 0 0 18px {t['primary']}; }}
h1 {{ margin-top: 26px; padding-bottom: .14em; margin-bottom: -.14em; font-weight: 600; letter-spacing: -.045em; line-height: .9;
  background: linear-gradient(180deg, color-mix(in oklab, {t['tint']} 92%, white) 35%, color-mix(in oklab, {t['tint']} 55%, {t['primary']}));
  -webkit-background-clip: text; background-clip: text; color: transparent; filter: drop-shadow(0 18px 40px rgba(0,0,0,.55)); }}
.dot {{ display: inline-block; width: .17em; height: .17em; margin-left: .05em; border-radius: 50%; background: {t['primary']};
  box-shadow: 0 0 .35em {t['primary']}; -webkit-text-fill-color: initial; }}
.lead {{ margin-top: 22px; max-width: 620px; font-size: 34px; font-weight: 300; line-height: 1.25; color: color-mix(in oklab, {t['tint']} 80%, {t['deep']}); }}
.roles {{ display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; max-width: 720px; list-style: none; }}
.roles li {{ padding: 9px 18px; border-radius: 999px; border: 1px solid color-mix(in oklab, {t['primary']} 45%, transparent);
  background: color-mix(in oklab, {t['primary']} 12%, transparent); font-size: 21px; font-weight: 500; color: color-mix(in oklab, {t['tint']} 92%, white); }}
.foot {{ position: absolute; left: 76px; right: 76px; bottom: 62px; display: flex; justify-content: space-between; align-items: center;
  font: 500 19px "JetBrains Mono", monospace; letter-spacing: .06em; color: color-mix(in oklab, {t['tint']} 62%, {t['deep']}); }}
.foot b {{ font-weight: 500; color: {t['onDark']}; }}
.session + .session {{ margin-left: 28px; }}
svg .w {{ stroke-width: 1.4; }} svg .up {{ stroke: {t['primary']}; fill: {t['primary']}; }}
svg .down {{ stroke: color-mix(in oklab, {t['tint']} 62%, {t['mid']}); fill: none; }}
svg rect.down {{ stroke-width: 1.4; }} svg .avg {{ fill: none; stroke: {t['mid']}; stroke-width: 2.2; }}
.field {{ position: absolute; right: -10px; bottom: 96px; opacity: .55; mask-image: linear-gradient(to right, transparent 0 38%, black 72%); }}
.pane {{ position: absolute; right: 64px; top: 118px; width: 470px; height: 360px; border-radius: 22px; overflow: hidden;
  border: 1px solid color-mix(in oklab, {t['tint']} 20%, transparent);
  background: radial-gradient(360px 200px at 20% 0%, color-mix(in oklab, {t['mid']} 24%, transparent), transparent 70%), color-mix(in oklab, {t['deep']} 70%, black);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.1), 0 40px 80px -30px rgba(0,0,0,.8), 0 0 90px -40px {t['primary']}; }}
.tabs {{ position: absolute; left: 18px; top: 16px; display: flex; gap: 8px; font: 500 14px "JetBrains Mono", monospace; }}
.tabs span {{ padding: 4px 12px; border-radius: 8px; border: 1px solid color-mix(in oklab, {t['tint']} 18%, transparent); color: color-mix(in oklab, {t['tint']} 65%, {t['deep']}); }}
.tabs .on {{ border-color: {t['primary']}; color: {t['primary']}; background: color-mix(in oklab, {t['primary']} 14%, transparent); }}
.tabs .note {{ border-style: dashed; }}
.pane svg {{ position: absolute; left: 18px; top: 58px; }}
.tag {{ position: absolute; right: 18px; top: 160px; padding: 3px 9px; border-radius: 5px; background: {t['primary']};
  color: {t['deep']}; font: 500 14px "JetBrains Mono", monospace; }}
.lens {{ position: absolute; right: 70px; top: 120px; width: 380px; height: 380px; border-radius: 50%;
  background: radial-gradient(circle at 38% 32%, color-mix(in oklab, {t['mid']} 40%, transparent), transparent 55%), radial-gradient(circle, #050a0b 0 58%, #0b1416 59% 100%);
  box-shadow: inset 0 0 0 10px #101b1d, inset 0 0 0 12px color-mix(in oklab, {t['tint']} 14%, transparent), 0 40px 80px -30px rgba(0,0,0,.85), 0 0 120px -50px {t['primary']}; }}
.aperture {{ position: absolute; inset: 44px; border-radius: 50%; overflow: hidden; }}
.aperture svg {{ width: 100%; height: 100%; display: block; }}
.blade {{ fill: color-mix(in oklab, #0a1416 90%, {t['mid']}); stroke: color-mix(in oklab, {t['tint']} 22%, transparent); stroke-width: .7; }}
.ring {{ position: absolute; inset: 22px; border-radius: 50%; border: 2px dashed color-mix(in oklab, {t['primary']} 45%, transparent); }}
.af {{ position: absolute; left: 50%; top: 50%; width: 76px; height: 54px; margin: -27px 0 0 -38px; border: 2px solid {t['primary']}; border-radius: 6px; box-shadow: 0 0 22px {t['primary']}; }}
.links {{ margin-top: 34px; display: grid; gap: 14px; list-style: none; }}
.links li {{ display: flex; gap: 18px; align-items: baseline; font-size: 30px; font-weight: 500; }}
.links span {{ width: 150px; font: 500 15px "JetBrains Mono", monospace; letter-spacing: .2em; text-transform: uppercase; color: color-mix(in oklab, {t['tint']} 55%, {t['deep']}); }}
</style></head><body><div class="card">
<span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>
{body}
</div></body></html>"""


def esc(text: str) -> str:
    return html.escape(text, quote=False)


def foot(path: str) -> str:
    sessions = "".join(f'<span class="session">{esc(short)} {esc(posted)}</span>' for short, posted in POSTED)
    return f'<p class="foot"><span><b>{esc(HOST)}</b>{esc(path)}</span><span>{sessions}</span></p>'


def iris() -> str:
    blades = "".join(
        f'<path class="blade" transform="rotate({i * 40})" d="M 0 -150 L 120 -150 L 22 -30 Q 0 -46 -12 -56 Z"/>' for i in range(9)
    )
    return f'<span class="aperture"><svg viewBox="-100 -100 200 200">{blades}</svg></span>'


def cards() -> dict[str, str]:
    t = esc
    roles = "".join(f"<li>{t(r)}</li>" for r in TURNING)
    return {
        "og-home": f"""
<div class="field">{candles(23, 64, 1100, 300)}</div>
<div class="words">
  <p class="kicker"><span class="kdot"></span>{t(KICKER)}</p>
  <h1 style="font-size:150px">{t(NAME)}<span class="dot"></span></h1>
  <ul class="roles">{roles}</ul>
</div>{foot("")}""",
        "og-trading": f"""
<div class="pane">
  <p class="tabs"><span class="on">{t(POSTED[0][0])}</span><span>{t(POSTED[1][0]) if len(POSTED) > 1 else ""}</span><span class="note">illustration</span></p>
  {candles(17, 40, 434, 286)}
  <span class="tag">+0.42%</span>
</div>
<div class="words">
  <p class="kicker"><span class="kdot"></span>{t(NAME)}</p>
  <h1 style="font-size:132px">Trading<span class="dot"></span></h1>
  <p class="lead">{t(TRADING_LEAD)}</p>
</div>{foot("/trading/")}""",
        "og-photography": f"""
<div class="lens"><span class="ring"></span>{iris()}<span class="af"></span></div>
<div class="words">
  <p class="kicker"><span class="kdot"></span>{t(BYLINE)}</p>
  <h1 style="font-size:100px">Photography<span class="dot"></span></h1>
  <p class="lead" style="max-width:520px">{t(PHOTO_LEAD)}</p>
</div>{foot("/photography/")}""",
        "og-contact": f"""
<div class="field">{candles(41, 64, 1100, 300)}</div>
<div class="words">
  <p class="kicker"><span class="kdot"></span>{t(NAME)}</p>
  <h1 style="font-size:132px">Contact<span class="dot"></span></h1>
  <ul class="links">{"".join(f"<li><span>{t(p)}</span>{t(h)}</li>" for p, h in HANDLES)}</ul>
</div>{foot("/contact/")}""",
    }


def mark(size: int) -> str:
    t = TONE
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>
html, body {{ margin: 0; width: {size}px; height: {size}px; overflow: hidden; background: {t['deep']}; }}
svg {{ display: block; }}</style></head><body>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="{size}" height="{size}">
<rect width="32" height="32" fill="{t['deep']}"/>
<circle cx="16" cy="16" r="11.5" fill="none" stroke="{t['mid']}" stroke-width="1.2"/>
<circle cx="16" cy="16" r="4.6" fill="{t['primary']}"/></svg></body></html>"""


def shoot(markup: str, target: pathlib.Path, width: int, height: int, work: pathlib.Path) -> None:
    source = work / f"{target.stem}.html"
    source.write_text(markup)
    run = subprocess.run(
        [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
         "--allow-file-access-from-files", f"--window-size={width},{height}", "--virtual-time-budget=4000",
         f"--screenshot={target}", source.as_uri()],
        capture_output=True, text=True, timeout=90,
    )
    if run.returncode != 0 or not target.exists():
        fail(f"Chrome could not draw {target.name}: {run.stderr.strip()[-400:]}")
    print(f"drew {target.relative_to(ROOT)}  ({width}x{height})")


def main() -> None:
    if not pathlib.Path(CHROME).exists():
        fail(f"Google Chrome is not at {CHROME}.")
    faces = font_faces()
    OUT.mkdir(parents=True, exist_ok=True)
    work = pathlib.Path(tempfile.mkdtemp(prefix="share-cards-"))
    try:
        for name, body in cards().items():
            shoot(page(body, faces), OUT / f"{name}.png", W, H, work)
        shoot(mark(180), ROOT / "public" / "apple-touch-icon.png", 180, 180, work)
        shoot(mark(512), ROOT / "public" / "icon-512.png", 512, 512, work)
    finally:
        shutil.rmtree(work, ignore_errors=True)


if __name__ == "__main__":
    main()
