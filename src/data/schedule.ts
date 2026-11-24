/*
 * When he streams, as he posts it: in Eastern time (New York). The site turns
 * these into each visitor's own time, in their browser. It never says a stream
 * is live: it shows when each session is scheduled, and the next start.
 *
 * Times are 24-hour, "HH:MM", Eastern. Days are Monday (1) to Friday (5),
 * counted in Eastern time.
 */

import type { Cited } from "./sources";

export interface Session {
  /** A short name with no spaces. */
  id: string;
  /** The name as his stream titles give it. */
  name: string;
  /** The short label on the chart. */
  short: string;
  /** What is traded, as the stream titles say. */
  markets: string;
  start: string;
  end: string;
  /** The same times as he writes them, shown before the visitor's own time is known. */
  posted: string;
}

export const schedule = {
  zone: "America/New_York",
  days: [1, 2, 3, 4, 5],
  sessions: [
    {
      id: "ny-am",
      name: "New York AM Session",
      short: "NY AM",
      markets: "NQ + ES",
      start: "09:30",
      end: "11:30",
      posted: "9:30–11:30am ET",
    },
    {
      id: "asia",
      name: "Asia Session",
      short: "Asia",
      markets: "NQ + ES",
      start: "20:00",
      end: "22:00",
      posted: "8–10pm ET",
    },
  ] as Session[],

  /* His own words for the schedule, and where they were read. */
  posted: {
    text: "Live trading Monday-Friday NY AM 9:30-11:30am + Asia 8-10pm EST",
    source: "xBio",
  } as Cited & { text: string; translation?: string },

  words: {
    heading: "When he trades live",
    weekdays: "Monday to Friday",
    yourTime: "Your time",
    eastern: "Eastern time, as he posts it",
    nextStart: "Next scheduled start",
    in: "in",
    hours: "h",
    minutes: "min",
    now: "Your time now",
    check: "Plans change: his YouTube channel shows what is on today.",
  },
};
