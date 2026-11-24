"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { localeFromPath } from "./config";
import type { Locale } from "./config";

/** The language of the page being shown, from its address. */
export function useLocale(): Locale {
  return localeFromPath(usePathname());
}

/**
 * For the parts every page shares (the menu, the foot, the Support window):
 * both languages are drawn on the server, and the browser shows the one for
 * the page it is on.
 */
export function ByLocale({ en, es }: { en: ReactNode; es: ReactNode }) {
  return <>{useLocale() === "es" ? es : en}</>;
}

/** Keeps <html lang> right as a visitor moves between the languages. The first load is set in <head>. */
export function HtmlLang({ en }: { en: string }) {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale === "es" ? "es" : en;
  }, [locale, en]);
  return null;
}
