import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  /** True on a page whose own name already says this heading, so it is not said twice. */
  titleHidden?: boolean;
  children: ReactNode;
}

/**
 * One part of a page: its heading in a narrow column on the left, its content
 * on the right. On a phone the heading sits above the content.
 */
export default function Section({ id, title, titleHidden = false, children }: SectionProps) {
  const grid = "grid gap-x-10 gap-y-5 border-t border-rule py-12 md:grid-cols-[11rem_minmax(0,1fr)] md:py-16";

  if (titleHidden) {
    return (
      <div className="frame">
        <div className={grid}>
          <div className="min-w-0 md:col-start-2">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <section aria-labelledby={`${id}-title`} className="frame">
      <div className={grid}>
        <h2 id={`${id}-title`} className="text-2xl leading-tight md:pt-1">
          {title}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
