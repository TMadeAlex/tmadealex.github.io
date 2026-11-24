import type { Metadata } from "next";
import PhotographyView from "@/views/PhotographyView";
import { content } from "@/data";
import { languageMetadata, shareMetadata } from "@/lib/share";

const { site, photography } = content("es");

export const metadata: Metadata = {
  title: photography.title,
  description: site.share.photography.description,
  ...shareMetadata("photography", `${photography.title} | ${site.name}`, "es"),
  ...languageMetadata("es", "/photography"),
};

/* Fotografía en español. */
export default function PhotographyPageEs() {
  return <PhotographyView locale="es" />;
}
