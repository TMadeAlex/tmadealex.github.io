/* Las fuentes en español: cómo se lee cada enlace a la página donde se leyó una cita o una cifra. */

import type { SourceId } from "../sources";

export const readOn = "23 de noviembre de 2026";
export const readWord = "leído el";

/** The small label over a translation, on the Spanish pages. */
export const translationLabel = "Traducción";

export const labels: Record<SourceId, string> = {
  xBio: "Su bio de X",
  instagramBio: "Su bio de Instagram",
  youtube: "Su canal de YouTube",
  streamDescriptions: "Las descripciones de sus streams en YouTube",
  streamNyAm: "New York AM Session, 19 nov 2026",
  streamAsia: "Asia Session, 22 nov 2026",
  alphas: "Entrevista ALPHAS, TradersPost",
  meetTheTrader: "Meet the Trader, FundedNext",
  instagramRoad: "Su Instagram, 9 ago 2026",
  instagramPo3: "Su Instagram, 13 nov 2026",
  whopFreeTier: "TMADE Free Tier en Whop",
  photoInfo: "Su sitio de fotografía, Info",
  photoPersonal: "Su sitio de fotografía, Personal",
};
