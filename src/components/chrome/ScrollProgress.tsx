"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon, CaretDoubleDownIcon } from "@phosphor-icons/react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";

interface ScrollProgressProps {
  /** The round button's words ("Back to the top"). */
  label: string;
  /** The cue at the bottom centre while the page is at its top: its word, and what it does. */
  cue: { word: string; label: string };
}

/**
 * How far down the page someone is: a thin line under the menu with a glowing
 * tip, like price moving along its line, and, once they are well down, a round
 * button in the corner whose ring fills as they read. The button goes back to
 * the top.
 *
 * While a page is still at its top, a small cue sits at the bottom centre of
 * the screen (a mouse whose wheel rolls, and "Scroll"), saying there is more
 * below. It leaves as soon as the page moves, and pressing it scrolls down.
 */
export default function ScrollProgress({ label, cue }: ScrollProgressProps) {
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const ring = useTransform(progress, (v) => 113.1 * (1 - v));
  const tip = useTransform(progress, (v) => `${v * 100}%`);
  const [shown, setShown] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [tall, setTall] = useState(true);

  useMotionValueEvent(scrollY, "change", (y) => {
    setShown(y > 480);
    setAtTop(y < 40);
  });

  /* The cue only makes sense on a page taller than the screen. */
  useEffect(() => {
    /* Also whether the page opened part-way down (a link to #risk, or the browser's back button). */
    const measure = () => {
      setTall(document.documentElement.scrollHeight - window.innerHeight > 160);
      setAtTop(window.scrollY < 40);
    };
    const frame = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const cued = atTop && tall;

  const down = () => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: still ? "auto" : "smooth" });
  };

  const toTop = () => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <>
      <div className="scroll-line" aria-hidden="true">
        <motion.span className="scroll-line-fill" style={{ scaleX: progress }} />
        <motion.span className="scroll-line-tip" style={{ left: tip }} />
      </div>
      <motion.button
        type="button"
        className="scroll-top"
        onClick={toTop}
        aria-label={label}
        title={label}
        initial={false}
        animate={{ opacity: shown ? 1 : 0, scale: shown ? 1 : 0.6, y: shown ? 0 : 12 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        style={{ pointerEvents: shown ? "auto" : "none" }}
        tabIndex={shown ? 0 : -1}
      >
        <svg viewBox="0 0 44 44" className="scroll-top-ring" aria-hidden="true">
          <circle cx="22" cy="22" r="18" className="scroll-top-track" />
          <motion.circle cx="22" cy="22" r="18" className="scroll-top-fill" style={{ strokeDashoffset: ring }} />
        </svg>
        <ArrowUpIcon weight="duotone" className="scroll-top-icon" aria-hidden="true" />
      </motion.button>
      <motion.button
        type="button"
        className="scroll-cue"
        onClick={down}
        aria-label={cue.label}
        initial={false}
        animate={{ opacity: cued ? 1 : 0, y: cued ? 0 : 18 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        style={{ x: "-50%", pointerEvents: cued ? "auto" : "none" }}
        tabIndex={cued ? 0 : -1}
      >
        <span className="scroll-cue-mouse" aria-hidden="true">
          <span className="scroll-cue-wheel" />
        </span>
        <span className="scroll-cue-word" aria-hidden="true">
          {cue.word}
        </span>
        <CaretDoubleDownIcon weight="duotone" className="scroll-cue-caret" aria-hidden="true" />
      </motion.button>
    </>
  );
}
