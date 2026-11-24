/*
 * The Support window, opened from the button at the top of every page.
 *
 * It lists the ways TMade Alex already offers, each on a page of his own, with
 * his own words beside them. It takes no payment, holds nothing, connects to no
 * wallet and loads nothing from elsewhere. Every step happens on his pages.
 *
 * The crypto part shows an address only once supportAddress and supportNetwork
 * in site.ts are both filled in. Only Alex can supply them; no helper ever does.
 */

import type { Quote } from "./sources";

export interface SupportWay {
  /** A short name with no spaces. */
  id: string;
  /** Which icon sits beside it: "watch", "join" or "code". */
  icon: "watch" | "join" | "code";
  /** Where it is, in a word, over the title. */
  place: string;
  title: string;
  /** One plain sentence. */
  text: string;
  /** Optional: his own words, with where they were read. */
  quote?: Quote;
  /** A link to his page, or (for his code) the code itself, with a button to copy it. */
  action: { kind: "link"; label: string; href: string } | { kind: "copy"; code: string };
}

export const support = {
  /* The button at the top of every page. */
  button: "Support",
  kicker: "Support",
  title: "Back TMade Alex",
  lead: "The ways he already offers, each on a page of his own. Nothing on this site takes a payment.",

  ways: [
    {
      id: "watch",
      icon: "watch",
      place: "YouTube",
      title: "Watch him trade live",
      text: "Monday to Friday, on his channel: the New York AM Session and the Asia Session.",
      quote: { text: "Trade futures with confidence.", source: "youtube" },
      action: { kind: "link", label: "His channel", href: "https://www.youtube.com/@TMadeAlex" },
    },
    {
      id: "join",
      icon: "join",
      place: "Whop",
      title: "Join TRADERMADE",
      text: "His community, with a free tier and a paid plan. Joining and payment happen on Whop.",
      quote: { text: "Limited access to our Discord community", source: "whopFreeTier" },
      action: { kind: "link", label: "TRADERMADE on Whop", href: "https://whop.com/tradermade/" },
    },
    {
      id: "code",
      icon: "code",
      place: "His code",
      title: "Prop firm deals",
      text: "From his stream descriptions.",
      quote: { text: "Prop firm deals: use code TMADE", source: "streamDescriptions" },
      action: { kind: "copy", code: "TMADE" },
    },
  ] as SupportWay[],

  crypto: {
    place: "Crypto",
    title: "Straight from your own wallet",
    /* Shown while no address is set. */
    waiting:
      "When TMade Alex adds a wallet address of his own, it appears here with a button to copy it. Until then there is nothing to send to.",
  },

  /* The small print at the foot of the window. */
  foot: "This site sells nothing, holds nothing and connects to no wallet. No link here earns the person who set it up anything. Nothing here is financial advice.",

  /* Words on buttons, and for screen readers. */
  ui: {
    close: "Close",
    copyCode: "Copy the code",
    codeCopied: "Code copied",
  },
};
