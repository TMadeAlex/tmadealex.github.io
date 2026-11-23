import type { CSSProperties, ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";
import GiftLine from "@/components/GiftLine";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/data/site";
import "./globals.css";

/*
 * The two typefaces of his TRADERMADE art: a round geometric sans for words, and
 * a monospace for the small spaced lines. Both are downloaded once, when the
 * site is built, and then served from this site itself. A visitor's browser
 * never asks another server for them.
 */
const sans = Poppins({
  variable: "--font-sans-face",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/* The tab icon: a ring and the cyan dot, drawn from his colours and written into the page, so it is not a file to fetch. */
const mark =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">` +
  `<circle cx="16" cy="16" r="16" fill="${site.tone.deep}"/>` +
  `<circle cx="16" cy="16" r="12.5" fill="none" stroke="${site.tone.mid}" stroke-width="1.2"/>` +
  `<circle cx="16" cy="16" r="5" fill="${site.tone.primary}"/></svg>`;

export const metadata: Metadata = {
  title: site.ready ? { default: site.name, template: `%s | ${site.name}` } : site.organisation,
  description: site.ready ? site.description : site.holding.title,
  /* Search engines: the switch is `indexable` in src/data/site.ts. */
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: [{ url: `data:image/svg+xml,${encodeURIComponent(mark)}`, type: "image/svg+xml" }] },
  referrer: "no-referrer",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: site.tone.deep },
    { media: "(prefers-color-scheme: light)", color: "#f6fcfc" },
  ],
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
    <html lang={site.language} className={`${sans.variable} ${mono.variable} antialiased`} style={tone}>
      <body className="site">
        <a href="#main" className="skip-link">
          {site.ui.skip}
        </a>
        <div className="backdrop" aria-hidden="true" />
        {site.ready ? <GiftLine /> : null}
        <SiteHeader />
        <main id="main" className="site-main">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
