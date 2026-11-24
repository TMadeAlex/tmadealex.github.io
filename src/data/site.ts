/*
 * Every word and every setting of this site lives in this folder (src/data).
 * To change what the site says, change the text between the quote marks and
 * save. Nothing else needs touching.
 *
 *   site.ts         the name, the gift line, the menu, the colours, three switches
 *   home.ts         the front page
 *   schedule.ts     when he streams (shown in each visitor's own time)
 *   trading.ts      the trading page
 *   photography.ts  the photography page
 *   gallery.ts      the pictures on the photography page (empty on main)
 *   contact.ts      the contact page: links only
 *   sources.ts      where every figure and quotation was read
 */

export interface Tone {
  /** The four shades of his TRADERMADE art. */
  primary: string;
  deep: string;
  mid: string;
  tint: string;
  /** The two lighter shades used on the dark ground. */
  onDark: string;
  onDarkSoft: string;
}

/** The menu's pages. `icon` names one of the menu's pictures (see SiteNav.tsx). */
export interface NavLink {
  href: string;
  label: string;
  icon: "trading" | "photography" | "contact";
}

export interface ExternalLink {
  label: string;
  href: string;
  icon?: "youtube" | "whop" | "x" | "instagram" | "camera" | "linkedin" | "github" | "code";
}

/** One page's preview when its link is shared (drawn by scripts/make-share-cards.py). */
export interface ShareCard {
  path: string;
  image: string;
  description: string;
  alt: string;
}

export interface Site {
  name: string;
  /** The site's own address, so a shared link's preview can name its picture in full. */
  url: string;
  share: { home: ShareCard; trading: ShareCard; photography: ShareCard; contact: ShareCard };
  organisation: string;
  language: string;
  description: string;
  tone: Tone;
  indexable: boolean;
  ready: boolean;
  supportAddress: string;
  supportNetwork: string;
  supportNote: string;
  /** The one line near the top of every page saying who set the site up. */
  gift: { line: string; by?: { name: string; handle?: string; href: string } };
  nav: NavLink[];
  /** The Explore menu: his own pages elsewhere. */
  explore: { label: string; links: ExternalLink[] };
  /** Where this site's own source lives on GitHub. */
  source: { menu: string; label: string; short: string; href: string; home: ExternalLink & { short: string } };
  labels: { support: string; empty: string };
  /** The fixed bar at the foot of every page. */
  status: { label: string; next: string; until: string; scheduled: string; risk: string; riskHref: string };
  look: { night: string; morning: string; toNight: string; toMorning: string; heading: string };
  party: { name: string; on: string; off: string; hint: string; heading: string };
  holding: {
    title: string;
    lines: string[];
    gift: { line: string; by?: { name: string; href: string } };
  };
  notFound: { kicker: string; title: string; line: string; back: string; box: string };
  footer: { lines: string[] };
  ui: {
    skip: string;
    menu: string;
    homeWord: string;
    openMenu: string;
    closeMenu: string;
    toTop: string;
    /** The cue at the bottom of the screen while a page is at its top. */
    scrollCue: string;
    scrollCueLabel: string;
    home: string;
    seeIt: string;
    openPicture: string;
    pictureCount: string;
    closePicture: string;
    previousPicture: string;
    nextPicture: string;
    ownAddress: string;
    network: string;
    copyAddress: string;
    addressCopied: string;
    supportHow: string;
  };
}

