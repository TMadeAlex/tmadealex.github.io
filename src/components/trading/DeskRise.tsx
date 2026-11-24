"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useStill } from "@/lib/use-media";

interface DeskRiseProps {
  children: ReactNode;
  className?: string;
  /** The boot lines shown above the desk while it rises (trading.desk.approach). */
  approach: { title: string; lines: string[]; ready: string };
}

/**
 * His screen, seen from the desk: it starts tipped back from its base and
 * rises to face you as it scrolls up, as if the page pulls up to the desk.
 * While it rises, the space above it shows a terminal booting: a few lines
 * typing in and a bar filling with the climb, until the screen covers them.
 * Without motion the screen simply faces you and the boot lines are not drawn.
 */
export default function DeskRise({ children, className = "", approach }: DeskRiseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useStill();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.2"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const rotateX = useTransform(progress, [0, 1], [still ? 0 : 18, 0]);
  const scale = useTransform(progress, [0, 1], [still ? 1 : 0.9, 1]);
  const y = useTransform(progress, [0, 1], [still ? 0 : 48, 0]);
  const bootOpacity = useTransform(progress, [0, 0.75, 0.95], [1, 1, 0]);
  const bar = useTransform(progress, (v) => `${Math.round(Math.min(Math.max(v / 0.9, 0), 1) * 100)}%`);
  const percent = useTransform(progress, (v) => `${Math.round(Math.min(Math.max(v / 0.9, 0), 1) * 100)}%`);

  return (
    <div ref={ref} className={`desk-stage ${className}`}>
      {still ? null : (
        <motion.div className="desk-boot" style={{ opacity: bootOpacity }} aria-hidden="true">
          <p className="desk-boot-title">
            <span className="desk-boot-prompt">&gt;</span> {approach.title}
            <span className="desk-boot-cursor" />
          </p>
          {approach.lines.map((line, i) => (
            <p key={line} className="desk-boot-line" style={{ animationDelay: `${0.35 + i * 0.45}s` }}>
              <span className="desk-boot-prompt">&gt;</span> {line}
            </p>
          ))}
          <p className="desk-boot-meter">
            <span className="desk-boot-track">
              <motion.span className="desk-boot-fill" style={{ width: bar }} />
            </span>
            <motion.span className="desk-boot-percent">{percent}</motion.span>
          </p>
        </motion.div>
      )}
      <motion.div className="desk-tilt" style={{ rotateX, scale, y, transformPerspective: 1600 }}>
        {children}
      </motion.div>
    </div>
  );
}
