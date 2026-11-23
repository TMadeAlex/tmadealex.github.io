"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { GalleryItem } from "@/data/gallery";
import Lightbox from "@/components/lightbox/Lightbox";
import type { LightboxWords } from "@/components/lightbox/Lightbox";

/** The gallery's small words, from ui in site.ts. */
export interface GalleryWords extends LightboxWords {
  openPicture: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  /* The words come in as props, so the browser is sent only these, not the whole of site.ts. */
  words: GalleryWords;
}

/** The frame a picture sits in when gallery.ts does not give its width and height. */
const FALLBACK = { width: 4, height: 5 };

/**
 * The pictures, in rows that keep each picture's own shape: every picture in a
 * row is the same height, and the row is as wide as the column. Nothing is
 * cropped when gallery.ts gives a picture's width and height. The grid loads the
 * small thumbnail (or the full picture when there is none), only as it comes
 * into view, and its space is kept before it arrives so the page does not jump.
 *
 * Choosing a picture opens it large in the picture viewer (see Lightbox.tsx).
 * Closing the viewer puts the keyboard back on the last picture that was shown.
 */
export default function GalleryGrid({ items, words }: GalleryGridProps) {
  const [index, setIndex] = useState<number | null>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const lastShown = useRef<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const goTo = useCallback((next: number) => setIndex(next), []);

  /* Runs after the viewer's own effect has closed the dialog. */
  useEffect(() => {
    if (index !== null) {
      lastShown.current = index;
      return;
    }
    if (lastShown.current === null) return;
    const button = buttons.current[lastShown.current];
    lastShown.current = null;
    button?.focus({ preventScroll: true });
    button?.scrollIntoView({ block: "nearest" });
  }, [index]);

  if (items.length === 0) return null;

  return (
    <>
      <ul className="gallery-rows">
        {items.map((item, i) => {
          const shaped = Boolean(item.width && item.height);
          const width = (shaped && item.width) || FALLBACK.width;
          const height = (shaped && item.height) || FALLBACK.height;
          return (
            <li key={item.id} className="gallery-cell" style={{ "--ratio": width / height } as CSSProperties}>
              <button
                type="button"
                ref={(node) => {
                  buttons.current[i] = node;
                }}
                onClick={() => setIndex(i)}
                aria-label={`${words.openPicture}: ${item.title}`}
                className="gallery-open"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.thumb ?? item.src}
                  alt={item.alt}
                  width={shaped ? item.width : undefined}
                  height={shaped ? item.height : undefined}
                  loading="lazy"
                  decoding="async"
                  className="gallery-thumb"
                  style={{ aspectRatio: `${width} / ${height}` }}
                />
              </button>
            </li>
          );
        })}
      </ul>
      <Lightbox items={items} index={index} words={words} onClose={close} onGoTo={goTo} />
    </>
  );
}
