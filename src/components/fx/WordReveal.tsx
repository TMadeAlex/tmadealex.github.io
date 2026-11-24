"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useStill } from "@/lib/use-media";

function Word({ progress, from, to, last, children }: { progress: MotionValue<number>; from: number; to: number; last: boolean; children: ReactNode }) {
  const opacity = useTransform(progress, [from, to], [0.16, 1]);
  const blur = useTransform(progress, [from, to], ["blur(4px)", "blur(0px)"]);
  return (
    <>
      <motion.span style={{ opacity, filter: blur }} className="reveal-word">
        {children}
      </motion.span>
      {last ? null : " "}
    </>
  );
}

/**
 * A sentence that comes into focus word by word as it scrolls up the screen,
 * like a lens pulling focus. The words are all there for a screen reader from
 * the start; without motion they are simply shown.
 */
export default function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const still = useStill();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "end 0.5"] });
  const words = text.split(" ");

  if (still) {
    return (
      <span ref={ref} className={className}>
        {text}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={`${word}-${i}`} progress={scrollYProgress} from={i / words.length} to={(i + 1) / words.length} last={i === words.length - 1}>
          {word}
        </Word>
      ))}
    </span>
  );
}
