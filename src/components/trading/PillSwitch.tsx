"use client";

import type { MouseEvent } from "react";
import { setPill } from "@/lib/look";
import type { Pill } from "@/lib/look";
import { usePill } from "@/lib/use-media";

interface PillSwitchProps {
  words: { label: string; blue: string; red: string; blueLine: string; redLine: string };
}

/**
 * The red pill and the blue pill, on his desk. Blue (the default) keeps his
 * colours: cyan on night. Red shows the market's own: green and red candles,
 * an amber average line, and a rain of numbers in a terminal's green. The
 * screen glitches for a moment as it switches (not for anyone whose device
 * asks for less motion). The choice is kept in this browser, like the look.
 */
export default function PillSwitch({ words }: PillSwitchProps) {
  const pill = usePill();

  const choose = (next: Pill, event: MouseEvent<HTMLButtonElement>) => {
    if (next === pill) return;
    setPill(next);
    const screen = event.currentTarget.closest(".terminal");
    if (screen && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      screen.classList.remove("glitching");
      void (screen as HTMLElement).offsetWidth;
      screen.classList.add("glitching");
      window.setTimeout(() => screen.classList.remove("glitching"), 520);
    }
  };

  return (
    <div className="pills" role="group" aria-label={words.label}>
      <button
        type="button"
        className="pill pill-blue"
        aria-pressed={pill === "blue"}
        aria-label={`${words.blue}: ${words.blueLine}`}
        title={words.blueLine}
        onClick={(event) => choose("blue", event)}
      >
        <span className="pill-capsule" aria-hidden="true" />
        <span className="pill-word">{words.blue}</span>
      </button>
      <button
        type="button"
        className="pill pill-red"
        aria-pressed={pill === "red"}
        aria-label={`${words.red}: ${words.redLine}`}
        title={words.redLine}
        onClick={(event) => choose("red", event)}
      >
        <span className="pill-capsule" aria-hidden="true" />
        <span className="pill-word">{words.red}</span>
      </button>
    </div>
  );
}
