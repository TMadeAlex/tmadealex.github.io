import Link from "next/link";
import NavLinks from "@/components/NavLinks";
import SupportButton from "@/components/support/SupportButton";
import SupportWindow, { supportTitleId } from "@/components/support/SupportWindow";
import { site } from "@/data/site";
import { support } from "@/data/support";

/**
 * The top row: his name, with the cyan dot of his TRADERMADE wordmark, the way
 * to the other pages, and the Support button. While the site is not ready it carries only the
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
          <div className="header-end">
            <NavLinks links={site.nav} label={site.ui.menu} />
            <SupportButton label={support.button} closeLabel={support.ui.close} titleId={supportTitleId}>
              <SupportWindow />
            </SupportButton>
          </div>
        </>
      ) : (
        <p className="brand-quiet">{site.organisation}</p>
      )}
    </header>
  );
}
