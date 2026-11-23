import { site } from "@/data/site";

/**
 * The holding page: what every address shows while `ready` is false in
 * src/data/site.ts. It says a place is being kept, who set it up, and that
 * nothing on it speaks for the person it is kept for. It asks for nothing.
 */
export default function Holding() {
  const { title, lines, gift } = site.holding;
  const [before, after = ""] = gift.line.split("{name}");

  return (
    <div className="frame below-ribbon flex flex-1 flex-col pb-20">
      <h1 className="max-w-[13ch] text-[clamp(2.6rem,8.2vw,5.25rem)] leading-[1.02] tracking-[-0.02em]">{title}</h1>
      <div className="prose-serif mt-10 text-ink-soft sm:mt-12">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <p className="mt-10 max-w-[34rem] border-t border-rule pt-5 text-sm leading-relaxed text-ink-soft">
        {before}
        <a href={gift.by.href} rel="noopener noreferrer" className="text-link">
          {gift.by.name}
        </a>
        {after}
      </p>
    </div>
  );
}
