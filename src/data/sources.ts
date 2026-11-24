/*
 * Where every figure, quotation and claim on this site was read.
 *
 * Each one on a page names a source from this list, and the page shows it as a
 * small link. For a video, `at` (in the other data files) is the number of
 * seconds into it, and the link opens the video at that moment.
 *
 * Everything here is one of TMade Alex's own public pages, read on the date in
 * `readOn`. Quotations from videos are as YouTube's automatic captions print them.
 */

export interface Source {
  /** How the link reads on the page. */
  label: string;
  /** His own page. */
  href: string;
}

/** The day these pages were read. Change it when a page is read again (and in es/sources.ts). */
export const readOn = "23 November 2026";

/** The word before that date: "ALPHAS interview, read 23 November 2026". */
export const readWord = "read";

export const sources = {
  xBio: { label: "His X bio", href: "https://x.com/tmadealex" },
  instagramBio: { label: "His Instagram bio", href: "https://www.instagram.com/tmadealex/" },
  youtube: { label: "His YouTube channel", href: "https://www.youtube.com/@TMadeAlex" },
  streamDescriptions: {
    label: "His stream descriptions on YouTube",
    href: "https://www.youtube.com/watch?v=x_UvIwCmHAA",
  },
  streamNyAm: {
    label: "New York AM Session, 19 Nov 2026",
    href: "https://www.youtube.com/watch?v=x_UvIwCmHAA",
  },
  streamAsia: { label: "Asia Session, 22 Nov 2026", href: "https://www.youtube.com/watch?v=bvDY9IMxgmY" },
  alphas: {
    label: "ALPHAS interview, TradersPost",
    href: "https://www.youtube.com/watch?v=-oA2tyZEsfw",
  },
  meetTheTrader: { label: "Meet the Trader, FundedNext", href: "https://www.youtube.com/watch?v=DjtViPPtE7c" },
  instagramRoad: { label: "His Instagram, 9 Aug 2026", href: "https://www.instagram.com/p/Db1C49cxWXk/" },
  instagramPo3: { label: "His Instagram, 13 Nov 2026", href: "https://instagram.com/p/DfqWxOfxXGo" },
  whopFreeTier: {
    label: "TMADE Free Tier on Whop",
    href: "https://whop.com/tradermade/products/tradermade-free-tier/",
  },
  photoInfo: { label: "His photography site, Info", href: "https://www.alexandersaladrigas.com/contact" },
  photoPersonal: { label: "His photography site, Personal", href: "https://www.alexandersaladrigas.com/doc" },
} satisfies Record<string, Source>;

export type SourceId = keyof typeof sources;

/** A pointer into the list above: which page, and for a video, how many seconds in. */
export interface Cited {
  source: SourceId;
  at?: number;
}

/** A quotation in his own words, with where it was read. */
export interface Quote extends Cited {
  text: string;
  /** On the Spanish pages: the quotation stays in his own English, and this translation is shown under it. */
  translation?: string;
}
