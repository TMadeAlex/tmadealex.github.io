import Section from "@/components/Section";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { site } from "@/data/site";
import { gallery } from "@/data/gallery";

/** The pictures. Appears only when src/data/gallery.ts has an entry. */
export default function GallerySection() {
  if (gallery.length === 0) return null;

  return (
    <Section id="gallery" title={site.labels.gallery}>
      <GalleryGrid
        items={gallery}
        words={{
          openPicture: site.ui.openPicture,
          pictureCount: site.ui.pictureCount,
          closePicture: site.ui.closePicture,
          previousPicture: site.ui.previousPicture,
          nextPicture: site.ui.nextPicture,
        }}
      />
    </Section>
  );
}
