"use client";

import { useEffect, useRef, useState } from "react";
import type { Candle } from "@/lib/candles";
import { candleSeries, nextCandle, seeded } from "@/lib/candles";
import { readParty, subscribeLook } from "@/lib/look";

interface ChartSession {
  id: string;
  name: string;
  short: string;
  markets: string;
  start: string;
  end: string;
}

interface TerminalChartProps {
  sessions: ChartSession[];
  words: { chartLabel: string; illustration: string; illustrationLong: string; axis: string; average: string };
}

/** How many candles show, how long a new one takes to form, and the made-up size of a unit move, in percent. */
const SHOWN = 56;
const FORM_MS = 3200;
const UNIT = 0.045;

function minutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function clock(total: number) {
  const t = ((Math.round(total) % 1440) + 1440) % 1440;
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}

/**
 * The chart on his desk: made-up candles over one of his posted session windows,
 * with an average line, a price tag on the newest candle and a crosshair that
 * follows the mouse. The newest candle keeps forming and the chart slides along
 * as new ones arrive, like a screen during a session. The tabs switch between
 * his two sessions.
 *
 * It is decoration, and says so on the chart: nothing here is market data or a
 * trade of his. It only runs while it is on screen, and stands still for
 * anyone whose device asks for less motion.
 */
