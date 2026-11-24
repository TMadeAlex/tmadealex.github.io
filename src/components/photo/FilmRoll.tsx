"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useMedia, useStill } from "@/lib/use-media";

/**
 * A strip of film that runs sideways as the page scrolls down: the section
 * holds still on screen while the frames pass through it, his words between
 * his pictures. On a narrow screen, or without motion, it is a strip to swipe
 * or scroll across instead.
 */
export default function FilmRoll({ children, label }: { children: ReactNode; label: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const still = useStill();
  const wide = useMedia("(min-width: 48rem)");
  const pinned = wide && !still;
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    if (!pinned || !track.current) return;
    const node = track.current;
    const measure = () => setTravel(Math.max(node.scrollWidth - window.innerWidth, 0));
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: stage, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, (v) => -v * travel);

  return (
    <div
      ref={stage}
      className={pinned ? "roll-stage roll-stage-pinned" : "roll-stage"}
      style={pinned ? { height: `calc(100vh + ${travel}px)` } : undefined}
    >
      <div className="roll-sticky">
        <motion.div
          ref={track}
          className="roll-track"
          style={pinned ? { x } : undefined}
          role="list"
          aria-label={label}
          tabIndex={pinned ? undefined : 0}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
