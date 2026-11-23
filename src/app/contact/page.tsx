import type { Metadata } from "next";
import Holding from "@/components/Holding";
import PageTitle from "@/components/PageTitle";
import EmptyNote from "@/components/EmptyNote";
import Contact from "@/components/sections/Contact";
import Support, { supportShown } from "@/components/sections/Support";
import { site } from "@/data/site";

export const metadata: Metadata = site.ready ? { title: site.labels.contact } : {};

/* Links only. There is no form on this page, or anywhere on the site. */
export default function ContactPage() {
  if (!site.ready) return <Holding />;

  return (
    <>
      <PageTitle title={site.labels.contact} />
      <Contact titleHidden />
      <Support />
      {site.links.length === 0 && !supportShown ? <EmptyNote /> : null}
    </>
  );
}
