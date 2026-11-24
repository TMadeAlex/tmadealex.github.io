"use client";

import { useEffect, useRef } from "react";
import type { PartyDetail } from "@/components/chrome/Providers";

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  spin: number;
  angle: number;
  hue: number;
  body: number;
  wick: number;
  up: boolean;
}

const LIFE = 1900;

/**
 * When PARTY_MODE goes on, a burst of little candles flies out from where it was
 * switched on, and falls away. Drawn on one canvas that is only there while
 * the burst lasts. Nothing moves for anyone whose device asks for less motion.
 */
export default function PartyBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let frame = 0;
    let pieces: Piece[] = [];
    let born = 0;

    const draw = (now: number) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context) return;
      const age = now - born;
      const ratio = window.devicePixelRatio || 1;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      const fade = Math.max(0, 1 - age / LIFE);
      for (const p of pieces) {
        p.vy += 0.32;
        p.vx *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        context.save();
        context.translate(p.x, p.y);
        context.rotate(p.angle);
        context.globalAlpha = fade;
        const colour = `hsl(${p.hue} 95% 62%)`;
        context.strokeStyle = colour;
        context.fillStyle = colour;
        context.lineWidth = 1.5;
        context.beginPath();
        context.moveTo(0, -p.body / 2 - p.wick);
        context.lineTo(0, p.body / 2 + p.wick);
        context.stroke();
        if (p.up) context.fillRect(-3, -p.body / 2, 6, p.body);
        else context.strokeRect(-3, -p.body / 2, 6, p.body);
        context.restore();
      }
      if (age < LIFE) {
        frame = requestAnimationFrame(draw);
      } else {
        pieces = [];
        canvas.hidden = true;
      }
    };

    const onParty = (event: Event) => {
      const { on, x, y } = (event as CustomEvent<PartyDetail>).detail;
      if (!on || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.hidden = false;
      pieces = Array.from({ length: 84 }, (_, i) => {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5;
        const speed = 6 + Math.random() * 10;
        return {
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          spin: (Math.random() - 0.5) * 0.3,
          angle: Math.random() * Math.PI,
          hue: (i * 37) % 360,
          body: 6 + Math.random() * 14,
          wick: 2 + Math.random() * 5,
          up: Math.random() > 0.4,
        };
      });
      born = performance.now();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };

    window.addEventListener("tmade:party", onParty);
    return () => {
      window.removeEventListener("tmade:party", onParty);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="party-burst" aria-hidden="true" hidden />;
}
