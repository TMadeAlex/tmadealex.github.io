import Holding from "@/components/Holding";
import PageTitle from "@/components/PageTitle";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import GallerySection from "@/components/sections/GallerySection";
import Offer from "@/components/sections/Offer";
import Contact from "@/components/sections/Contact";
import Support from "@/components/sections/Support";
import { site } from "@/data/site";

/* The front page: every section, in order. A section with nothing in it does not appear. */
export default function HomePage() {
  if (!site.ready) return <Holding />;

  return (
    <>
      <PageTitle title={site.name} lead={site.tagline} />
      <About />
      <Work />
      <GallerySection />
      <Offer />
      <Contact />
      <Support />
    </>
  );
}
