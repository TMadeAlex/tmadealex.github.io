"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { useStill } from "@/lib/use-media";

interface TiltPaneProps {
  children: ReactNode;
  className?: string;
  /** How far it leans at most, in degrees. */
  lean?: number;
}

/**
 * A pane of glass that leans toward the mouse and catches the light where the
 * pointer is, with its shadow moving the other way: depth, as a photographer
 * lights it. Touch and less-motion settings leave it flat.
 */
export default function TiltPane({ children, className = "", lean = 7 }: TiltPaneProps) {
  const still = useStill();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 160, damping: 18 });
  const sy = useSpring(y, { stiffness: 160, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-lean, lean]);
  const rotateX = useTransform(sy, [0, 1], [lean, -lean]);
  const glareX = useTransform(sx, (v) => `${v * 100}%`);
  const glareY = useTransform(sy, (v) => `${v * 100}%`);
  const shadowX = useTransform(sx, [0, 1], [18, -18]);
  const shadowY = useTransform(sy, [0, 1], [26, 10]);
  const glare = useMotionTemplate`radial-gradient(28rem 20rem at ${glareX} ${glareY}, var(--glare), transparent 60%)`;
  const shadow = useMotionTemplate`${shadowX}px ${shadowY}px 60px -18px var(--shadow-deep)`;

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || still) return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - box.left) / box.width);
    y.set((event.clientY - box.top) / box.height);
  };
  const onLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      className={`tilt ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={still ? undefined : { rotateX, rotateY, transformPerspective: 1100, boxShadow: shadow }}
    >
      {children}
      {still ? null : <motion.span className="tilt-glare" style={{ background: glare }} aria-hidden="true" />}
    </motion.div>
  );
}
