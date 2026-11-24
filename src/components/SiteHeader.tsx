import SiteNav from "@/components/chrome/SiteNav";
import SupportButton from "@/components/support/SupportButton";
import SupportWindow, { supportTitleId } from "@/components/support/SupportWindow";
import { site } from "@/data/site";
import { support } from "@/data/support";

/**
 * The top of every page: the fixed menu on glass (SiteNav), with the Support
 * button and its window drawn here on the server and handed in. While the site
 * is not ready it carries only the name of the organisation.
 */
export default function SiteHeader() {
  if (!site.ready) {
    return (
      <header className="frame site-header-quiet">
        <p className="brand-quiet">{site.organisation}</p>
      </header>
    );
  }

  return (
    <SiteNav
      name={site.name}
      homeLabel={site.ui.homeWord}
      links={site.nav}
      explore={site.explore}
      source={site.source}
      look={site.look}
      party={site.party}
      words={{ menu: site.ui.menu, openMenu: site.ui.openMenu, closeMenu: site.ui.closeMenu, home: site.ui.home }}
      support={
        <SupportButton label={support.button} closeLabel={support.ui.close} titleId={supportTitleId}>
          <SupportWindow />
        </SupportButton>
      }
    />
  );
}
