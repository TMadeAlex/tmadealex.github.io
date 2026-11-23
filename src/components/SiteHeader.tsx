import Link from "next/link";
import NavLinks from "@/components/NavLinks";
import { site } from "@/data/site";
import { work } from "@/data/work";
import { gallery } from "@/data/gallery";

/**
 * The top row. While the site is not ready it carries only the name of the
 * place; once it is, the person's name and the way to the other pages.
 */
export default function SiteHeader() {
  const links = [
    { href: "/about/", label: site.labels.about },
    ...(work.length > 0 || gallery.length > 0 ? [{ href: "/work/", label: site.labels.work }] : []),
    { href: "/contact/", label: site.labels.contact },
  ];

  return (
    <header className="frame">
      <div className="beside-ribbon flex min-h-(--header-h) flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3">
        {site.ready ? (
          <>
            <Link href="/" className="font-display text-xl">
              {site.name}
            </Link>
            <NavLinks links={links} label={site.ui.menu} />
          </>
        ) : (
          <p className="text-sm text-ink-soft">{site.organisation}</p>
        )}
      </div>
    </header>
  );
}
