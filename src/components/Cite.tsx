"use client";

import type { Cited, Quote as QuoteData } from "@/data/sources";
import { readOn, readWord, sources } from "@/data/sources";
import { labels as labelsEs, readOn as readOnEs, readWord as readWordEs, translationLabel } from "@/data/es/sources";
import { citeHref, timecode } from "@/lib/cite";
import { useLocale } from "@/i18n/client";

/** How a source reads in the page's language: "ALPHAS interview, 16:24, read 23 November 2026". */
function useLabel({ source, at }: Cited, dated: boolean) {
  const es = useLocale() === "es";
  const label = es ? labelsEs[source] : sources[source].label;
  const when = dated ? `, ${es ? readWordEs : readWord} ${es ? readOnEs : readOn}` : "";
  return `${label}${at !== undefined ? `, ${timecode(at)}` : ""}${when}`;
}

interface CiteProps extends Cited {
  /** Also say the day it was read. Used beside figures and claims. */
  dated?: boolean;
}

/** A small link to where something was read: "ALPHAS interview, 16:24". */
export default function Cite({ source, at, dated = false }: CiteProps) {
  const label = useLabel({ source, at }, dated);
  return (
    <a href={citeHref({ source, at })} rel="noopener noreferrer" className="cite">
      {label}
    </a>
  );
}

/** The same words as Cite, without the link: for a quotation inside something that is already a link. */
export function CiteLabel({ source, at }: Cited) {
  return <span className="cite cite-plain">{useLabel({ source, at }, false)}</span>;
}

/**
 * A translation under his own words, on the Spanish pages. His words stay as he
 * said them; this says what they mean, marked as a translation.
 */
export function Translation({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="translation" lang="es">
      <span className="translation-label">{translationLabel}</span>
      {text}
    </p>
  );
}

interface QuoteProps {
  quote: QuoteData;
  /** "band" is the large one that stands alone. */
  size?: "band" | "large" | "normal";
  className?: string;
  /** Inside a link already (a card that opens the video): the source is said, not linked. */
  plain?: boolean;
}

/** His words, in curly quotation marks, with where they were said under them, and on a Spanish page their translation. */
export function Quote({ quote, size = "normal", className = "", plain = false }: QuoteProps) {
  return (
    <figure className={`quote quote-${size} ${className}`}>
      <blockquote lang="en">
        <p>
          <span className="quote-mark" aria-hidden="true">
            “
          </span>
          {quote.text}
          <span aria-hidden="true">”</span>
        </p>
      </blockquote>
      <Translation text={quote.translation} />
      <figcaption>{plain ? <CiteLabel source={quote.source} at={quote.at} /> : <Cite source={quote.source} at={quote.at} />}</figcaption>
    </figure>
  );
}
