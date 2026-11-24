import type { Metadata } from "next";
import { site } from "@/data/site";

/*
 * What a page shows when its link is shared: the Open Graph and X (Twitter) card tags, with the
 * page's picture from public/social/ and its sentence, both set in src/data/site.ts (share).
 * The picture's address is made whole from site.url (metadataBase in layout.tsx).
 */
export function shareMetadata(page: keyof typeof site.share, title: string): Pick<Metadata, "openGraph" | "twitter"> {
  const card = site.share[page];
  return {
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.language.replace("-", "_"),
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
