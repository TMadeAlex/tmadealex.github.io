import { Link2, Mail } from "lucide-react";
import Section from "@/components/Section";
import { site } from "@/data/site";

/**
 * Contact is a list of links, and only that: no form, nothing to fill in,
 * nothing sent anywhere by this site. Appears only when there is a link.
 */
export default function Contact({ titleHidden = false }: { titleHidden?: boolean }) {
  if (site.links.length === 0) return null;

  return (
    <Section id="contact" title={site.labels.contact} titleHidden={titleHidden}>
      <ul className="space-y-5">
        {site.links.map((link) => {
          const Icon = link.href.startsWith("mailto:") ? Mail : Link2;
          return (
            <li key={link.href} className="flex gap-3">
              <Icon aria-hidden="true" className="mt-[0.45rem] h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
              <div className="min-w-0">
                <a href={link.href} rel="noopener noreferrer" className="text-link font-display text-[1.375rem] leading-snug [overflow-wrap:anywhere]">
                  {link.label}
                </a>
                {link.note ? <p className="mt-1 text-sm text-ink-soft [overflow-wrap:anywhere]">{link.note}</p> : null}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
