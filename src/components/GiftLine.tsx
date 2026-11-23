import { Gift } from "lucide-react";
import { site } from "@/data/site";

/**
 * The one line near the top of every page: who set the site up, and that Alex
 * decides what stays. Said once, quietly.
 */
export default function GiftLine() {
  const { line, by } = site.gift;
  const [before, after = ""] = line.split("{name}");

  return (
    <aside className="gift-line" aria-label="About this site">
      <div className="frame gift-line-inner">
        <Gift aria-hidden="true" className="gift-icon" strokeWidth={1.75} />
        <p>
          {before}
          <a href={by.href} rel="noopener noreferrer" className="gift-link">
            {by.name} <span className="gift-handle">({by.handle})</span>
          </a>
          {after}
        </p>
      </div>
    </aside>
  );
}
