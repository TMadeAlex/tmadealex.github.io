"use client";

import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import type { GalleryItem } from "@/data/gallery";
import { useStill } from "@/lib/use-media";

interface IrisHeroProps {
  /** The picture in the lens: the first of gallery.ts. */
  cover?: GalleryItem;
  /** The page's title, his line and his links, drawn on the server. */
  children: ReactNode;
}

const BLADES = 9;

/**
 * The top of the photography page, seen through a lens: when the page opens,
 * an iris of nine blades turns open on his self portrait, and the viewfinder's
 * corners settle around it. The picture drifts a little with the mouse and as
 * the page scrolls, like looking through glass. Without motion the iris is
 * simply open.
 */
export default function IrisHero({ cover, children }: IrisHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const still = useStill();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const px = useSpring(pointerX, { stiffness: 60, damping: 18 });
  const py = useSpring(pointerY, { stiffness: 60, damping: 18 });
  const scale = useTransform(() => (still ? 1 : 1.1 - scrollYProgress.get() * 0.08));
  const x = useTransform(() => (still ? 0 : px.get() * -14));
  const y = useTransform(() => (still ? 0 : py.get() * -10 + scrollYProgress.get() * 60));

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || still) return;
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - box.left) / box.width - 0.5) * 2);
    pointerY.set(((event.clientY - box.top) / box.height - 0.5) * 2);
  };

  return (
    <section ref={ref} className="iris-hero" onPointerMove={onPointerMove} aria-labelledby="photo-title">
      <div className="frame iris-grid">
        <div className="iris-words">{children}</div>
        {cover ? (
          <figure className="iris-lens">
            <span className="iris-glass">
              <motion.span className="iris-photo" style={{ scale, x, y }}>
                {/*
                  * loading="lazy" on purpose: it is on screen, so it still loads at once, and React then
                  * does not add a preload of his picture to the page's head (check-links.py allows his
                  * pictures only as <img>).
                  */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} loading="lazy" decoding="async" />
              </motion.span>
              <span className="iris-shade" aria-hidden="true" />
              <svg className="iris-blades" viewBox="-100 -100 200 200" aria-hidden="true" focusable="false">
                {Array.from({ length: BLADES }, (_, i) => (
                  <path
                    key={i}
                    className="iris-blade"
                    transform={`rotate(${(360 / BLADES) * i})`}
                    d="M 0 -150 L 120 -150 L 22 -14 Q 0 -30 -8 -40 Z"
                  />
                ))}
              </svg>
              <span className="finder-corner finder-tl" aria-hidden="true" />
              <span className="finder-corner finder-tr" aria-hidden="true" />
              <span className="finder-corner finder-bl" aria-hidden="true" />
              <span className="finder-corner finder-br" aria-hidden="true" />
              <span className="iris-af" aria-hidden="true" />
            </span>
            <figcaption className="iris-caption">
              <span className="iris-caption-title">{cover.title}</span>
              {cover.caption ? <span className="iris-caption-place">{cover.caption}</span> : null}
              {cover.credit ? (
                <a href={cover.credit.href} rel="noopener noreferrer" className="iris-caption-credit">
                  {cover.credit.text}
                </a>
              ) : null}
            </figcaption>
          </figure>
        ) : null}
      </div>
    </section>
  );
}
