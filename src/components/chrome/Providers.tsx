"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { readParty, setParty } from "@/lib/look";
import PartyBurst from "@/components/fx/PartyBurst";

interface ProvidersProps {
  /** The two lines said when PARTY_MODE goes on or off (party in site.ts). */
  partyWords: { on: string; off: string };
  children: ReactNode;
}

/** Where PARTY_MODE was switched from, so the confetti candles start there. */
export interface PartyDetail {
  on: boolean;
  x: number;
  y: number;
}

/** Switches PARTY_MODE and tells the page, so the confetti and the little note can answer. */
export function toggleParty(from?: { x: number; y: number }) {
  const on = !readParty();
  setParty(on);
  window.dispatchEvent(
    new CustomEvent<PartyDetail>("tmade:party", {
      detail: { on, x: from?.x ?? window.innerWidth / 2, y: from?.y ?? 64 },
    }),
  );
}

/**
 * Wraps every page. Motion follows the visitor's own setting: anyone whose
 * device asks for less motion gets the site without the moving parts. Shift + P
 * switches PARTY_MODE from anywhere, and a short note says it changed.
 */
export default function Providers({ partyWords, children }: ProvidersProps) {
  const [note, setNote] = useState("");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key !== "P" && event.key !== "p") return;
      const target = event.target as HTMLElement | null;
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      event.preventDefault();
      toggleParty();
    };
    const onParty = (event: Event) => {
      const { on } = (event as CustomEvent<PartyDetail>).detail;
      setNote(on ? partyWords.on : partyWords.off);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setNote(""), 2600);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("tmade:party", onParty);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("tmade:party", onParty);
      window.clearTimeout(timer.current);
    };
  }, [partyWords]);

  return (
    <MotionConfig reducedMotion="user">
      {children}
      <PartyBurst />
      <p className={note ? "party-note party-note-shown" : "party-note"} role="status" aria-live="polite">
        {note}
      </p>
    </MotionConfig>
  );
}
