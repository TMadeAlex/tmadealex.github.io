import Link from "next/link";
import { site } from "@/data/site";

/** The foot of every page once the site is ready: where the words come from, the risk line, and the pages. */
export default function SiteFooter() {
  if (!site.ready) return null;

  return (
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
          </ul>
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
