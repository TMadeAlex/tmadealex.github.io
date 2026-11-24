"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent, TouchEvent } from "react";
import { CaretLeftIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react";
import type { GalleryItem } from "@/data/gallery";

/** The viewer's small words, from ui in site.ts. */
export interface LightboxWords {
  /** {n} and {total} are filled in here. */
  pictureCount: string;
  closePicture: string;
  previousPicture: string;
  nextPicture: string;
}

interface LightboxProps {
  items: GalleryItem[];
  /** Which picture is open, or null when the viewer is closed. */
  index: number | null;
  words: LightboxWords;
  onClose: () => void;
  onGoTo: (index: number) => void;
}

/** How far a finger must travel sideways, in pixels, to count as a swipe. */
const SWIPE = 48;

/**
 * The picture viewer. It is the browser's own modal dialog, so while it is open
 * the page behind it cannot be reached and Tab stays inside it.
 *
 * - Escape closes it. Left and Right arrows step through the pictures, Home
 *   goes to the first and End to the last. On a touch screen, swipe left or right.
 * - The previous and next buttons hold their places whatever the picture's
 *   shape, so they can be pressed again and again without chasing them.
 * - On a phone the picture takes the screen: the buttons sit over it and the
 *   caption is kept short below.
 * - Each step is read out to a screen reader: the count, the title and the caption.
 * - Only the open picture and its two neighbours are loaded.
 */
export default function Lightbox({ items, index, words, onClose, onGoTo }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const [announcement, setAnnouncement] = useState("");
  const open = index !== null;
  const many = items.length > 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  /* Fetch the neighbours ahead of time, so stepping feels immediate. */
  useEffect(() => {
    if (index === null || !many) return;
    for (const near of [index - 1, index + 1]) {
      const neighbour = items[(near + items.length) % items.length];
      const picture = new Image();
      picture.decoding = "async";
      picture.src = neighbour.src;
    }
  }, [index, items, many]);

  const countOf = (n: number) =>
    words.pictureCount.replace("{n}", String(n + 1)).replace("{total}", String(items.length));

  const go = (next: number) => {
    const target = items[next];
    setAnnouncement([`${countOf(next)}: ${target.title}.`, target.caption ?? ""].join(" ").trim());
    onGoTo(next);
  };

  const step = (delta: number) => {
    if (index === null || !many) return;
    go((index + delta + items.length) % items.length);
  };

  const close = () => {
    setAnnouncement("");
    onClose();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (!many) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "Home") {
      event.preventDefault();
      go(0);
    } else if (event.key === "End") {
      event.preventDefault();
      go(items.length - 1);
    }
  };

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    /* Two fingers is a pinch, and a zoomed-in page is being moved around: neither is a swipe. */
    const zoomed = (window.visualViewport?.scale ?? 1) > 1.01;
    touch.current = event.touches.length === 1 && !zoomed ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touch.current;
    touch.current = null;
    if (!start || event.changedTouches.length !== 1) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < SWIPE || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    swiped.current = true;
    step(dx < 0 ? 1 : -1);
  };

  /* A click on the dark ground around the picture closes the viewer (but not the end of a swipe). */
  const onGroundClick = (event: MouseEvent<HTMLElement>) => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    if (event.target === event.currentTarget) close();
  };

  const item = index === null ? null : items[index];

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={item ? item.title : undefined}
      onClose={close}
      onKeyDown={onKeyDown}
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      {item && index !== null ? (
        <div className="lightbox-frame">
          <div className="lightbox-top">
            <p className="lightbox-count">{many ? countOf(index) : ""}</p>
            <button type="button" onClick={close} aria-label={words.closePicture} className="lightbox-button">
              <XIcon weight="bold" aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <div className="lightbox-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="lightbox-ground" onClick={onGroundClick}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={item.id}
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                decoding="async"
                className="lightbox-picture"
              />
            </div>
            {many ? (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={words.previousPicture}
                  className="lightbox-button lightbox-step lightbox-step-previous"
                >
                  <CaretLeftIcon weight="bold" aria-hidden="true" className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={words.nextPicture}
                  className="lightbox-button lightbox-step lightbox-step-next"
                >
                  <CaretRightIcon weight="bold" aria-hidden="true" className="h-6 w-6" />
                </button>
              </>
            ) : null}
          </div>

          <div className="lightbox-caption">
            <h2 className="lightbox-title">{item.title}</h2>
            {item.caption ? <p className="lightbox-words">{item.caption}</p> : null}
            {item.credit ? (
              <p className="lightbox-credit">
                <a href={item.credit.href} rel="noopener noreferrer">
                  {item.credit.text}
                </a>
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
