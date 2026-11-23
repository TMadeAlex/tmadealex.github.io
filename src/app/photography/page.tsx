import type { Metadata } from "next";
import Holding from "@/components/Holding";
import PageTitle from "@/components/PageTitle";
import Cite from "@/components/Cite";
import PhotoStory from "@/components/sections/PhotoStory";
import GallerySection from "@/components/sections/GallerySection";
import { site } from "@/data/site";
import { photography } from "@/data/photography";

export const metadata: Metadata = site.ready ? { title: photography.title } : {};

/* Photography: the story in his own words, the biography his own site gives, then his personal work. */
export default function PhotographyPage() {
  if (!site.ready) return <Holding />;

  return (
    <>
      <PageTitle
        title={photography.title}
        kicker={photography.byline}
        lead={
          <>
            <p className="page-lead-big">{photography.lead.text}</p>
            <p className="cite-line">
              <Cite source={photography.lead.source} dated />
            </p>
            <ul className="inline-links">
              {photography.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} rel="noopener noreferrer" className="text-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </>
        }
      />
      <PhotoStory />
      <GallerySection />
    </>
  );
}
