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
   * entertainment purposes"; "educational" for teacher), and "fashion
   * photographer" (the ALPHAS interview).
   */
  turning: ["Futures trader", "Live streamer", "Teacher", "Entertainer", "Host of TMade", "Fashion photographer"],
  turningLabel: "What he does",

  /*
   * The four seats he sits in, each with a line of his own and where it was said. Each card opens
   * the video at the moment he says it. `video` names the video's YouTube id, which of YouTube's
   * own thumbnails to show ("maxresdefault" is the video's cover, "hq1" to "hq3" are stills from
   * it), and whose channel it is on. Under each picture runs a small moving drawing of the seat
   * (candles, sound levels, a voice in a room, a viewfinder). The lines are kept to about the same
   * length, so the four cards fill evenly. The photographer's "worked for big brands" is his
   * "I've been able to work for some really big brands" (ALPHAS, 2:05).
   */
  roles: {
    title: "Four seats, one person",
    text: "At the desk, on the stream, across from a guest and behind the camera. Each in his own words: choose one to hear him say it.",
    watch: "Watch on YouTube",
    list: [
      {
        id: "trader",
        role: "Futures trader",
        line: "NQ and ES futures, live, Monday to Friday: a scalper who trades continuations with VWAP and takes his base hits.",
        quote: { text: "I want to show up, do the same thing every day.", source: "alphas", at: 2890 } as Quote,
        video: { id: "-oA2tyZEsfw", picture: "maxresdefault", channel: "ALPHAS, on TradersPost" },
      },
      {
        id: "streamer",
        role: "Streamer and teacher",
        line: "Two sessions a day with the chat open, teaching as he trades. His streams call themselves educational and entertainment.",
        quote: {
          text: "This stream is for educational and entertainment purposes only",
          source: "streamDescriptions",
        } as Quote,
        video: { id: "x_UvIwCmHAA", picture: "maxresdefault", channel: "TMade Alex, New York AM Session" },
      },
      {
        id: "host",
        role: "Host",
        line: "Host of TMade, and of Meet the Trader on FundedNext's YouTube channel, where he asks other traders about their road.",
        quote: { text: "All right, fam, welcome to the show. Welcome to Meet the Traders.", source: "meetTheTrader", at: 28 } as Quote,
        video: { id: "DjtViPPtE7c", picture: "maxresdefault", channel: "Meet the Trader, on FundedNext" },
      },
      {
        id: "photographer",
        role: "Fashion photographer",
        line: "Miami-born, in New York since 2014. He has worked for big brands, and is shooting a first book on family and culture.",
        quote: { text: "I'm a fashion photographer based in New York.", source: "alphas", at: 95 } as Quote,
        video: { id: "-oA2tyZEsfw", picture: "hq2", channel: "ALPHAS, on TradersPost" },
      },
    ] as {
      id: "trader" | "streamer" | "host" | "photographer";
      role: string;
      line: string;
      quote: Quote;
      video: { id: string; picture: string; channel: string };
    }[],
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
