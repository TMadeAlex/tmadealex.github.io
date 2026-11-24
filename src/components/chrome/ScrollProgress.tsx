"use client";

import { useState } from "react";
import { ArrowUpIcon } from "@phosphor-icons/react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";

/**
 * How far down the page someone is: a thin line under the menu with a glowing
 * tip, like price moving along its line, and, once they are well down, a round
 * button in the corner whose ring fills as they read. The button goes back to
 * the top.
 */
export default function ScrollProgress({ label }: { label: string }) {
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const ring = useTransform(progress, (v) => 113.1 * (1 - v));
  const tip = useTransform(progress, (v) => `${v * 100}%`);
  const [shown, setShown] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setShown(y > 480));

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
    </>
  );
}
