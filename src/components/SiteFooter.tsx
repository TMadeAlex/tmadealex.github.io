import Link from "next/link";
import StatusBar from "@/components/chrome/StatusBar";
import { site } from "@/data/site";
import { schedule } from "@/data/schedule";

/**
 * The foot of every page once the site is ready. Two parts: a quiet note at the
 * very end of the page (where the words come from, the risk line, the pages),
 * and the thin status bar fixed at the bottom of the screen.
 */
export default function SiteFooter() {
  if (!site.ready) return null;

  return (
    <>
      <footer className="frame site-footer">
        <div className="site-footer-grid">
          <div>
            <Link href="/" className="brand brand-small" aria-label={site.ui.home}>
              {site.name}
              <span className="dot" aria-hidden="true" />
            </Link>
            <ul className="footer-nav">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              <li>
                <a href={site.source.home.href} rel="noopener noreferrer">
                  {site.source.home.label}
                </a>
              </li>
              <li>
                <a href={site.source.href} rel="noopener noreferrer">
                  {site.source.label}
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-lines">
            {site.footer.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </footer>
      <StatusBar
        sessions={schedule.sessions}
        days={schedule.days}
        zone={schedule.zone}
        posted={schedule.sessions.map((s) => `${s.short} ${s.posted}`).join("  ·  ")}
        words={{
          ...site.status,
          in: schedule.words.in,
          h: schedule.words.hours,
          min: schedule.words.minutes,
        }}
        source={site.source}
      />
    </>
  );
}
