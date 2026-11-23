/*
 * Every word and every setting of this site lives in this folder (src/data).
 * To change what the site says, change the text between the quote marks below
 * and save. Nothing else needs touching.
 *
 *   site.ts     the name, the words, the links, the colours, and three switches
 *               (ready, indexable, supportAddress)
 *   work.ts     the list of work (empty until someone fills it)
 *   gallery.ts  the list of pictures (empty until someone fills it)
 *
 * The about, offer and links lists below each hold an example line that starts
 * with two slashes (//). A line that starts with // is a note and does not show
 * on the site. To use an example, remove the two slashes at its start, then
 * change the words between the quote marks.
 */

export interface SiteLink {
  /** The words people read, for example "Write to me". */
  label: string;
  /** Where the link goes: a web address, or a mailto: address. */
  href: string;
  /** Optional: one short line under the link. */
  note?: string;
}

export interface Offer {
  title: string;
  text: string;
}

export interface Tone {
  /** The four shades of this home's colour family. */
  primary: string;
  deep: string;
  mid: string;
  tint: string;
  /** The two lighter shades used when a device is in dark mode. */
  onDark: string;
  onDarkSoft: string;
}

export interface Site {
  name: string;
  organisation: string;
  language: string;
  tagline: string;
  about: string[];
  offer: Offer[];
  links: SiteLink[];
  tone: Tone;
  indexable: boolean;
  ready: boolean;
  supportAddress: string;
  supportNetwork: string;
  supportNote: string;
  labels: {
    about: string;
    work: string;
    gallery: string;
    offer: string;
    contact: string;
    support: string;
    empty: string;
  };
  holding: {
    title: string;
    lines: string[];
    /** Who set the place up. {name} in the line is filled with a link to `by`. */
    gift: { line: string; by: { name: string; href: string } };
  };
  notFound: { title: string; line: string; back: string };
  footer: string;
  ui: {
    skip: string;
    menu: string;
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
  language: "en-GB",

  /* One line under the name. Empty until its owner writes it. */
  tagline: "",

  /* The about section: one entry per paragraph. Remove the two slashes to use the example. */
  about: [
    // "A first paragraph, in the owner's own words.",
  ],

  /* What is offered: a short title and a sentence or two for each. Remove the two slashes to use the example. */
  offer: [
    // { title: "A thing on offer", text: "What it is, said plainly." },
  ],

  /* The contact page is these links and nothing else. There is no form. Remove the two slashes to use the example. */
  links: [
    // { label: "A place to find me", href: "https://example.org/", note: "Optional: one short line." },
  ],

  /* The colour family. The whole site is drawn from these six values. */
  tone: {
    primary: "#34d4d8",
    deep: "#0c1719",
    mid: "#249094",
    tint: "#e6fafa",
    onDark: "#5fe0e3",
    onDarkSoft: "#9eeef0",
  },

  /* false = search engines are told not to list the site. Change to true when it should be found. */
  indexable: false,

  /* false = every address shows the one quiet holding page. Change to true to show the real sections. */
  ready: false,

  /*
   * The owner's own wallet address, and the network it is on. The support panel
   * appears only when both are filled in, so nobody sends to the wrong network.
   * While either one is empty, the panel is not on the site at all.
   */
  supportAddress: "",
  supportNetwork: "",
  /* Optional: one plain line of the owner's own, shown above the address. */
  supportNote: "",

  /* The headings of the sections, and the words in the menu. */
  labels: {
    about: "About",
    work: "Work",
    gallery: "Gallery",
    offer: "What I offer",
    contact: "Contact",
    support: "Support",
    /* Shown on a page that has nothing on it yet. */
    empty: "Nothing is here yet.",
  },

  /* The holding page, shown while ready is false. */
  holding: {
    title: "A place is being kept here.",
    lines: [
      "A website should sound like the person it speaks for, so this one waits for TMade Alex.",
      "Nothing is asked of anyone, and nothing is expected.",
    ],
    /* Leave {name} as it is: the site puts the link there. */
    gift: {
      line: "{name}, a friend, set this place up as a gift. Nothing here speaks for TMade Alex yet, and TMade Alex decides what stays.",
      by: { name: "Christopher W", href: "https://github.com/drasticstatic" },
    },
  },

  /* The page shown for an address that does not exist. */
  notFound: {
    title: "This page is not here.",
    line: "The address may have changed, or it may never have been one.",
    back: "Go to the front page",
  },

  /* The one line at the foot of every page once the site is ready. (The holding page says it in its own words.) */
  footer: "This place was set up as a gift. The person it is for decides what stays.",

  /*
   * The small words on buttons and for screen readers. They rarely need changing.
   * In pictureCount, {n} and {total} are filled in by the site: leave them as they are.
   */
  ui: {
    skip: "Skip to the page",
    menu: "Pages",
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
    /* The plain note under the address. It says what the panel does and does not do. */
    supportHow:
      "To send something, paste this address into your own wallet. This page does not connect to a wallet, hold anything or take a payment. Read the address back before you send, because a transfer cannot be undone.",
  },
};
