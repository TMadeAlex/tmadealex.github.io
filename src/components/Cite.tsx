import type { Cited, Quote as QuoteData } from "@/data/sources";
import { readOn, sources } from "@/data/sources";

/** "1:00:16" or "16:24", from seconds. */
function timecode(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  return `${h > 0 ? `${h}:` : ""}${mm}:${String(s).padStart(2, "0")}`;
}

/** The address of a source, opened at the right moment when it is a video. */
export function citeHref({ source, at }: Cited) {
  const { href } = sources[source];
  return at !== undefined && href.includes("youtube.com/watch") ? `${href}&t=${at}s` : href;
}

interface CiteProps extends Cited {
  /** Also say the day it was read. Used beside figures and claims. */
  dated?: boolean;
}

/** A small link to where something was read: "ALPHAS interview, 16:24". */
export default function Cite({ source, at, dated = false }: CiteProps) {
  return (
    <a href={citeHref({ source, at })} rel="noopener noreferrer" className="cite">
      {sources[source].label}
      {at !== undefined ? `, ${timecode(at)}` : ""}
      {dated ? `, read ${readOn}` : ""}
    </a>
  );
}

interface QuoteProps {
  quote: QuoteData;
  /** "band" is the large one that stands alone. */
  size?: "band" | "large" | "normal";
  className?: string;
}

/** His words, in curly quotation marks, with where they were said under them. */
export function Quote({ quote, size = "normal", className = "" }: QuoteProps) {
  return (
    <figure className={`quote quote-${size} ${className}`}>
      <blockquote>
        <p>
          <span className="quote-mark" aria-hidden="true">
            “
          </span>
          {quote.text}
          <span aria-hidden="true">”</span>
        </p>
      </blockquote>
      <figcaption>
        <Cite source={quote.source} at={quote.at} />
      </figcaption>
    </figure>
  );
}
