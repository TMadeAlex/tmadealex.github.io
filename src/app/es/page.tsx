import type { Metadata } from "next";
import HomeView from "@/views/HomeView";
import { content } from "@/data";
import { shareMetadata, languageMetadata } from "@/lib/share";

const { site } = content("es");

export const metadata: Metadata = {
  title: { absolute: site.name },
  description: site.description,
  ...shareMetadata("home", site.name, "es"),
  ...languageMetadata("es", "/"),
};

/* La página principal en español. */
export default function HomePageEs() {
  return <HomeView locale="es" />;
}
