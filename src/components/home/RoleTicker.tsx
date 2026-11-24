"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useStill } from "@/lib/use-media";

interface RoleTickerProps {
  /** The words that turn, in order (home.turning). */
  words: string[];
  /** What they are, for a screen reader. */
  label: string;
}

/**
 * The line under his name, turning through what he does like a ticker:
 * futures trader, live streamer, entertainer, host, fashion photographer. A
 * screen reader hears the whole list once. Without motion, all of them show.
 */
export default function RoleTicker({ words, label }: RoleTickerProps) {
  const still = useStill();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (still) return;
    const timer = window.setInterval(() => setIndex((n) => (n + 1) % words.length), 2300);
    return () => window.clearInterval(timer);
  }, [still, words.length]);

  return (
    <p className="hero-turning">
      <span className="sr-only">
        {label}: {words.join(", ")}.
      </span>
      {still ? (
        <span aria-hidden="true" className="turning-all">
          {words.join(" / ")}
        </span>
      ) : (
        <span aria-hidden="true" className="turning-window">
          <span className="turning-caret">▲</span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={index}
              className="turning-word"
              initial={{ y: "105%", opacity: 0, filter: "blur(8px)" }}
              animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
              exit={{ y: "-105%", opacity: 0, filter: "blur(8px)" }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      )}
    </p>
  );
}
