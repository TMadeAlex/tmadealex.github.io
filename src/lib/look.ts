/*
 * The two looks of the site (night and morning) and PARTY_MODE.
 *
 * Both are marks on the <html> element: data-theme="night" or "morning", and
 * data-party="on". A small script in the page's <head> (lookScript, below) sets
 * them before anything is drawn, from what this browser chose last time or,
 * the first time, from the device's own light or dark setting. So the page
 * never flashes the wrong look while it loads.
 *
 * The choice is kept in this browser only (localStorage). Nothing is sent anywhere.
 */

export type Look = "night" | "morning";

const LOOK_KEY = "tmadealex-look";
const PARTY_KEY = "tmadealex-party";

/** Runs in <head>, before the page is drawn. Kept small and dependency-free on purpose. */
export const lookScript = `(function(){var d=document.documentElement;try{var s=localStorage.getItem("${LOOK_KEY}");d.dataset.theme=s==="morning"||s==="night"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"morning":"night");if(localStorage.getItem("${PARTY_KEY}")==="on")d.dataset.party="on";}catch(e){d.dataset.theme="night";}})();`;

function remember(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* A private window may refuse; the choice then lasts for this visit only. */
  }
}

export function readLook(): Look {
  return document.documentElement.dataset.theme === "morning" ? "morning" : "night";
}

export function readParty(): boolean {
  return document.documentElement.dataset.party === "on";
}

/** Changes the look. Where the browser can, the new look opens like a camera's iris from the point given. */
export function setLook(next: Look, from?: { x: number; y: number }) {
  const apply = () => {
    document.documentElement.dataset.theme = next;
    remember(LOOK_KEY, next);
  };
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as Document & { startViewTransition?: (update: () => void) => unknown };
  if (still || typeof doc.startViewTransition !== "function") {
    apply();
    return;
  }
  const root = document.documentElement.style;
  root.setProperty("--iris-x", `${from?.x ?? window.innerWidth - 40}px`);
  root.setProperty("--iris-y", `${from?.y ?? 32}px`);
  doc.startViewTransition(apply);
}

export function setParty(on: boolean) {
  if (on) document.documentElement.dataset.party = "on";
  else delete document.documentElement.dataset.party;
  remember(PARTY_KEY, on ? "on" : null);
}

/** For useSyncExternalStore: calls back whenever the look or PARTY_MODE changes. */
export function subscribeLook(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-party"] });
  return () => observer.disconnect();
}
