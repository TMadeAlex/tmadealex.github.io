import {
  ArrowUpRightIcon,
  GlobeIcon,
  InstagramLogoIcon,
  LinkIcon,
  LinkedinLogoIcon,
  StorefrontIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/ssr";
import Section from "@/components/Section";
import { content } from "@/data";
import type { Locale } from "@/i18n/config";

/* The picture beside each link, by the place it goes to (`place` in contact.ts). */
const icons: Record<string, typeof LinkIcon> = {
  YouTube: YoutubeLogoIcon,
  X: XLogoIcon,
  Instagram: InstagramLogoIcon,
  Whop: StorefrontIcon,
  Website: GlobeIcon,
  "Sitio web": GlobeIcon,
  LinkedIn: LinkedinLogoIcon,
};

/**
 * Contact is a list of links, and only that: no form, no email address, nothing
 * sent anywhere by this site. Each link goes to a page of his own.
 */
export default function Contact({ locale = "en" }: { locale?: Locale }) {
  const { contact } = content(locale);
  return (
    <>
      {contact.groups.map((group) => (
        <Section key={group.id} id={group.id} title={group.title}>
          <ul className="links">
            {group.links.map((link) => {
              const Icon = icons[link.place] ?? LinkIcon;
              return (
                <li key={link.href}>
                  <a href={link.href} rel="noopener noreferrer" className="link-row glass">
                    <span className="link-badge" aria-hidden="true">
                      <Icon weight="duotone" />
                    </span>
                    <span className="link-place">{link.place}</span>
                    <span className="link-handle">{link.handle}</span>
                    <ArrowUpRightIcon aria-hidden="true" className="link-icon" />
                  </a>
                  {link.note ? <p className="link-note">{link.note}</p> : null}
                </li>
              );
            })}
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
