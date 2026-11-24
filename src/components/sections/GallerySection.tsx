import Section from "@/components/Section";
import Cite from "@/components/Cite";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { site } from "@/data/site";
import { gallery } from "@/data/gallery";
import { photography } from "@/data/photography";

/**
 * His personal work. With pictures in gallery.ts, the picture grid and its
 * credit. Without them (as on main), the titles as his site captions them,
 * each pointing to the page of his site where the photographs are.
 */
export default function GallerySection() {
  const { personal } = photography;

  return (
    <Section id="personal" title={personal.title} intro={<p>{gallery.length > 0 ? personal.galleryText : personal.text}</p>}>
      {gallery.length > 0 ? (
        <>
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
          <p className="gallery-credit">{personal.credit}</p>
        </>
      ) : (
        <>
          <ol className="works">
            {personal.works.map((work, i) => (
              <li key={`${work.title}-${work.place}`}>
                <a href={personal.action.href} rel="noopener noreferrer" className="work-row">
                  <span className="work-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="work-title">{work.title}</span>
                  <span className="work-place">{work.place}</span>
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-8">
            <a href={personal.action.href} rel="noopener noreferrer" className="button button-solid">
              {personal.action.label}
            </a>
          </p>
        </>
      )}
      <p className="cite-line">
        <Cite {...personal.cite} dated />
      </p>
    </Section>
  );
}
