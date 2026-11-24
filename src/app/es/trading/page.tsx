import type { Metadata } from "next";
import TradingView from "@/views/TradingView";
import { content } from "@/data";
import { languageMetadata, shareMetadata } from "@/lib/share";

const { site, trading } = content("es");

export const metadata: Metadata = {
  title: trading.title,
  description: site.share.trading.description,
  ...shareMetadata("trading", `${trading.title} | ${site.name}`, "es"),
  ...languageMetadata("es", "/trading"),
};

/* Trading en español. */
export default function TradingPageEs() {
  return <TradingView locale="es" />;
}
