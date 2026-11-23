import { ArrowUpRight } from "lucide-react";
import Section from "@/components/Section";
import { contact } from "@/data/contact";

/**
 * Contact is a list of links, and only that: no form, no email address, nothing
 * sent anywhere by this site. Each link goes to a page of his own.
 */
export default function Contact() {
  return (
    <>
      {contact.groups.map((group) => (
        <Section key={group.id} id={group.id} title={group.title}>
          <ul className="links">
            {group.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} rel="noopener noreferrer" className="link-row">
                  <span className="link-place">{link.place}</span>
                  <span className="link-handle">{link.handle}</span>
                  <ArrowUpRight aria-hidden="true" className="link-icon" strokeWidth={1.5} />
                </a>
                {link.note ? <p className="link-note">{link.note}</p> : null}
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section id="colophon" title={contact.colophon.title} className="colophon">
        <div className="prose prose-small">
          {contact.colophon.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>
    </>
  );
}
