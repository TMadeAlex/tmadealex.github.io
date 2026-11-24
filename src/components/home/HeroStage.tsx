"use client";

import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useStill } from "@/lib/use-media";

interface HeroStageProps {
  /** The faint candles behind everything (CandleField, drawn on the server). */
  field: ReactNode;
  /** His name, the turning line, the words and the buttons. */
  children: ReactNode;
  /** The session chart, on its own pane of glass. */
  aside: ReactNode;
  labelledBy: string;
}

/**
 * The front page's first screen, built in layers like a photograph with depth:
 * at the back, faint candles; over them, a camera's viewfinder; in front, his
 * name and the schedule. Scrolling moves each layer at its own speed, and the
 * mouse shifts them a little, as a lens would. Without motion, the layers
 * simply sit still.
 */
export default function HeroStage({ field, children, aside, labelledBy }: HeroStageProps) {
  const ref = useRef<HTMLElement>(null);
  const still = useStill();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const px = useSpring(pointerX, { stiffness: 50, damping: 16 });
  const py = useSpring(pointerY, { stiffness: 50, damping: 16 });

  const fieldY = useTransform(() => (still ? 0 : scrollYProgress.get() * 180 + py.get() * -12));
  const fieldX = useTransform(() => (still ? 0 : px.get() * -22));
  const finderY = useTransform(() => (still ? 0 : scrollYProgress.get() * 80 + py.get() * -5));
  const finderX = useTransform(() => (still ? 0 : px.get() * -8));
  const wordsY = useTransform(() => (still ? 0 : scrollYProgress.get() * -70));
  const asideY = useTransform(() => (still ? 0 : scrollYProgress.get() * -120));
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, still ? 1 : 0.15]);
  const needle = useTransform(() => `${50 + px.get() * 42}%`);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || still) return;
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - box.left) / box.width - 0.5) * 2);
    pointerY.set(((event.clientY - box.top) / box.height - 0.5) * 2);
  };

  return (
    <section ref={ref} className="hero" aria-labelledby={labelledBy} onPointerMove={onPointerMove}>
      <motion.div className="hero-field" style={{ x: fieldX, y: fieldY }}>
        {field}
      </motion.div>

      <motion.div className="hero-finder" style={{ x: finderX, y: finderY }} aria-hidden="true">
        <span className="finder-corner finder-tl" />
        <span className="finder-corner finder-tr" />
        <span className="finder-corner finder-bl" />
        <span className="finder-corner finder-br" />
        <span className="finder-focus" />
        <span className="finder-meter">
          <span className="finder-meter-scale">
            <span>−2</span>
            <span>·</span>
            <span>−1</span>
            <span>·</span>
            <span>0</span>
            <span>·</span>
            <span>+1</span>
            <span>·</span>
            <span>+2</span>
          </span>
          <motion.span className="finder-needle" style={{ left: needle }} />
        </span>
      </motion.div>

      <div className="frame hero-grid">
        <motion.div className="hero-words" style={{ y: wordsY, opacity: fade }}>
          {children}
        </motion.div>
        <motion.div className="hero-aside" style={{ y: asideY }}>
          {aside}
        </motion.div>
      </div>
    </section>
  );
}
