import type { Cited } from "@/data/sources";
import { sources } from "@/data/sources";

/** "1:00:16" or "16:24", from seconds. */
export function timecode(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  return `${h > 0 ? `${h}:` : ""}${mm}:${String(s).padStart(2, "0")}`;
}

/** The address of a source, opened at the right moment when it is a video. */
export function citeHref({ source, at }: Cited) {
  const { href } = sources[source];
  return at !== undefined && href.includes("youtube.com/watch") ? `${href}&t=${at}s` : href;
}
