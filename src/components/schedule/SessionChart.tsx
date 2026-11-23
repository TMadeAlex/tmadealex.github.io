"use client";

import { useSyncExternalStore } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { Session } from "@/data/schedule";
import { dayFraction, occurrences } from "@/lib/sessions";

export interface SessionWords {
  weekdays: string;
  yourTime: string;
  eastern: string;
  nextStart: string;
  in: string;
  hours: string;
  minutes: string;
  now: string;
}

interface SessionChartProps {
  sessions: Session[];
  days: number[];
  zone: string;
  words: SessionWords;
  /** The line under the chart: his posted times and where they were read. */
  children?: ReactNode;
}

/*
 * The clock ticks every 30 seconds. Before the page reaches the browser there
 * is no visitor and no time zone, so the server draws the chart in Eastern time,
 * as he posts it; the browser then redraws it in the visitor's own time.
 */
const TICK = 30_000;
const subscribe = (onChange: () => void) => {
  const timer = window.setInterval(onChange, TICK);
  return () => window.clearInterval(timer);
};
const clientNow = () => Math.floor(Date.now() / TICK) * TICK;
const serverNow = () => null;

/** Where each session's box sits up the chart. Decoration only, like a session box drawn on a price chart. */
const BOXES = [
  { top: 14, height: 50 },
  { top: 40, height: 40 },
];

const TICKS = [0, 3, 6, 9, 12, 15, 18, 21];

interface Row {
  session: Session;
  /** Where the box starts and ends, as fractions of the day (it may wrap past midnight). */
  from: number;
  to: number;
  times: string;
  days: string;
}

function hhmmFraction(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return (h * 60 + m) / 1440;
}

/** One box, or two when the session crosses midnight. */
function segments(from: number, to: number): [number, number][] {
  return to > from ? [[from, to]] : [[from, 1], [0, to]];
}

export default function SessionChart({ sessions, days, zone, words, children }: SessionChartProps) {
  const now = useSyncExternalStore(subscribe, clientNow, serverNow);

  let rows: Row[];
  let zoneLabel = words.eastern;
  let next: { name: string; when: string; wait: string } | null = null;

  if (now === null) {
    rows = sessions.map((session) => ({
      session,
      from: hhmmFraction(session.start),
      to: hhmmFraction(session.end),
      times: session.posted,
      days: words.weekdays,
    }));
  } else {
    const time = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" });
    const weekday = new Intl.DateTimeFormat(undefined, { weekday: "short" });
    const all = occurrences(now, sessions, days, zone);
    zoneLabel = `${words.yourTime} · ${Intl.DateTimeFormat().resolvedOptions().timeZone.replaceAll("_", " ")}`;

    rows = sessions.map((session) => {
      const upcoming = all.filter((o) => o.session.id === session.id && o.end > now);
      const first = upcoming[0];
      /* The local weekday of the first and last posted day of a week, for example Mon–Fri or Tue–Sat. */
      const firstDay = upcoming.find((o) => o.postedDay === days[0]);
      const lastDay = upcoming.find((o) => o.postedDay === days[days.length - 1]);
      const span =
        firstDay && lastDay ? `${weekday.format(firstDay.start)}–${weekday.format(lastDay.start)}` : words.weekdays;
      return {
        session,
        from: dayFraction(first.start),
        to: dayFraction(first.end),
        times: `${time.format(first.start)}–${time.format(first.end)}`,
        days: span,
      };
    });

    const coming = all.find((o) => o.start > now);
    if (coming) {
      const minutes = Math.max(1, Math.round((coming.start - now) / 60_000));
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      next = {
        name: coming.session.name,
        when: `${weekday.format(coming.start)} ${time.format(coming.start)}`,
        wait: `${words.in} ${h > 0 ? `${h} ${words.hours} ` : ""}${m} ${words.minutes}`,
      };
    }
  }

  return (
    <figure className="session-panel on-dark">
      <div className="session-head">
        <span>{words.weekdays}</span>
        <span className="session-zone">{zoneLabel}</span>
      </div>

      <div className="session-chart" aria-hidden="true">
        {TICKS.map((hour) => (
          <span key={hour} className="session-tick" style={{ left: `${(hour / 24) * 100}%` }}>
            <span className="session-tick-label">{String(hour).padStart(2, "0")}</span>
          </span>
        ))}
        {rows.map((row, i) =>
          segments(row.from, row.to).map(([a, b], part) => (
            <span
              key={`${row.session.id}-${part}`}
              className={a > 0.78 ? "session-box session-box-end" : "session-box"}
              style={
                {
                  left: `${a * 100}%`,
                  width: `${(b - a) * 100}%`,
                  top: `${BOXES[i % BOXES.length].top}%`,
                  height: `${BOXES[i % BOXES.length].height}%`,
                  "--i": i,
                } as CSSProperties
              }
            >
              {part === 0 ? <span className="session-box-label">{row.session.short}</span> : null}
            </span>
          )),
        )}
        {now !== null ? (
          <span
            className={dayFraction(now) > 0.72 ? "session-now session-now-end" : "session-now"}
            style={{ left: `${dayFraction(now) * 100}%` }}
          >
            <span className="session-now-label">{words.now}</span>
          </span>
        ) : null}
      </div>

      <dl className="session-list">
        {rows.map((row) => (
          <div key={row.session.id} className="session-row">
            <dt>
              {row.session.name}
              <span className="session-markets">{row.session.markets}</span>
            </dt>
            <dd>
              <span className="session-times">{row.times}</span>
              <span className="session-days">{row.days}</span>
            </dd>
          </div>
        ))}
      </dl>

      <p className="session-next" aria-live="off">
        {next ? (
          <>
            <span className="session-next-label">{words.nextStart}</span>
            <span>
              {next.name}, {next.when} <span className="session-wait">({next.wait})</span>
            </span>
          </>
        ) : (
          <span className="session-next-label">&nbsp;</span>
        )}
      </p>

      {children ? <figcaption className="session-source">{children}</figcaption> : null}
    </figure>
  );
}
