"use client";

import { useEffect, useRef } from "react";
import { readParty, subscribeLook } from "@/lib/look";
import { useFinePointer, useStill } from "@/lib/use-media";

interface Trail {
  x: number;
  y: number;
  born: number;
  up: boolean;
  body: number;
  wick: number;
  n: number;
}

/** How far the pointer travels between two candles, how long one lasts, and how many at most. */
const SPACING = 15;
const LIFE = 950;
const MOST = 72;

/**
 * The cursor leaves a wave of little candles behind it, in his colours, like
 * the projected candles of a charting tool: moving up the screen draws a filled
 * cyan candle, moving down a hollow one. They bob as a wave and fade within a
 * second. In PARTY_MODE they come in every colour.
 *
 * Only for a mouse, never for touch, and not at all for anyone whose device asks
 * for less motion. The ordinary cursor stays as it is.
 */
export default function CursorCandles() {
  /* Whether to run at all: a fine pointer that can hover, and motion allowed. */
  const fine = useFinePointer();
  const still = useStill();
  const on = fine && !still;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!on) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let trail: Trail[] = [];
    let frame = 0;
    let running = false;
    let last: { x: number; y: number } | null = null;
    let count = 0;
    let colours = { up: "#34d4d8", down: "#5fe0e3", line: "#249094" };
    let party = readParty();

    const readColours = () => {
      const style = getComputedStyle(document.documentElement);
      colours = {
        up: style.getPropertyValue("--candle-up").trim() || colours.up,
        down: style.getPropertyValue("--candle-down").trim() || colours.down,
        line: style.getPropertyValue("--candle-line").trim() || colours.line,
      };
      party = readParty();
    };
    readColours();
    const stopWatching = subscribeLook(readColours);

    const size = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(window.innerWidth * ratio);
      canvas.height = Math.round(window.innerHeight * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    size();

    const draw = (now: number) => {
      trail = trail.filter((c) => now - c.born < LIFE);
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      /* The projection line through the newest candles. */
      if (trail.length > 2) {
        context.beginPath();
        trail.forEach((c, i) => {
          const age = (now - c.born) / LIFE;
          const y = c.y - age * 10 + Math.sin(age * Math.PI * 2 + c.n * 0.7) * 6 * age;
          if (i === 0) context.moveTo(c.x, y);
          else context.lineTo(c.x, y);
        });
        context.strokeStyle = party ? `hsl(${(now / 12) % 360} 90% 65%)` : colours.line;
        context.globalAlpha = 0.28;
        context.lineWidth = 1;
        context.setLineDash([3, 4]);
        context.stroke();
        context.setLineDash([]);
      }

      for (const c of trail) {
        const age = (now - c.born) / LIFE;
        const scale = 1 - age * 0.45;
        const x = c.x;
        const y = c.y - age * 10 + Math.sin(age * Math.PI * 2 + c.n * 0.7) * 6 * age;
        const body = c.body * scale;
        const wick = c.wick * scale;
        const colour = party ? `hsl(${(c.n * 29 + now / 8) % 360} 95% 62%)` : c.up ? colours.up : colours.down;
        context.globalAlpha = (1 - age) * 0.9;
        context.strokeStyle = colour;
        context.fillStyle = colour;
        context.lineWidth = 1.25;
        context.shadowColor = colour;
        context.shadowBlur = c.up ? 10 : 0;
        context.beginPath();
        context.moveTo(x, y - body / 2 - wick);
        context.lineTo(x, y + body / 2 + wick);
        context.stroke();
        const w = 5 * scale;
        if (c.up) context.fillRect(x - w / 2, y - body / 2, w, body);
        else context.strokeRect(x - w / 2, y - body / 2, w, body);
        context.shadowBlur = 0;
      }
      context.globalAlpha = 1;

      if (trail.length > 0) {
        frame = requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const point = { x: event.clientX, y: event.clientY };
      if (!last) {
        last = point;
        return;
      }
      const dx = point.x - last.x;
      const dy = point.y - last.y;
      const distance = Math.hypot(dx, dy);
      if (distance < SPACING) return;
      count += 1;
      const speed = Math.min(distance, 60);
      trail.push({
        x: point.x,
        y: point.y,
        born: performance.now(),
        up: dy < 0 || (dy === 0 && dx > 0),
        body: 5 + speed * 0.28,
        wick: 2 + (count % 4) * 1.5,
        n: count,
      });
      if (trail.length > MOST) trail.shift();
      last = point;
      if (!running) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    };

    const onLeave = () => {
      last = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", size);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", size);
      stopWatching();
      cancelAnimationFrame(frame);
    };
  }, [on]);

  return on ? <canvas ref={canvasRef} className="cursor-candles" aria-hidden="true" /> : null;
}
