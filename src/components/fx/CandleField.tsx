import { candleSeries, layout } from "@/lib/candles";

interface CandleFieldProps {
  /** Which made-up run of candles to draw: the same seed always draws the same ones. */
  seed: number;
  count: number;
  width?: number;
  height?: number;
  className?: string;
  /** Draw the smooth average line through them. */
  line?: boolean;
}

/**
 * A drawing of made-up candles (see src/lib/candles.ts), for decoration only.
 * Drawn on the server as one SVG, so nothing is computed in the browser. The
 * stylesheet gives the candles their colours and their slow breathing.
 */
export default function CandleField({ seed, count, width = 1200, height = 420, className = "", line = true }: CandleFieldProps) {
  const { candles, line: path, step } = layout(candleSeries(seed, count), width, height);
  const body = Math.max(step * 0.56, 1.5);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={`candle-field ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <g className="candle-grid">
        {[0.2, 0.4, 0.6, 0.8].map((f) => (
          <line key={f} x1="0" x2={width} y1={height * f} y2={height * f} />
        ))}
      </g>
      <g className="candle-set">
        {candles.map((c, i) => (
          <g
            key={i}
            className={c.up ? "candle candle-up" : "candle candle-down"}
            style={{ animationDelay: `${(i % 18) * 0.22}s` }}
          >
            <line x1={c.x} x2={c.x} y1={c.wickTop} y2={c.wickBottom} className="candle-wick" />
            <rect x={c.x - body / 2} y={c.bodyTop} width={body} height={c.bodyHeight} rx={Math.min(1.5, body / 4)} className="candle-body" />
          </g>
        ))}
      </g>
      {line ? <path d={path} className="candle-line" /> : null}
    </svg>
  );
}
