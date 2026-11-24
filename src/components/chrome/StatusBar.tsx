"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { CodeIcon, GithubLogoIcon, ShieldCheckIcon } from "@phosphor-icons/react";
import type { Session } from "@/data/schedule";
import { occurrences } from "@/lib/sessions";
import { useLocale } from "@/i18n/client";

interface StatusBarProps {
  sessions: Session[];
  days: number[];
  zone: string;
  /** His times as he posts them, shown until the browser knows the visitor's own time. */
  posted: string;
  words: { label: string; next: string; until: string; scheduled: string; risk: string; riskHref: string; in: string; h: string; min: string };
  source: { label: string; short: string; href: string; home: { label: string; short: string; href: string } };
}

const TICK = 30_000;
const subscribe = (onChange: () => void) => {
  const timer = window.setInterval(onChange, TICK);
  return () => window.clearInterval(timer);
};
const clientNow = () => Math.floor(Date.now() / TICK) * TICK;
const serverNow = () => null;

/**
 * The thin bar fixed at the foot of every page, like the status line of a
 * trading screen: the next scheduled session in the visitor's own time (or the
 * one scheduled now, and until when), the risk line, his home on GitHub and
 * this site's source there. It says what is scheduled, never that a stream is live.
 */
export default function StatusBar({ sessions, days, zone, posted, words, source }: StatusBarProps) {
  const now = useSyncExternalStore(subscribe, clientNow, serverNow);
  /* Days and times in the page's language: Spanish on /es/, the visitor's own otherwise. */
  const dateLocale = useLocale() === "es" ? "es" : undefined;

  let line = posted;
  let current = false;
  if (now !== null) {
    const time = new Intl.DateTimeFormat(dateLocale, { hour: "2-digit", minute: "2-digit" });
    const weekday = new Intl.DateTimeFormat(dateLocale, { weekday: "short" });
    const all = occurrences(now, sessions, days, zone);
    const during = all.find((o) => o.start <= now && o.end > now);
    const coming = all.find((o) => o.start > now);
    if (during) {
      current = true;
      line = `${words.scheduled}: ${during.session.name}, ${words.until} ${time.format(during.end)}`;
    } else if (coming) {
      const minutes = Math.max(1, Math.round((coming.start - now) / 60_000));
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      const wait = `${words.in} ${h > 0 ? `${h} ${words.h} ` : ""}${m} ${words.min}`;
      line = `${words.next}: ${coming.session.name}, ${weekday.format(coming.start)} ${time.format(coming.start)} (${wait})`;
    }
  }

  return (
    <aside className="status-bar" aria-label={words.label}>
      <p className="status-session">
        <span className={current ? "status-dot status-dot-now" : "status-dot"} aria-hidden="true" />
        <span className="status-session-text">{line}</span>
      </p>
      <Link href={words.riskHref} className="status-link status-risk">
        <ShieldCheckIcon weight="duotone" aria-hidden="true" />
        <span>{words.risk}</span>
      </Link>
      <a href={source.home.href} rel="noopener noreferrer" className="status-link" title={source.home.label} aria-label={source.home.label}>
        <GithubLogoIcon weight="duotone" aria-hidden="true" />
        <span className="status-source-word">{source.home.short}</span>
      </a>
      <a href={source.href} rel="noopener noreferrer" className="status-link" title={source.label} aria-label={source.label}>
        <CodeIcon weight="duotone" aria-hidden="true" />
        <span className="status-source-word">{source.short}</span>
      </a>
    </aside>
  );
}
