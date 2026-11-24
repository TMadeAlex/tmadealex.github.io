"use client";

import { useEffect, useRef } from "react";
import { readParty } from "@/lib/look";

/* What falls: the digits and marks of a trading screen. */
const GLYPHS = "0123456789.+-%▲▼$NQESVWAP0123456789";

/**
 * A soft rain of a trading screen's characters behind the trading page's title,
 * in his cyan, as if the page were about to step into the screen below it.
 * Decoration only. It runs slowly (about sixteen frames a second, fewer columns
 * and frames on a phone), stops while it is off screen, and is not drawn at all
 * for anyone whose device asks for less motion.
 */
export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const box = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !box || !context) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const small = window.matchMedia("(max-width: 48rem), (pointer: coarse)").matches;
    const step = small ? 90 : 62;
    const size = small ? 13 : 14;
    let width = 0;
    let height = 0;
    let drops: number[] = [];
    let frame = 0;
    let last = 0;
    let visible = true;
    const style = getComputedStyle(box);
    const colour = style.getPropertyValue("--dot").trim() || "#34d4d8";
    /* The canvas wears the site's monospace in the stylesheet, so its resolved name can be read here. */
    const font = `500 ${size}px ${getComputedStyle(canvas).fontFamily || "ui-monospace, monospace"}`;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = box.clientWidth;
      height = box.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const columns = Math.floor(width / (size * (small ? 1.9 : 1.4)));
      drops = Array.from({ length: columns }, () => Math.random() * -40);
    };

    const draw = (now: number) => {
      if (!visible) return;
      frame = requestAnimationFrame(draw);
      if (now - last < step) return;
      last = now;
      /* Fade what is there a little, keeping the canvas see-through. */
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0, 0, 0, 0.12)";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";
      context.font = font;
      const party = readParty();
      const gap = width / Math.max(drops.length, 1);
      drops.forEach((y, i) => {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * gap + gap / 2;
        const py = y * size;
        context.fillStyle = party ? `hsl(${(i * 23 + now / 10) % 360} 90% 65%)` : colour;
        context.globalAlpha = 0.85;
        context.fillText(glyph, x, py);
        context.globalAlpha = 1;
        drops[i] = py > height && Math.random() > 0.96 ? Math.random() * -12 : y + 1;
      });
    };

    resize();
    const sized = new ResizeObserver(resize);
    sized.observe(box);
    const seen = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) frame = requestAnimationFrame(draw);
    });
    seen.observe(box);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      sized.disconnect();
      seen.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />;
}
