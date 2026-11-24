"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { MagnifyingGlassPlusIcon } from "@phosphor-icons/react";
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
/** How much the loupe enlarges, and its size in pixels. */
const ZOOM = 2.6;
const LENS = 170;

/**
 * His pictures laid out like prints on a contact sheet, each keeping its own
 * shape, uncropped, with depth under it. As each one comes into view it
 * develops, the way a print comes up in the tray. With a mouse, a loupe follows
 * the pointer and shows that part of the picture close up, from the full-size
 * picture on his site. Choosing a print opens it large in the picture viewer
 * (see Lightbox.tsx); closing the viewer puts the keyboard back on that print.
 *
 * The grid loads the small picture, only as it comes into view, and keeps its
 * space before it arrives so the page does not jump. The full-size picture is
 * fetched only for the loupe or the viewer.
 */
export default function GalleryGrid({ items, words }: GalleryGridProps) {
  const [index, setIndex] = useState<number | null>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const lastShown = useRef<number | null>(null);
  const sheet = useRef<HTMLUListElement>(null);

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

  /* Each print develops as it comes into view. */
  useEffect(() => {
    const list = sheet.current;
    if (!list) return;
    const prints = Array.from(list.querySelectorAll<HTMLElement>(".print"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    /* Only now, with the page's script running, do the prints start dark; without it they simply show. */
    list.dataset.develop = "true";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.developed = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.2 },
    );
    prints.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, [items]);

  const onLoupe = (event: PointerEvent<HTMLButtonElement>, item: GalleryItem) => {
    if (event.pointerType !== "mouse") return;
    const button = event.currentTarget;
    const lens = button.querySelector<HTMLElement>(".loupe");
    const image = button.querySelector("img");
    if (!lens || !image) return;
    const box = image.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    if (x < 0 || y < 0 || x > box.width || y > box.height) {
      lens.dataset.on = "false";
      return;
    }
    if (!lens.style.backgroundImage) lens.style.backgroundImage = `url("${item.src}")`;
    lens.style.backgroundSize = `${box.width * ZOOM}px ${box.height * ZOOM}px`;
    lens.style.backgroundPosition = `${-(x * ZOOM - LENS / 2)}px ${-(y * ZOOM - LENS / 2)}px`;
    lens.style.transform = `translate(${x - LENS / 2}px, ${y - LENS / 2}px)`;
    lens.dataset.on = "true";
  };

  const offLoupe = (event: PointerEvent<HTMLButtonElement>) => {
    const lens = event.currentTarget.querySelector<HTMLElement>(".loupe");
    if (lens) lens.dataset.on = "false";
  };

  if (items.length === 0) return null;

  return (
    <>
      <ul ref={sheet} className="sheet">
        {items.map((item, i) => {
          const shaped = Boolean(item.width && item.height);
          const width = (shaped && item.width) || FALLBACK.width;
          const height = (shaped && item.height) || FALLBACK.height;
          const lean = ((i * 37) % 5) - 2;
          return (
            <li key={item.id} className="print" style={{ "--lean": `${lean * 0.45}deg`, "--i": i } as CSSProperties}>
              <button
                type="button"
                ref={(node) => {
                  buttons.current[i] = node;
                }}
                onClick={() => setIndex(i)}
                onPointerMove={(event) => onLoupe(event, item)}
                onPointerLeave={offLoupe}
                aria-label={`${words.openPicture}: ${item.title}`}
                className="print-open"
              >
                <span className="print-paper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.thumb ?? item.src}
                    alt={item.alt}
                    width={shaped ? item.width : undefined}
                    height={shaped ? item.height : undefined}
                    loading="lazy"
                    decoding="async"
                    className="print-picture"
                    style={{ aspectRatio: `${width} / ${height}` }}
                  />
                  <span className="loupe" aria-hidden="true" style={{ width: LENS, height: LENS }} />
                  <span className="print-zoom" aria-hidden="true">
                    <MagnifyingGlassPlusIcon weight="duotone" />
                  </span>
                </span>
                <span className="print-label">
                  <span className="print-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="print-title">{item.title}</span>
                  {item.caption ? <span className="print-place">{item.caption}</span> : null}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <Lightbox items={items} index={index} words={words} onClose={close} onGoTo={goTo} />
    </>
  );
}
