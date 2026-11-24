import type { Metadata } from "next";
import TradingView from "@/views/TradingView";
import { content } from "@/data";
import { languageMetadata, shareMetadata } from "@/lib/share";

const { site, trading } = content("en");

export const metadata: Metadata = site.ready
  ? { title: trading.title, ...shareMetadata("trading", `${trading.title} | ${site.name}`), ...languageMetadata("en", "/trading") }
  : {};

/* Trading in English. Its Spanish twin is src/app/es/trading/page.tsx; both draw src/views/TradingView.tsx. */
export default function TradingPage() {
  return <TradingView locale="en" />;
}
