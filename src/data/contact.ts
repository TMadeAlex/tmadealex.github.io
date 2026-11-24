/*
 * The contact page is these links and nothing else. There is no form and no
 * email address: every link goes to a page of his own.
 */

export interface ContactLink {
  /** Where it is, in a word. */
  place: string;
  /** The handle or name as it reads there. */
  handle: string;
  href: string;
  /** Optional: one short line under the link. */
  note?: string;
}

export interface ContactGroup {
  id: string;
  title: string;
  text?: string;
  links: ContactLink[];
}

export const contact = {
  title: "Contact",
  lead: "Every link goes to a page of his own. There is no email address on this site.",

  groups: [
    {
      id: "tmade",
      title: "TMade",
      links: [
        {
          place: "YouTube",
          handle: "@TMadeAlex",
          href: "https://www.youtube.com/@TMadeAlex",
          note: "Live streams Monday-Friday.",
        },
        { place: "X", handle: "@TMadeAlex", href: "https://x.com/tmadealex" },
        { place: "Instagram", handle: "@tmadealex", href: "https://www.instagram.com/tmadealex/" },
        {
          place: "Whop",
          handle: "TRADERMADE",
          href: "https://whop.com/tradermade/",
          note: "The community: the free tier and the paid plan.",
        },
      ],
    },
    {
      id: "photography",
      title: "Alexander Saladrigas, photography",
      links: [
        { place: "Website", handle: "alexandersaladrigas.com", href: "https://www.alexandersaladrigas.com/" },
        { place: "Instagram", handle: "@alexandersaladrigas", href: "https://www.instagram.com/alexandersaladrigas" },
        {
          place: "LinkedIn",
          handle: "Alexander Saladrigas",
          href: "https://www.linkedin.com/in/alexander-saladrigas-237823b4/",
        },
      ],
    },
  ] as ContactGroup[],

  /* The note about the site itself, at the foot of the contact page. */
  colophon: {
    title: "About this site",
    paragraphs: [
      "A member of the TRADERMADE community built this site as a gift, with two AI helpers: Claude Code, and Littlebird (littlebird.ai). The member is one of Littlebird's ambassadors. TMade Alex decides what stays, what changes, and whether it stays up at all.",
      "Every figure and quotation comes from Alex's own public pages, read on 23 November 2026, and links to where it was read. Quotations from videos are as YouTube's automatic captions print them.",
      "The photographs on the photography page are shown from his own site, where he published them, and each links back to it. None is copied here.",
      "No link on this site earns the person who set it up anything. There are no cookies, no forms and no tracking; the look you choose (night, morning, PARTY_MODE) is remembered by your own browser only. Search engines are asked not to list it.",
      "The candles drawn on these pages, the cursor's included, are decoration made up by the site. They are not market data and not anyone's trades.",
    ],
  },
};
