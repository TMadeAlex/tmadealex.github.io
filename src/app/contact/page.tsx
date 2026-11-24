import type { Metadata } from "next";
import ContactView from "@/views/ContactView";
import { content } from "@/data";
import { languageMetadata, shareMetadata } from "@/lib/share";

const { site, contact } = content("en");

export const metadata: Metadata = site.ready
  ? { title: contact.title, ...shareMetadata("contact", `${contact.title} | ${site.name}`), ...languageMetadata("en", "/contact") }
  : {};

/* Contact in English. Its Spanish twin is src/app/es/contact/page.tsx; both draw src/views/ContactView.tsx. */
export default function ContactPage() {
  return <ContactView locale="en" />;
}
