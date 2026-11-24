"use client";

import { useEffect, useRef } from "react";

/**
 * A chart's crosshair: two dashed lines that follow the mouse over the box this
 * sits in, as on a charting screen. It listens to its parent, so the parent
 * (a link or a chart) keeps every click. Decoration only.
 */
export default function Crosshair({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    const parent = node?.parentElement;
    if (!node || !parent) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const box = parent.getBoundingClientRect();
      node.style.setProperty("--cx", `${event.clientX - box.left}px`);
      node.style.setProperty("--cy", `${event.clientY - box.top}px`);
      node.dataset.on = "true";
    };
    const onLeave = () => {
      delete node.dataset.on;
    };
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <span ref={ref} className={`crosshair ${className}`} aria-hidden="true">
      <span className="crosshair-x" />
      <span className="crosshair-y" />
      <span className="crosshair-dot" />
    </span>
  );
}
