/*
 * The front page. Who he is and what he does come first; where to watch and
 * where the community is come next. Every quotation names where it was read
 * (see sources.ts).
 */

import type { Cited, Quote } from "./sources";

export const home = {
  /* The small line above his name: the words of his YouTube About. */
  kicker: { text: "Live streams Monday-Friday.", source: "youtube" } as Cited & { text: string },

  /* The lines under his name: the first is his Instagram bio ("Futures Trader | Streamer and Host of TMade"),
     the second what he says in the ALPHAS interview ("I'm a fashion photographer based in New York."). */
  lead: "Futures trader, streamer and host of TMade.",
  second: "Behind the camera, a fashion photographer in New York.",
  leadSource: { source: "instagramBio" } as Cited,
  secondSource: { source: "alphas", at: 95 } as Cited,

  /*
   * The words that turn in the line under his name, one after another. Each is
   * his own: "Futures Trader | Streamer and Host of TMade" (his Instagram bio),
   * "entertainment" (every stream description: "for educational and
   * entertainment purposes"), and "fashion photographer" (the ALPHAS interview).
   */
  turning: ["Futures trader", "Live streamer", "Entertainer", "Host of TMade", "Fashion photographer"],
  turningLabel: "What he does",

  /* The four seats he sits in, each with a line of his own and where it was said. */
  roles: {
    title: "Four seats, one person",
    text: "At the desk, on the stream, across from a guest and behind the camera. Each in his own words.",
    list: [
      {
        id: "trader",
        role: "Futures trader",
        line: "NQ and ES futures, live, Monday to Friday.",
        quote: { text: "I think I just love scalping.", source: "alphas", at: 1174 } as Quote,
      },
      {
        id: "streamer",
        role: "Live streamer and entertainer",
        line: "Two sessions a day with the chat open. His streams call themselves educational and entertainment.",
        quote: {
          text: "This stream is for educational and entertainment purposes only",
          source: "streamDescriptions",
        } as Quote,
      },
      {
        id: "host",
        role: "Host of TMade",
        line: "On Meet the Trader he sits across from other traders and asks about their road.",
        quote: { text: "All right, fam, welcome to the show. Welcome to Meet the Traders.", source: "meetTheTrader", at: 28 } as Quote,
      },
      {
        id: "photographer",
        role: "Fashion photographer",
        line: "Miami-born, in New York since 2014, shooting a first book about family and culture.",
        quote: { text: "I'm a fashion photographer based in New York.", source: "alphas", at: 95 } as Quote,
      },
    ] as { id: "trader" | "streamer" | "host" | "photographer"; role: string; line: string; quote: Quote }[],
  },

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
