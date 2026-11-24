"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { useStill } from "@/lib/use-media";

const DIGITS = "0123456789";

/**
 * Words whose digits roll into place like a price board when they come into
 * view, and stop exactly on the words as published. A screen reader reads the
 * words as they are; without motion they simply show.
 */
export default function RollingText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const still = useStill();
  const settled = seen || still;

  return (
    <span ref={ref} className={`rolling ${className}`}>
      <span className="sr-only">{text}</span>
      {[...text].map((char, i) =>
        DIGITS.includes(char) ? (
          <span key={i} className="digit" aria-hidden="true">
            <span
              className="digit-strip"
              style={{
                transform: `translateY(-${(settled ? Number(char) : (Number(char) + 5) % 10) * 10}%)`,
                transitionDelay: `${i * 90}ms`,
              }}
            >
              {DIGITS.split("").map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden="true">
            {char}
          </span>
        ),
      )}
    </span>
  );
}
