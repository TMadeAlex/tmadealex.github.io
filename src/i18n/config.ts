/*
 * The two languages of the site. English is the first: every page lives at its
 * own address (/trading/), and its Spanish twin under /es/ (/es/trading/). The
 * words for each are in src/data (English) and src/data/es (Spanish).
 */

export type Locale = "en" | "es";

/** Pages with a Spanish twin under /es/ ("/" is the front page). */
export const ES_ROUTES = ["/", "/trading", "/photography", "/contact"];

/** Which language an address is in. */
export function localeFromPath(path: string | null | undefined): Locale {
  return path === "/es" || path?.startsWith("/es/") ? "es" : "en";
}

/** An internal address in the given language: /trading/ becomes /es/trading/ in Spanish. */
export function localizeHref(locale: Locale, href: string): string {
  if (locale !== "es" || !href.startsWith("/") || href.startsWith("//") || href.startsWith("/es/") || href === "/es") return href;
  const [path, rest = ""] = href.split(/(?=[?#])/);
  const route = path.replace(/\/+$/, "") || "/";
  if (!ES_ROUTES.includes(route)) return href;
  return `/es${route === "/" ? "/" : `${route}/`}${rest}`;
}

/** The English address of a Spanish page: /es/trading/ becomes /trading/. */
export function delocalizeHref(href: string): string {
  return href.replace(/^\/es(?=\/|$)/, "") || "/";
}

/** The same page in the other language. */
export function twinHref(path: string): string {
  const here = path.endsWith("/") ? path : `${path}/`;
  return localeFromPath(here) === "es" ? delocalizeHref(here) : localizeHref("es", here);
}
