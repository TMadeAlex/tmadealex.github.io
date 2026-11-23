import Section from "@/components/Section";
import { site } from "@/data/site";
import { work } from "@/data/work";

/**
 * The list of work. Appears only when src/data/work.ts has an entry.
 * On the work page the section heading is not shown (the page's own name says
 * it), so each entry's heading moves up one level and the outline does not skip.
 */
export default function Work({ titleHidden = false }: { titleHidden?: boolean }) {
  if (work.length === 0) return null;

  const Heading = titleHidden ? "h2" : "h3";

  return (
    <Section id="work" title={site.labels.work} titleHidden={titleHidden}>
      <ul className="divide-y divide-rule">
        {work.map((item) => (
          <li key={item.id} className="py-6 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <Heading className="text-[1.375rem] leading-snug">{item.title}</Heading>
              {item.period ? <p className="text-sm text-ink-soft">{item.period}</p> : null}
            </div>
            <p className="mt-2 max-w-[62ch] text-ink-soft">{item.summary}</p>
            {item.href ? (
              <p className="mt-3">
                <a href={item.href} rel="noopener noreferrer" className="text-link">
                  {item.linkLabel ?? site.ui.seeIt}
                  <span className="sr-only">: {item.title}</span>
                </a>
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
