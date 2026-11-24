/*
 * The trading page. His sessions, the names used on his streams (named only:
 * how they work is taught where he teaches), and lower down, his figures, his
 * code and his sponsors, one line each, with his own risk note beside them.
 *
 * Every entry names where it was read (see sources.ts). Nothing is rounded,
 * inferred or promised.
 */

import type { Cited, Quote } from "./sources";

export interface StreamName {
  /** A short name with no spaces. */
  id: string;
  /** The name as it is said or written. */
  name: string;
  /** Where it is heard, in a few words. */
  heard: string;
  /** The line it comes from, his or his channel's. */
  line: string;
  cite: Cited;
}

export interface Figure {
  id: string;
  /** What the line is, in a word or two. */
  label: string;
  /** The figure or the words, exactly as published. */
  value: string;
  /** Optional: one plain sentence under it. */
  note?: string;
  cites: Cited[];
}

export const trading = {
  title: "Trading",
  lead: { text: "Trade futures with confidence.", source: "youtube" } as Quote,

  intro: {
    title: "The trader",
    text: "He trades NQ and ES futures live, Monday to Friday. In his own words, the kind of trader he is:",
    quotes: [
      { text: "I think I just love scalping.", source: "alphas", at: 1174 },
      { text: "I want to show up, do the same thing every day.", source: "alphas", at: 2890 },
    ] as Quote[],
  },

  sessions: {
    title: "The sessions",
    text: "Two a day, as his stream titles name them. The times below are in your own time.",
  },

  names: {
    title: "Names you will hear on stream",
    text: "His streams have their own words. This page only names them. What they mean is taught live on YouTube and in TRADERMADE.",
    list: [
      {
        id: "lunchbox",
        name: "Lunchbox",
        heard: "New York AM Session",
        line: "It's part of the lunchbox strategy, right?",
        cite: { source: "streamNyAm", at: 12619 },
      },
      {
        id: "sushi-box",
        name: "Sushi Box",
        heard: "A name used on his channel's Asia Session",
        line: "So, we're still inside Sushi Box.",
        cite: { source: "streamAsia", at: 1424 },
      },
      {
        id: "vwap",
        name: "VWAP",
        heard: "ALPHAS interview",
        line: "Number two is trade with VWAP.",
        cite: { source: "alphas", at: 830 },
      },
      {
        id: "continuations",
        name: "Continuations",
        heard: "ALPHAS interview",
        line: "I stopped trying to catch reversals. I'm trading continuations.",
        cite: { source: "alphas", at: 694 },
      },
      {
        id: "po3",
        name: "The 10AM PO3",
        heard: "His Instagram",
        line: "a beautiful trade off the 10AM PO3, confirmed with orderflow.",
        cite: { source: "instagramPo3" },
      },
      {
        id: "base-hits",
        name: "Base hits",
        heard: "ALPHAS interview",
        line: "I'm a base hits kind of guy.",
        cite: { source: "alphas", at: 2890 },
      },
    ] as StreamName[],
  },

  host: {
    title: "On the other side of the desk",
    text: "He hosts too, on Meet the Trader, talking with other traders about their road.",
    quote: {
      text: "All right, fam, welcome to the show. Welcome to Meet the Traders.",
      source: "meetTheTrader",
      at: 28,
    } as Quote,
  },

  community: {
    title: "TRADERMADE",
    text: "His community, on Whop. He has said where the name came from:",
    quote: {
      text: "I'm not even a golfer, but I just figured that people that trade like golf, and Tailor Made is like a big brand, so I figured Trader Made sounded like it would click",
      source: "alphas",
      at: 984,
    } as Quote,
    tiers: [
      { label: "TMADE Free Tier", value: "Limited access to our Discord community", cite: { source: "whopFreeTier" } as Cited },
      {
        label: "The paid plan",
        value: "Upgrade to a paid plan for full trading insights and exclusive content.",
        cite: { source: "whopFreeTier" } as Cited,
      },
    ],
    note: "Joining, plans and payment all happen on Whop. This site sells nothing.",
    action: { label: "TRADERMADE on Whop", href: "https://whop.com/tradermade/" },
  },

  figures: {
    title: "As he states it",
    text: "One line each, in his own words, with where each was read.",
    list: [
      {
        id: "payouts",
        label: "Payouts",
        value: "$185k in payouts",
        cites: [{ source: "xBio" }, { source: "instagramBio" }],
      },
      {
        id: "code",
        label: "His code",
        value: "Prop firm deals: use code TMADE",
        cites: [{ source: "streamDescriptions" }],
      },
      {
        id: "sponsors",
        label: "Sponsors",
        value: "Vest, E8, Top One Futures, Lucid and Tradeify",
        note: "Thanked on his stream as sponsors, among others. The names are spelled as the automatic captions print them.",
        cites: [
          { source: "streamNyAm", at: 7832 },
          { source: "streamNyAm", at: 14381 },
        ],
      },
    ] as Figure[],
  },

  risk: {
    title: "Risk",
    /* His own disclaimer, word for word, from his stream descriptions. */
    his: {
      text: "This stream is for educational and entertainment purposes only and is not financial advice. Trading futures involves substantial risk of loss and is not suitable for every investor. Past performance does not guarantee future results.",
      source: "streamDescriptions",
    } as Quote,
    plain:
      "The figures above are his own, as he published them. They are not a promise of anyone's results. No link on this site earns Christopher, who set it up, anything.",
    rule: {
      text: "every trader when they enter a position should know where their stop has to go.",
      source: "alphas",
      at: 1501,
    } as Quote,
  },
};
