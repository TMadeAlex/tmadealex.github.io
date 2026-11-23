import type { ReactNode } from "react";

interface PageTitleProps {
  title: string;
  /** Optional: the small spaced line above the title. */
  kicker?: ReactNode;
  /** Optional: a line or two under it. */
  lead?: ReactNode;
}

/** The top of an inner page: its name, ending in the cyan dot of his wordmark, and a lead. */
export default function PageTitle({ title, kicker, lead }: PageTitleProps) {
  return (
    <div className="frame page-title">
      {kicker ? <div className="kicker">{kicker}</div> : null}
      <h1 className="display">
        {title}
        <span className="dot" aria-hidden="true" />
      </h1>
      {lead ? <div className="page-lead">{lead}</div> : null}
    </div>
  );
}