export default function TerminalChart({ sessions, words }: TerminalChartProps) {
  const [tab, setTab] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const session = sessions[tab];

  useEffect(() => {
    const canvas = canvasRef.current;
    const box = boxRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !box || !context) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* On a phone or a touch screen the chart draws about thirty times a second instead of sixty. */
    const gentle = window.matchMedia("(max-width: 48rem), (pointer: coarse)").matches ? 33 : 0;
    let drawnAt = 0;
    const random = seeded(101 + tab * 977);
    let series: Candle[] = candleSeries(17 + tab * 31, SHOWN + 1);
    let formedAt = performance.now();
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    let colours: Record<string, string> = {};
    let font = "ui-monospace, monospace";
    let party = readParty();

    const readColours = () => {
      const style = getComputedStyle(box);
      const get = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback;
      colours = {
        up: get("--candle-up", "#34d4d8"),
        down: get("--candle-down", "#5fe0e3"),
        line: get("--candle-line", "#249094"),
        grid: get("--chart-grid", "rgba(255,255,255,0.06)"),
        text: get("--chart-text", "rgba(230,250,250,0.55)"),
        tag: get("--dot", "#34d4d8"),
        tagInk: get("--tone-deep", "#0c1719"),
        window: get("--chart-window", "rgba(52,212,216,0.06)"),
      };
      font = style.fontFamily || font;
      party = readParty();
    };

    const size = () => {
      const ratio = window.devicePixelRatio || 1;
      width = box.clientWidth;
      height = box.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const startMin = minutes(session.start);
    let span = minutes(session.end) - startMin;
    if (span <= 0) span += 1440;

    const draw = (now: number) => {
      if (gentle && !still && now - drawnAt < gentle && !pointer) {
        if (visible) frame = requestAnimationFrame(draw);
        return;
      }
      drawnAt = now;
      const right = 64;
      const bottom = 26;
      const plotW = Math.max(width - right, 10);
      const plotH = Math.max(height - bottom, 10);

      /* The newest candle forms; when its time is up, a new one starts and the oldest leaves. */
      const age = still ? 0 : (now - formedAt) / FORM_MS;
      if (age >= 1) {
        const last = series[series.length - 1];
        series = [...series.slice(1), nextCandle(random, last.close, (random() - 0.5) * 1.2, 0.9)];
        formedAt = now;
      } else if (!still) {
        const last = series[series.length - 1];
        const close = last.close + (random() - 0.5) * 0.16;
        series[series.length - 1] = {
          ...last,
          close,
          high: Math.max(last.high, close),
          low: Math.min(last.low, close),
        };
      }
      const slide = still ? 0 : Math.min((now - formedAt) / FORM_MS, 1);

      const values = series.flatMap((c) => [c.high, c.low]);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const pad = (max - min) * 0.12 || 1;
      const lo = min - pad;
      const hi = max + pad;
      const y = (v: number) => ((hi - v) / (hi - lo)) * plotH;
      const step = plotW / SHOWN;
      const x = (i: number) => (i - slide) * step + step / 2;
      const base = series[0].open;
      const percent = (v: number) => (v - base) * UNIT;

      context.clearRect(0, 0, width, height);

      /* His posted window, shaded, and the grid. */
      context.fillStyle = colours.window;
      context.fillRect(0, 0, plotW, plotH);
      context.strokeStyle = colours.grid;
      context.lineWidth = 1;
      context.font = `500 10.5px ${font}`;
      context.fillStyle = colours.text;
      context.textBaseline = "middle";
      for (let k = 1; k < 5; k += 1) {
        const gy = Math.round((plotH * k) / 5) + 0.5;
        context.beginPath();
        context.moveTo(0, gy);
        context.lineTo(plotW, gy);
        context.stroke();
        const v = percent(hi - ((hi - lo) * k) / 5);
        context.fillText(`${v >= 0 ? "+" : ""}${v.toFixed(2)}%`, plotW + 8, gy);
      }
      context.textBaseline = "alphabetic";
      for (let k = 0; k <= 4; k += 1) {
        const gx = Math.round((plotW * k) / 4) + 0.5;
        context.beginPath();
        context.moveTo(gx, 0);
        context.lineTo(gx, plotH);
        context.stroke();
        const label = clock(startMin + (span * k) / 4);
        const tw = context.measureText(label).width;
        context.fillText(label, Math.min(Math.max(gx - tw / 2, 2), plotW - tw - 2), height - 8);
      }

      /* The average line. */
      let sum = 0;
      let weight = 0;
      context.beginPath();
      series.forEach((c, i) => {
        const w = 1 + ((i * 7) % 5);
        sum += ((c.high + c.low + c.close) / 3) * w;
        weight += w;
        const ax = x(i);
        const ay = y(sum / weight);
        if (i === 0) context.moveTo(ax, ay);
        else context.lineTo(ax, ay);
      });
      context.strokeStyle = colours.line;
      context.lineWidth = 1.6;
      context.stroke();

      /* The candles. */
      const body = Math.max(step * 0.58, 2);
      series.forEach((c, i) => {
        const cx = x(i);
        if (cx < -step || cx > plotW) return;
        const up = c.close >= c.open;
        const colour = party ? `hsl(${(i * 11 + now / 20) % 360} 90% 62%)` : up ? colours.up : colours.down;
        context.strokeStyle = colour;
        context.fillStyle = colour;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(Math.round(cx) + 0.5, y(c.high));
        context.lineTo(Math.round(cx) + 0.5, y(c.low));
        context.stroke();
        const top = y(Math.max(c.open, c.close));
        const h = Math.max(y(Math.min(c.open, c.close)) - top, 1);
        if (up) {
          if (i === series.length - 1 && !still) {
            context.shadowColor = colour;
            context.shadowBlur = 12;
          }
          context.fillRect(cx - body / 2, top, body, h);
          context.shadowBlur = 0;
        } else {
          context.strokeRect(cx - body / 2 + 0.5, top + 0.5, body - 1, h - 1);
        }
      });

      /* The tag on the newest close, and its dashed line across. */
      const last = series[series.length - 1];
      const ly = y(last.close);
      context.setLineDash([2, 3]);
      context.strokeStyle = colours.tag;
      context.globalAlpha = 0.55;
      context.beginPath();
      context.moveTo(0, ly);
      context.lineTo(plotW, ly);
      context.stroke();
      context.setLineDash([]);
      context.globalAlpha = 1;
      const lastP = percent(last.close);
      context.fillStyle = colours.tag;
      context.fillRect(plotW + 2, ly - 9, right - 4, 18);
      context.fillStyle = colours.tagInk;
      context.textBaseline = "middle";
      context.fillText(`${lastP >= 0 ? "+" : ""}${lastP.toFixed(2)}%`, plotW + 7, ly + 0.5);
      context.textBaseline = "alphabetic";

      /* The crosshair, snapped to the nearest candle. */
      if (pointer && pointer.x < plotW && pointer.y < plotH) {
        const i = Math.min(Math.max(Math.round((pointer.x - step / 2) / step + slide), 0), series.length - 1);
        const cx = x(i);
        context.setLineDash([4, 4]);
        context.strokeStyle = colours.text;
        context.beginPath();
        context.moveTo(cx, 0);
        context.lineTo(cx, plotH);
        context.moveTo(0, pointer.y);
        context.lineTo(plotW, pointer.y);
        context.stroke();
        context.setLineDash([]);
        const v = percent(hi - (pointer.y / plotH) * (hi - lo));
        context.fillStyle = colours.text;
        context.fillRect(plotW + 2, pointer.y - 9, right - 4, 18);
        context.fillStyle = colours.tagInk;
        context.textBaseline = "middle";
        context.fillText(`${v >= 0 ? "+" : ""}${v.toFixed(2)}%`, plotW + 7, pointer.y + 0.5);
        context.textBaseline = "alphabetic";
        const t = clock(startMin + ((i + 0.5) / SHOWN) * span);
        const tw = context.measureText(t).width + 12;
        const tx = Math.min(Math.max(cx - tw / 2, 0), plotW - tw);
        context.fillStyle = colours.text;
        context.fillRect(tx, plotH + 3, tw, 18);
        context.fillStyle = colours.tagInk;
        context.fillText(t, tx + 6, plotH + 16);
      }

      if (!still && visible) frame = requestAnimationFrame(draw);
    };

    readColours();
    size();
    draw(performance.now());

    const resize = new ResizeObserver(() => {
      size();
      draw(performance.now());
    });
    resize.observe(box);
    const stopWatching = subscribeLook(() => {
      readColours();
      draw(performance.now());
    });
    const seen = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting && document.visibilityState === "visible";
      if (visible && !was && !still) frame = requestAnimationFrame(draw);
    });
    seen.observe(box);

    const onMove = (event: PointerEvent) => {
      const rect = box.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (still) draw(performance.now());
    };
    const onLeave = () => {
      pointer = null;
      if (still) draw(performance.now());
    };
    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      seen.disconnect();
      stopWatching();
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
    };
  }, [tab, session.start, session.end]);

  return (
    <div className="term-chart-wrap">
      <div className="term-tabs" role="tablist" aria-label={words.chartLabel}>
        {sessions.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === tab}
            aria-controls="term-chart-panel"
            className="term-tab"
            onClick={() => setTab(i)}
          >
            {s.short}
          </button>
        ))}
        <span className="term-tab-meta">{session.markets}</span>
        <span className="term-chip" title={words.illustrationLong}>
          {words.illustration}
        </span>
      </div>
      <div id="term-chart-panel" role="tabpanel" className="term-chart-box" ref={boxRef}>
        <canvas ref={canvasRef} role="img" aria-label={`${session.name}. ${words.illustrationLong}`} />
        <span className="term-legend" aria-hidden="true">
          <span className="term-legend-line" />
          {words.average}
          <span className="term-legend-axis">{words.axis}</span>
        </span>
      </div>
    </div>
  );
}
