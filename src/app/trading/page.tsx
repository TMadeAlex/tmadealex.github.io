import type { Metadata } from "next";
import Holding from "@/components/Holding";
import PageTitle from "@/components/PageTitle";
import EmptyNote from "@/components/EmptyNote";
import About from "@/components/sections/About";
import Offer from "@/components/sections/Offer";
import { site } from "@/data/site";

export const metadata: Metadata = site.ready ? { title: site.labels.about } : {};

export default function AboutPage() {
  if (!site.ready) return <Holding />;

  return (
    <>
      <PageTitle title={site.labels.about} lead={site.tagline} />
      <About titleHidden />
      <Offer />
      {site.about.length === 0 && site.offer.length === 0 ? <EmptyNote /> : null}
    </>
  );
}
