"use client";

import { useEffect, useRef } from "react";
import { readParty, readPill } from "@/lib/look";

/*
 * What falls: fragments of Pine Script, the language of TradingView's charts,
 * spelled out down each column, with little candles dropping between them.
 * Generic language words only: nothing here is a strategy of his.
 */
const PINE = [
  "//@version=5",
  "indicator('TMADE', overlay=true)",
  "ta.vwap(close)",
  "ta.ema(close, 9)",
  "ta.crossover(fast, slow)",
  "plot(close)",
  "strategy.entry('L', strategy.long)",
  "strategy.exit('X', stop=sl)",
  "ta.atr(14)",
  "high - low",
  "bar_index",
  "barstate.isconfirmed",
  "request.security(syminfo.tickerid)",
  "if close > open",
  "var float sl = na",
  "plotshape(signal)",
  "timeframe.period",
  "math.abs(close - open)",
];

interface Column {
  y: number;
  text: string;
  at: number;
  candle: number;
  up: boolean;
}

/**
 * A soft rain of Pine Script and candles behind the trading page's title, as if
 * the page were about to step into the screen below it. Blue pill (the
 * default): his cyan. Red pill: the classic green of a terminal, with green and
 * red candles. Decoration only. It runs slowly (fewer columns and frames on a
 * phone), stops while it is off screen, and is not drawn at all for anyone
 * whose device asks for less motion.
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
    let columns: Column[] = [];
    let frame = 0;
    let last = 0;
    let visible = true;
    const cyan = getComputedStyle(box).getPropertyValue("--dot").trim() || "#34d4d8";
    const soft = getComputedStyle(box).getPropertyValue("--candle-down").trim() || "#9fc7c8";
    /* The canvas wears the site's monospace in the stylesheet, so its resolved name can be read here. */
    const font = `500 ${size}px ${getComputedStyle(canvas).fontFamily || "ui-monospace, monospace"}`;

    const fresh = (y: number): Column => ({
      y,
      text: PINE[Math.floor(Math.random() * PINE.length)],
      at: 0,
      candle: Math.random() < 0.35 ? 1 + Math.floor(Math.random() * 3) : 0,
      up: Math.random() > 0.45,
    });

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = box.clientWidth;
      height = box.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.floor(width / (size * (small ? 2.2 : 1.6)));
      columns = Array.from({ length: count }, () => fresh(Math.random() * -30));
    };

    const draw = (now: number) => {
      if (!visible) return;
      frame = requestAnimationFrame(draw);
      if (now - last < step) return;
      last = now;
      const red = readPill() === "red";
      const party = readParty();
      const green = "#3bff6e";
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0, 0, 0, 0.12)";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";
      context.font = font;
      context.textAlign = "center";
      const gap = width / Math.max(columns.length, 1);
      columns.forEach((col, i) => {
        const x = i * gap + gap / 2;
        const py = col.y * size;
        if (col.candle > 0) {
          /* A little candle: up ones filled, down ones hollow (red pill: green up, red down). */
          const colour = party
            ? `hsl(${(i * 23 + now / 10) % 360} 90% 65%)`
            : red
              ? col.up
                ? green
                : "#ff4d5e"
              : col.up
                ? cyan
                : soft;
          const body = size * (0.6 + Math.random() * 0.6);
          context.strokeStyle = colour;
          context.fillStyle = colour;
          context.globalAlpha = 0.85;
          context.beginPath();
          context.moveTo(x, py - body / 2 - 3);
          context.lineTo(x, py + body / 2 + 3);
          context.stroke();
          if (col.up) context.fillRect(x - 3, py - body / 2, 6, body);
          else context.strokeRect(x - 2.5, py - body / 2, 5, body);
          context.globalAlpha = 1;
          col.candle -= 1;
          col.y += 2;
        } else {
          const glyph = col.text[col.at] ?? " ";
          context.fillStyle = party ? `hsl(${(i * 23 + now / 10) % 360} 90% 65%)` : red ? green : cyan;
          context.globalAlpha = col.at === 0 ? 1 : 0.8;
          context.fillText(glyph, x, py);
          context.globalAlpha = 1;
          col.at += 1;
          col.y += 1;
          if (col.at >= col.text.length) {
            const next = fresh(col.y + 2);
            columns[i] = next;
          }
        }
        if (columns[i].y * size > height + size * 4 && Math.random() > 0.9) columns[i] = fresh(Math.random() * -12);
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