export const site: Site = {
  /* Who the site speaks for, and the organisation that holds it. */
  name: "TMade Alex",
  organisation: "TMadeAlex",
  url: "https://tmadealex.github.io",

  /*
   * What a link shows when it is pasted into a message or a post: a picture for each page and
   * a sentence. The pictures are in public/social/, drawn by scripts/make-share-cards.py from
   * the words and colours in this folder; run it again (after npm run build) when they change.
   */
  share: {
    home: {
      path: "/",
      image: "/social/og-home.png",
      description:
        "Futures trader, live streamer and host of TMade, and a fashion photographer in New York. Live streams Monday-Friday. Set up as a gift by a member of his community.",
      alt: "TMade Alex, in his TRADERMADE colours: futures trader, live streamer, entertainer, host of TMade and fashion photographer, over a line of candles.",
    },
    trading: {
      path: "/trading/",
      image: "/social/og-trading.png",
      description:
        "Trade futures with confidence. His sessions in your own time, the names you will hear on stream, and his figures as he states them.",
      alt: "Trading, with his words “Trade futures with confidence.” beside a chart drawn as an illustration.",
    },
    photography: {
      path: "/photography/",
      image: "/social/og-photography.png",
      description:
        "I'm a fashion photographer based in New York. Alexander Saladrigas: his story in his own words, and his personal work, shown from his own site.",
      alt: "Photography, by Alexander Saladrigas, with his words “I'm a fashion photographer based in New York.” beside a camera lens.",
    },
    contact: {
      path: "/contact/",
      image: "/social/og-contact.png",
      description: "Every link goes to a page of his own: YouTube, X, Instagram, TRADERMADE on Whop, and his photography.",
      alt: "Contact: TMade Alex on YouTube, X, Instagram and Whop.",
    },
  },
  language: "en-GB",

  /* What a search result or a shared link would say. */
  description:
    "TMade Alex: futures trader, streamer and host of TMade, and a fashion photographer in New York. Set up as a gift by a member of his community.",

  /* His colours, sampled from his TRADERMADE art. The whole site is drawn from these six values. */
  tone: {
    primary: "#34d4d8",
    deep: "#0c1719",
    mid: "#249094",
    tint: "#e6fafa",
    onDark: "#5fe0e3",
    onDarkSoft: "#9eeef0",
  },

  /* false = search engines are told not to list the site. It stays false until Alex says otherwise. */
  indexable: false,

  /* true = the pages show. false = every address shows the one quiet holding page. */
  ready: true,

  /*
   * A wallet address, and the network it is on. Only Alex can supply these, and
   * no helper ever does. While either is empty, the support panel is not on the site.
   */
  supportAddress: "",
  supportNetwork: "",
  supportNote: "",

  /*
   * The gift line, near the top of every page. The person who set the site up
   * is not named. To name someone, write {name} in the line and add
   * by: { name: "...", href: "https://..." }; {name} becomes a link to it.
   */
  gift: {
    line: "A member of TMade Alex's community set this site up as a gift. Alex decides what stays.",
  },

  /* The menu. The name at the top left always goes to the front page. */
  nav: [
    { href: "/trading/", label: "Trading", icon: "trading" },
    { href: "/photography/", label: "Photography", icon: "photography" },
    { href: "/contact/", label: "Contact", icon: "contact" },
  ],

  /* The Explore menu at the top: his own pages elsewhere. Each opens his page, not this site. */
  explore: {
    label: "Explore",
    links: [
      { label: "YouTube @TMadeAlex", href: "https://www.youtube.com/@TMadeAlex", icon: "youtube" },
      { label: "TRADERMADE on Whop", href: "https://whop.com/tradermade/", icon: "whop" },
      { label: "X @TMadeAlex", href: "https://x.com/tmadealex", icon: "x" },
      { label: "Instagram @tmadealex", href: "https://www.instagram.com/tmadealex/", icon: "instagram" },
      { label: "alexandersaladrigas.com", href: "https://www.alexandersaladrigas.com/", icon: "camera" },
    ],
  },

  /* His home on GitHub, and this site's own source there, where Alex can change any word of it. */
  source: {
    menu: "GitHub",
    label: "Source on GitHub",
    short: "Source",
    href: "https://github.com/TMadeAlex/tmadealex.github.io",
    home: { label: "TMadeAlex on GitHub", short: "TMadeAlex", href: "https://github.com/TMadeAlex", icon: "github" },
  },

  labels: {
    support: "Support",
    empty: "Nothing is here yet.",
  },

  /* The thin bar fixed at the foot of every page. It shows his schedule, never whether a stream is live. */
  status: {
    label: "Schedule and source",
    next: "Next scheduled",
    until: "until",
    scheduled: "Scheduled now",
    risk: "Not financial advice",
    riskHref: "/trading/#risk",
  },

  /* The two looks. Night is the first design; morning is the same colours in daylight. */
  look: {
    heading: "Look",
    night: "Night",
    morning: "Morning",
    toNight: "Switch to the night look",
    toMorning: "Switch to the morning look",
  },

  /* PARTY_MODE: colour, confetti candles and a livelier cursor. Shift + P turns it on and off too. */
  party: {
    heading: "For fun",
    name: "PARTY_MODE",
    on: "PARTY_MODE is on",
    off: "PARTY_MODE is off",
    hint: "Shift + P",
  },

  /* The holding page, shown only if ready is set back to false. */
  holding: {
    title: "A place is being kept here.",
    lines: ["This site waits for TMade Alex.", "Nothing is asked of anyone, and nothing is expected."],
    gift: {
      line: "A member of his community set this place up as a gift. TMade Alex decides what stays.",
    },
  },

  /* The page shown for an address that does not exist. */
  notFound: {
    kicker: "404",
    title: "No session at this address",
    line: "The page may have moved, or it was never here.",
    back: "Go to the front page",
    /* The label over the empty session box drawn under it. */
    box: "Out of hours",
  },

  /* The foot of every page. */
  footer: {
    lines: [
      "Every figure and quotation here is TMade Alex's own, from his public pages, read on 23 November 2026, and links to where it was read. Quotations from videos are as YouTube's automatic captions print them.",
      "Nothing on this site is financial advice. Trading futures involves substantial risk of loss.",
      "No cookies, no forms, no tracking. The look you choose is remembered by your own browser, and nothing is sent anywhere. Search engines are asked not to list it.",
    ],
  },

  /*
   * The small words on buttons and for screen readers. They rarely need changing.
   * In pictureCount, {n} and {total} are filled in by the site: leave them as they are.
   */
  ui: {
    skip: "Skip to the page",
    menu: "Pages",
    homeWord: "Home",
    openMenu: "Open the menu",
    closeMenu: "Close the menu",
    toTop: "Back to the top",
    scrollCue: "Scroll",
    scrollCueLabel: "Scroll down the page",
    home: "TMade Alex, front page",
    seeIt: "See it",
    openPicture: "Open the picture",
    pictureCount: "Picture {n} of {total}",
    closePicture: "Close the picture",
    previousPicture: "Previous picture",
    nextPicture: "Next picture",
    ownAddress: "My own address",
    network: "Network",
    copyAddress: "Copy address",
    addressCopied: "Address copied",
    supportHow:
      "To send something, paste this address into your own wallet. This page does not connect to a wallet, hold anything or take a payment. Read the address back before you send, because a transfer cannot be undone.",
  },
};
