/*
 * Every word of the site, in one language at a time. English is in this
 * folder; Spanish in es/. A page asks for content("es") or content("en").
 */

import type { Locale } from "@/i18n/config";
import { site } from "./site";
import { home } from "./home";
import { trading } from "./trading";
import { photography } from "./photography";
import { contact } from "./contact";
import { support } from "./support";
import { schedule } from "./schedule";
import { gallery } from "./gallery";
import { site as siteEs } from "./es/site";
import { home as homeEs } from "./es/home";
import { trading as tradingEs } from "./es/trading";
import { photography as photographyEs } from "./es/photography";
import { contact as contactEs } from "./es/contact";
import { support as supportEs } from "./es/support";
import { schedule as scheduleEs } from "./es/schedule";
import { gallery as galleryEs } from "./es/gallery";

const en = { site, home, trading, photography, contact, support, schedule, gallery };
const es: typeof en = {
  site: siteEs,
  home: homeEs,
  trading: tradingEs,
  photography: photographyEs,
  contact: contactEs,
  support: supportEs,
  schedule: scheduleEs,
  gallery: galleryEs,
};

export type Content = typeof en;

export function content(locale: Locale): Content {
  return locale === "es" ? es : en;
}
