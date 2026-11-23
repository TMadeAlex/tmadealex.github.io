import Section from "@/components/Section";
import { site } from "@/data/site";

/** What is offered. Appears only when there is at least one entry. */
export default function Offer() {
  if (site.offer.length === 0) return null;

  return (
    <Section id="offer" title={site.labels.offer}>
      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {site.offer.map((entry) => (
          <div key={entry.title}>
            <dt className="font-display text-[1.375rem] leading-snug">{entry.title}</dt>
            <dd className="mt-2 text-ink-soft">{entry.text}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
