import type { CSSProperties, ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/data/site";
import "./globals.css";

/* Both typefaces are downloaded once, when the site is built, and then served
   from this site itself. A visitor's browser never asks another server for them. */
const display = Newsreader({
  variable: "--font-display-face",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const text = Hanken_Grotesk({
  variable: "--font-text-face",
  subsets: ["latin"],
  display: "swap",
});

/* The tab icon is the bookmark, drawn from the same colours as the page and
   written into the page itself, so it is not a file to fetch. */
const mark =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">` +
  `<rect width="32" height="32" rx="6" fill="${site.tone.tint}"/>` +
  `<path d="M11 0h10v25l-5-4-5 4z" fill="${site.tone.primary}"/></svg>`;

export const metadata: Metadata = {
  title: site.ready ? { default: site.name, template: `%s | ${site.name}` } : site.organisation,
  description: site.ready ? site.tagline || site.name : site.holding.title,
  /* Search engines: the switch is `indexable` in src/data/site.ts. */
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: [{ url: `data:image/svg+xml,${encodeURIComponent(mark)}`, type: "image/svg+xml" }] },
  referrer: "no-referrer",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

/* The colour family, handed to the stylesheet as six values. */
const tone = {
  "--tone-primary": site.tone.primary,
  "--tone-deep": site.tone.deep,
  "--tone-mid": site.tone.mid,
  "--tone-tint": site.tone.tint,
  "--tone-on-dark": site.tone.onDark,
  "--tone-on-dark-soft": site.tone.onDarkSoft,
} as CSSProperties;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={site.language} className={`${display.variable} ${text.variable} antialiased`} style={tone}>
      <body className="relative flex min-h-svh flex-col bg-ground text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-10 focus:bg-ground focus:px-3 focus:py-2"
        >
          {site.ui.skip}
        </a>
        <div className="ribbon-rail" aria-hidden="true">
          <div className="frame">
            <span className="ribbon" />
          </div>
        </div>
        <SiteHeader />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
