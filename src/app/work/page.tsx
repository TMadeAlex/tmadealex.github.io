import type { Metadata } from "next";
import Holding from "@/components/Holding";
import PageTitle from "@/components/PageTitle";
import EmptyNote from "@/components/EmptyNote";
import Work from "@/components/sections/Work";
import GallerySection from "@/components/sections/GallerySection";
import { site } from "@/data/site";
import { work } from "@/data/work";
import { gallery } from "@/data/gallery";

export const metadata: Metadata = site.ready ? { title: site.labels.work } : {};

export default function WorkPage() {
  if (!site.ready) return <Holding />;

  return (
    <>
      <PageTitle title={site.labels.work} />
      <Work titleHidden />
      <GallerySection />
      {work.length === 0 && gallery.length === 0 ? <EmptyNote /> : null}
    </>
  );
}
