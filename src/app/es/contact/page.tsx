import type { Metadata } from "next";
import ContactView from "@/views/ContactView";
import { content } from "@/data";
import { languageMetadata, shareMetadata } from "@/lib/share";

const { site, contact } = content("es");

export const metadata: Metadata = {
  title: contact.title,
  description: site.share.contact.description,
  ...shareMetadata("contact", `${contact.title} | ${site.name}`, "es"),
  ...languageMetadata("es", "/contact"),
};

/* Contacto en español. */
export default function ContactPageEs() {
  return <ContactView locale="es" />;
}
