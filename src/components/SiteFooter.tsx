import { site } from "@/data/site";

/**
 * One line, the same on every page once the site is ready. While it is not,
 * the holding page says who set the place up in its own words, so this waits.
 */
export default function SiteFooter() {
  if (!site.ready) return null;

  return (
    <footer className="frame">
      <p className="border-t border-rule py-6 text-sm text-ink-soft">{site.footer}</p>
    </footer>
  );
}
