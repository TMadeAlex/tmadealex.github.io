import type { CSSProperties, ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";
import GiftLine from "@/components/GiftLine";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Providers from "@/components/chrome/Providers";
import ScrollProgress from "@/components/chrome/ScrollProgress";
import CursorCandles from "@/components/fx/CursorCandles";
import { lookScript } from "@/lib/look";
import { shareMetadata } from "@/lib/share";
import { site } from "@/data/site";
import "./globals.css";

/*
 * The two typefaces of his TRADERMADE art: a round geometric sans for words, and
 * a monospace for the small spaced lines and the trading screens. Both are
 * downloaded once, when the site is built, and then served from this site
 * itself. A visitor's browser never asks another server for them.
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
  metadataBase: new URL(site.url),
  title: site.ready ? { default: site.name, template: `%s | ${site.name}` } : site.organisation,
  description: site.ready ? site.description : site.holding.title,
  /* Search engines: the switch is `indexable` in src/data/site.ts. A shared link still shows its preview. */
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
  /* The ring and dot: drawn into the page for browsers, and as pictures for phones and apps (scripts/make-share-cards.py). */
  icons: {
    icon: [
      { url: `data:image/svg+xml,${encodeURIComponent(mark)}`, type: "image/svg+xml" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  referrer: "no-referrer",
  ...(site.ready ? shareMetadata("home", site.name) : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: site.tone.deep },
    { media: "(prefers-color-scheme: light)", color: "#d5eaec" },
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
    /* The look (night or morning) is set on <html> by the script below before the page is drawn, so React is told not to mind it. */
    <html
      lang={site.language}
      data-theme="night"
      className={`${sans.variable} ${mono.variable} antialiased`}
      style={tone}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: lookScript }} />
      </head>
      <body className="site">
        <a href="#main" className="skip-link">
          {site.ui.skip}
        </a>
        <div className="backdrop" aria-hidden="true">
          <span className="backdrop-glow backdrop-glow-a" />
          <span className="backdrop-glow backdrop-glow-b" />
          <span className="backdrop-grain" />
        </div>
        <Providers partyWords={{ on: site.party.on, off: site.party.off }}>
          <SiteHeader />
          {site.ready ? <ScrollProgress label={site.ui.toTop} cue={{ word: site.ui.scrollCue, label: site.ui.scrollCueLabel }} /> : null}
          <main id="main" className="site-main" tabIndex={-1}>
            {site.ready ? <GiftLine /> : null}
            {children}
          </main>
          <SiteFooter />
          {site.ready ? <CursorCandles /> : null}
        </Providers>
      </body>
    </html>
  );
}
