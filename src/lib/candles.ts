/*
 * Made-up candles, for decoration only: the faint chart behind the front page,
 * the small chart on the trading door, and the illustration on the trading
 * page. They are a seeded random walk, so the server and the browser draw the
 * same ones. They are not market data and not anyone's trades, and every place
 * that shows them says so.
 */

export interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
}

/** A small seeded random number generator (mulberry32): the same seed always gives the same numbers. */
export function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The next candle after a close, drifting a little with `trend` (-1 to 1). */
export function nextCandle(random: () => number, open: number, trend = 0, size = 1): Candle {
  const move = (random() - 0.5 + trend * 0.18) * 1.6 * size;
  const close = open + move;
  const high = Math.max(open, close) + random() * 0.7 * size;
  const low = Math.min(open, close) - random() * 0.7 * size;
  return { open, high, low, close };
}

/** A run of candles: rising, falling or ranging in turns, as a session tends to. */
export function candleSeries(seed: number, count: number, start = 0): Candle[] {
  const random = seeded(seed);
  const series: Candle[] = [];
  let open = start;
  let trend = 0.4;
  for (let i = 0; i < count; i += 1) {
    if (i % 12 === 0) trend = (random() - 0.35) * 1.4;
    const candle = nextCandle(random, open, trend);
    series.push(candle);
    open = candle.close;
  }
  return series;
}

/** A running volume-weighted-style average of the typical price, drawn as one smooth line. */
export function averageLine(series: Candle[]): number[] {
  let sum = 0;
  let weight = 0;
  return series.map((c, i) => {
    const w = 1 + ((i * 7) % 5);
    sum += ((c.high + c.low + c.close) / 3) * w;
    weight += w;
    return sum / weight;
  });
}

export interface DrawnCandle {
  x: number;
  /** Top and bottom of the wick, top and bottom of the body, in the drawing's units. */
  wickTop: number;
  wickBottom: number;
  bodyTop: number;
  bodyHeight: number;
  up: boolean;
}

/** Lays a series out in a box of `width` by `height`, for an SVG drawing. */
export function layout(series: Candle[], width: number, height: number, pad = 0.08) {
  const lows = series.map((c) => c.low);
  const highs = series.map((c) => c.high);
  const min = Math.min(...lows);
  const max = Math.max(...highs);
  const span = max - min || 1;
  const y = (v: number) => height * pad + (1 - (v - min) / span) * height * (1 - pad * 2);
  const step = width / series.length;
  const candles: DrawnCandle[] = series.map((c, i) => {
    const top = y(Math.max(c.open, c.close));
    const bottom = y(Math.min(c.open, c.close));
    return {
      x: step * i + step / 2,
      wickTop: y(c.high),
      wickBottom: y(c.low),
      bodyTop: top,
      bodyHeight: Math.max(bottom - top, 0.6),
      up: c.close >= c.open,
    };
  });
  const line = averageLine(series)
    .map((v, i) => `${i === 0 ? "M" : "L"}${(step * i + step / 2).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(" ");
  return { candles, line, step };
}
