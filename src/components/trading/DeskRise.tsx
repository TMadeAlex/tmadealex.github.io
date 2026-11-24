"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useStill } from "@/lib/use-media";

/**
 * His screen, seen from the desk: it starts tipped back a little, hinged at
 * its top edge, and straightens to face you as it scrolls up, as if the page
 * steps into the screen. Without motion it simply faces you.
 */
export default function DeskRise({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useStill();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const rotateX = useTransform(progress, [0, 1], [still ? 0 : 14, 0]);
  const scale = useTransform(progress, [0, 1], [still ? 1 : 0.95, 1]);
  const y = useTransform(progress, [0, 1], [still ? 0 : 16, 0]);

  return (
    <div ref={ref} className={`desk-stage ${className}`}>
      <motion.div className="desk-tilt" style={{ rotateX, scale, y, transformPerspective: 1600 }}>
        {children}
      </motion.div>
    </div>
  );
}
