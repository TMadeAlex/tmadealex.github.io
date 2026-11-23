import Link from "next/link";
import NavLinks from "@/components/NavLinks";
import { site } from "@/data/site";

/**
 * The top row: his name, with the cyan dot of his TRADERMADE wordmark, and the
 * way to the other pages. While the site is not ready it carries only the
 * name of the organisation.
 */
export default function SiteHeader() {
  return (
    <header className="frame site-header">
      {site.ready ? (
        <>
          <Link href="/" className="brand" aria-label={site.ui.home}>
            {site.name}
            <span className="dot" aria-hidden="true" />
          </Link>
          <NavLinks links={site.nav} label={site.ui.menu} />
        </>
      ) : (
        <p className="brand-quiet">{site.organisation}</p>
      )}
    </header>
  );
}
