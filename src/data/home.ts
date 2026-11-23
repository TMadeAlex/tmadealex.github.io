/*
 * The front page. Who he is and what he does come first; where to watch and
 * where the community is come next. Every quotation names where it was read
 * (see sources.ts).
 */

import type { Cited, Quote } from "./sources";

export const home = {
  /* The small line above his name: the words on his own TRADERMADE banner. */
  kicker: { text: "Live trading · NQ + ES · M–F", source: "whopBanner" } as Cited & { text: string },

  /* The lines under his name. */
  lead: "Futures trader, live streamer and host of TMade.",
  second: "Behind the camera, a fashion photographer in New York.",
  leadSource: { source: "instagramBio" } as Cited,

  watch: {
    title: "Watch him trade, free",
    text: "He trades NQ and ES futures live on YouTube, with the chat open. His streams put it this way:",
    quote: { text: "Pull up, ask questions in the chat, and trade the overnight session with us.", source: "streamDescriptions" } as Quote,
    action: { label: "YouTube @TMadeAlex", href: "https://www.youtube.com/@TMadeAlex" },
  },

  community: {
    title: "TRADERMADE, the community",
    text: "His community lives on Whop. Its free tier opens part of the Discord; joining, plans and payment all happen there.",
    quote: {
      text: "I'm a nice guy. I don't bite. I'm super sweet. So, even if you just want to come in and say hello, I also appreciate that.",
      source: "alphas",
      at: 3556,
    } as Quote,
    action: { label: "TRADERMADE on Whop", href: "https://whop.com/tradermade/" },
  },

  /* The large quotation in the middle of the page. */
  band: {
    text: "If you're on the road to profitability, I believe you can get there. Not because it's easy, it isn't, and most of the fight won't be with the market. It'll be with yourself, on the days nobody sees.",
    source: "instagramRoad",
  } as Quote,

  /* The two doors at the foot of the page. */
  doors: {
    trading: {
      title: "Trading",
      text: "The sessions, the names you will hear on stream, and the figures as he states them.",
      href: "/trading/",
      label: "Open the trading page",
    },
    photography: {
      title: "Photography",
      text: "Miami-born, in New York since 2014, shooting fashion and a first book about family and culture.",
      href: "/photography/",
      label: "Open the photography page",
    },
  },
};
