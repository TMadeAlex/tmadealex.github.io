import SiteNav from "@/components/chrome/SiteNav";
import type { NavBundle } from "@/components/chrome/SiteNav";
import SupportButton from "@/components/support/SupportButton";
import SupportWindow, { supportTitleId } from "@/components/support/SupportWindow";
import { ByLocale } from "@/i18n/client";
import { content } from "@/data";
import type { Locale } from "@/i18n/config";

/** The menu's words in one language, from site.ts or es/site.ts. */
function bundle(locale: Locale): NavBundle {
  const { site } = content(locale);
  return {
    name: site.name,
    homeLabel: site.ui.homeWord,
    links: site.nav,
    explore: site.explore,
    source: site.source,
    look: site.look,
    party: site.party,
    languages: site.languages,
    welcomeAgain: site.arrival.again,
    thisPage: { heading: site.ui.thisPage, top: site.ui.jumpTop, bottom: site.ui.jumpBottom, risk: site.status.risk },
    words: { menu: site.ui.menu, openMenu: site.ui.openMenu, closeMenu: site.ui.closeMenu, home: site.ui.home },
  };
}

/**
 * The top of every page: the fixed menu on glass (SiteNav), with the Support
 * button and its window drawn here on the server and handed in, in both
 * languages; the page's address picks one. While the site is not ready it
 * carries only the name of the organisation.
 */
export default function SiteHeader() {
  const en = content("en");
  const es = content("es");
  if (!en.site.ready) {
    return (
      <header className="frame site-header-quiet">
        <p className="brand-quiet">{en.site.organisation}</p>
      </header>
    );
  }

  return (
    <SiteNav
      bundles={{ en: bundle("en"), es: bundle("es") }}
      support={
        <SupportButton
          labels={{
            en: { label: en.support.button, close: en.support.ui.close, jump: { bottom: en.site.ui.jumpBottom, top: en.site.ui.jumpTop } },
            es: { label: es.support.button, close: es.support.ui.close, jump: { bottom: es.site.ui.jumpBottom, top: es.site.ui.jumpTop } },
          }}
          titleId={supportTitleId}
        >
          <ByLocale en={<SupportWindow locale="en" />} es={<SupportWindow locale="es" />} />
        </SupportButton>
      }
    />
  );
}
