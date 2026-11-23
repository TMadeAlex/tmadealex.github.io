import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  /** Optional: a sentence under the heading. */
  intro?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * One part of a page: its heading and a sentence in a narrow column on the
 * left, its content on the right. On a phone the heading sits above.
 */
export default function Section({ id, title, intro, className = "", children }: SectionProps) {
  return (
    <section aria-labelledby={`${id}-title`} id={id} className={`frame section ${className}`}>
      <div className="section-grid">
        <div className="section-side">
          <h2 id={`${id}-title`} className="section-title">
            {title}
          </h2>
          {intro ? <div className="section-intro">{intro}</div> : null}
        </div>
        <div className="section-body">{children}</div>
      </div>
    </section>
  );
}
