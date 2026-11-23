import Section from "@/components/Section";
import { site } from "@/data/site";

/** The about paragraphs. Appears only when there is at least one. */
export default function About({ titleHidden = false }: { titleHidden?: boolean }) {
  if (site.about.length === 0) return null;

  return (
    <Section id="about" title={site.labels.about} titleHidden={titleHidden}>
      <div className="prose-serif">
        {site.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
