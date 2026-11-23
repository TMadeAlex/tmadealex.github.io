interface PageTitleProps {
  title: string;
  lead?: string;
}

/** The top of a page: its name, and one line under it when there is one. */
export default function PageTitle({ title, lead }: PageTitleProps) {
  return (
    <div className="frame below-ribbon pb-12 md:pb-16">
      <h1 className="text-[clamp(2.6rem,8.2vw,5.25rem)] leading-[1.02] tracking-[-0.02em]">{title}</h1>
      {lead ? <p className="mt-5 max-w-[36ch] font-display text-2xl italic leading-snug text-ink-soft">{lead}</p> : null}
    </div>
  );
}
