import type { Metadata } from "next";
import PhotographyView from "@/views/PhotographyView";
import { content } from "@/data";
import { languageMetadata, shareMetadata } from "@/lib/share";

const { site, photography } = content("en");

export const metadata: Metadata = site.ready
  ? {
      title: photography.title,
      ...shareMetadata("photography", `${photography.title} | ${site.name}`),
      ...languageMetadata("en", "/photography"),
    }
  : {};

/* Photography in English. Its Spanish twin is src/app/es/photography/page.tsx; both draw src/views/PhotographyView.tsx. */
export default function PhotographyPage() {
  return <PhotographyView locale="en" />;
}
