"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@phosphor-icons/react";

interface ScrollJumpProps {
  /** "Jump to the bottom" and "Back to the top", in the page's language. */
  labels: { bottom: string; top: string };
}

/**
 * A round button that rides at the bottom of a long window or panel (the
 * Support window, the risk window, the phone menu): near the top it jumps to
 * the end; further down it goes back to the top. It only shows when there is
 * more to scroll. It belongs to the nearest box that scrolls, so it needs no
 * wiring: drop it in as the last thing inside.
 */
export default function ScrollJump({ labels }: ScrollJumpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"hidden" | "down" | "up">("hidden");

  useEffect(() => {
    const dock = ref.current;
    if (!dock) return;
    let box: HTMLElement | null = dock.parentElement;
    while (box && box !== document.body) {
      const style = getComputedStyle(box);
      if (/(auto|scroll)/.test(style.overflowY)) break;
      box = box.parentElement;
    }
    if (!box || box === document.body) return;
    const scroller = box;
    const update = () => {
      const room = scroller.scrollHeight - scroller.clientHeight;
      if (room < 48) setState("hidden");
      else setState(scroller.scrollTop < 48 ? "down" : "up");
    };
    scroller.addEventListener("scroll", update, { passive: true });
    const sized = new ResizeObserver(update);
    sized.observe(scroller);
    return () => {
      scroller.removeEventListener("scroll", update);
      sized.disconnect();
    };
  }, []);

  const go = () => {
    const dock = ref.current;
    let box: HTMLElement | null = dock?.parentElement ?? null;
    while (box && !/(auto|scroll)/.test(getComputedStyle(box).overflowY)) box = box.parentElement;
    if (!box) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    box.scrollTo({ top: state === "down" ? box.scrollHeight : 0, behavior: still ? "auto" : "smooth" });
  };

  const label = state === "down" ? labels.bottom : labels.top;

  return (
    <div ref={ref} className={state === "hidden" ? "jump-dock" : "jump-dock jump-dock-on"}>
      {state === "hidden" ? null : (
        <button type="button" className="jump-button" onClick={go} aria-label={label} title={label}>
          {state === "down" ? <ArrowDownIcon weight="bold" aria-hidden="true" /> : <ArrowUpIcon weight="bold" aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}
