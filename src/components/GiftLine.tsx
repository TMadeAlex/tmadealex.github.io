import { GiftIcon } from "@phosphor-icons/react/ssr";
import { site } from "@/data/site";

interface GiftWordsProps {
  line: string;
  by?: { name: string; handle?: string; href: string };
  linkClass: string;
}

/**
 * The words of a gift line. Where the line holds {name} and `by` is given, the
 * name becomes a link; otherwise the line is shown as it is written.
 */
export function GiftWords({ line, by, linkClass }: GiftWordsProps) {
  if (!by || !line.includes("{name}")) return <>{line.replace("{name}", "").trim()}</>;
  const [before, after = ""] = line.split("{name}");
  return (
    <>
      {before}
      <a href={by.href} rel="noopener noreferrer" className={linkClass}>
        {by.name}
        {by.handle ? <span className="gift-handle"> ({by.handle})</span> : null}
      </a>
      {after}
    </>
  );
}

/**
 * The one line near the top of every page: that the site was set up as a gift,
 * and that Alex decides what stays. Said once, quietly.
 */
export default function GiftLine() {
  return (
    <aside className="gift-line" aria-label="About this site">
      <div className="frame gift-line-inner">
        <GiftIcon weight="duotone" aria-hidden="true" className="gift-icon" />
        <p>
          <GiftWords line={site.gift.line} by={site.gift.by} linkClass="gift-link" />
        </p>
      </div>
    </aside>
  );
}
