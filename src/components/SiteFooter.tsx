import Link from "next/link";
import StatusBar from "@/components/chrome/StatusBar";
import FooterNav from "@/components/chrome/FooterNav";
import { ByLocale } from "@/i18n/client";
import { localizeHref } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { content } from "@/data";

/** The quiet note at the very end of a page, in one language. */
function EndNote({ locale }: { locale: Locale }) {
  const { site } = content(locale);
  return (
    <footer className="frame site-footer">
      <div className="site-footer-grid">
        <div>
          <Link href={localizeHref(locale, "/")} className="brand brand-small" aria-label={site.ui.home}>
            {site.name}
            <span className="dot" aria-hidden="true" />
          </Link>
          <FooterNav
            locale={locale}
            homeLabel={site.ui.homeWord}
            links={site.nav}
            github={{ home: site.source.home, source: { label: site.source.label, href: site.source.href } }}
            risk={site.status.risk}
            welcome={site.arrival.again}
          />
        </div>
        <div className="footer-lines">
          {site.footer.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </footer>
  );
}

/** The status bar fixed at the foot of the screen, in one language. */
function Bar({ locale }: { locale: Locale }) {
  const { site, schedule } = content(locale);
  return (
    <StatusBar
      sessions={schedule.sessions}
      days={schedule.days}
      zone={schedule.zone}
      posted={schedule.sessions.map((s) => `${s.short} ${s.posted}`).join("  ·  ")}
      words={{ ...site.status, in: schedule.words.in, h: schedule.words.hours, min: schedule.words.minutes }}
      source={site.source}
      welcome={{ label: site.arrival.again, short: site.arrival.againShort }}
    />
  );
}

/**
 * The foot of every page once the site is ready: a quiet note at the very end
 * of the page (where the words come from, the risk line, the pages), and the
 * thin status bar fixed at the bottom of the screen, each in the page's language.
 */
export default function SiteFooter() {
  if (!content("en").site.ready) return null;
  return (
    <>
      <ByLocale en={<EndNote locale="en" />} es={<EndNote locale="es" />} />
      <ByLocale en={<Bar locale="en" />} es={<Bar locale="es" />} />
    </>
  );
}
