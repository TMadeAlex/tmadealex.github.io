/*
 * Turns the schedule in src/data/schedule.ts (Eastern time, as he posts it)
 * into moments in time, so a visitor's browser can show them in its own time
 * zone. Uses only the browser's own Intl clock: nothing is fetched.
 */

import type { Session } from "@/data/schedule";

const DAY = 86_400_000;

/** Minutes the zone is ahead of UTC at a given moment (negative for New York). */
function offsetMinutes(instant: number, zone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(instant));
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  const wall = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"), get("second"));
  return Math.round((wall - Math.floor(instant / 1000) * 1000) / 60_000);
}

/** The moment a wall-clock time happens in a zone. */
function wallToInstant(year: number, month: number, day: number, hhmm: string, zone: string): number {
  const [hours, minutes] = hhmm.split(":").map(Number);
  const guess = Date.UTC(year, month - 1, day, hours, minutes);
  const first = guess - offsetMinutes(guess, zone) * 60_000;
  return guess - offsetMinutes(first, zone) * 60_000;
}

/** The calendar date in a zone at a given moment. */
function zonedDate(instant: number, zone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date(instant));
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  return { year: get("year"), month: get("month"), day: get("day") };
}

export interface Occurrence {
  session: Session;
  /** Day of the week in the posting zone, 0 Sunday to 6 Saturday. */
  postedDay: number;
  start: number;
  end: number;
}

/** Every scheduled session from yesterday to eight days ahead, in order. */
export function occurrences(now: number, sessions: Session[], days: number[], zone: string): Occurrence[] {
  const today = zonedDate(now, zone);
  const found: Occurrence[] = [];
  for (let k = -1; k <= 8; k += 1) {
    const date = new Date(Date.UTC(today.year, today.month - 1, today.day + k));
    const weekday = date.getUTCDay();
    if (!days.includes(weekday)) continue;
    const [year, month, day] = [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()];
    for (const session of sessions) {
      const start = wallToInstant(year, month, day, session.start, zone);
      let end = wallToInstant(year, month, day, session.end, zone);
      if (end <= start) end += DAY;
      found.push({ session, postedDay: weekday, start, end });
    }
  }
  return found.sort((a, b) => a.start - b.start);
}

/** Hours since local midnight, as a fraction of the day (0 to 1). */
export function dayFraction(instant: number): number {
  const date = new Date(instant);
  return (date.getHours() * 60 + date.getMinutes()) / 1440;
}
