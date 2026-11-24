"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  const timer = window.setInterval(onChange, 1000);
  return () => window.clearInterval(timer);
};
const clientNow = () => Math.floor(Date.now() / 1000) * 1000;
const serverNow = () => null;

/** The two clocks on his desk: New York, where he posts his times, and the visitor's own. */
export default function DeskClock({ zone, words }: { zone: string; words: { eastern: string; yours: string } }) {
  const now = useSyncExternalStore(subscribe, clientNow, serverNow);
  const format = (timeZone?: string) =>
    now === null
      ? "--:--:--"
      : new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23", timeZone }).format(now);

  return (
    <p className="desk-clock">
      <span className="desk-clock-place">{words.eastern}</span>
      <time className="desk-clock-time">{format(zone)}</time>
      <span className="desk-clock-place">{words.yours}</span>
      <time className="desk-clock-time">{format()}</time>
    </p>
  );
}
