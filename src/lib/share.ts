import type { Metadata } from "next";
import { content } from "@/data";
import { localizeHref } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

/*
 * What a page shows when its link is shared: the Open Graph and X (Twitter) card tags, with the
 * page's picture from public/social/ and its sentence, both set in site.ts (share), in English or
 * in Spanish (es/site.ts). The picture's address is made whole from site.url (metadataBase).
 */
export function shareMetadata(
  page: "home" | "trading" | "photography" | "contact",
  title: string,
  locale: Locale = "en",
): Pick<Metadata, "openGraph" | "twitter"> {
  const { site } = content(locale);
  const card = site.share[page];
  return {
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "es" ? "es_US" : "en_GB",
      alternateLocale: locale === "es" ? ["en_GB"] : ["es_US"],
      url: card.path,
      title,
      description: card.description,
      images: [{ url: card.image, width: 1200, height: 630, alt: card.alt, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: card.description,
      images: [{ url: card.image, alt: card.alt }],
    },
  };
}

/** Tells browsers and search engines that each page has a twin in the other language. */
export function languageMetadata(locale: Locale, route: string): Pick<Metadata, "alternates"> {
  const path = route === "/" ? "/" : `${route.replace(/\/+$/, "")}/`;
  return {
    alternates: {
      canonical: locale === "es" ? localizeHref("es", path) : path,
      languages: { en: path, es: localizeHref("es", path), "x-default": path },
    },
  };
}
