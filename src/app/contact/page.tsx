import type { Metadata } from "next";
import Holding from "@/components/Holding";
import PageTitle from "@/components/PageTitle";
import Contact from "@/components/sections/Contact";
import Support from "@/components/sections/Support";
import { site } from "@/data/site";
import { shareMetadata } from "@/lib/share";
import { contact } from "@/data/contact";

export const metadata: Metadata = site.ready
  ? { title: contact.title, ...shareMetadata("contact", `${contact.title} | ${site.name}`) }
  : {};

/* Links only. There is no form on this page, or anywhere on the site, and no email address. */
export default function ContactPage() {
  if (!site.ready) return <Holding />;

  return (
    <>
      <PageTitle title={contact.title} lead={<p className="page-lead-big">{contact.lead}</p>} />
      <Contact />
      <Support />
    </>
  );
}
