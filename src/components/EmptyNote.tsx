import { site } from "@/data/site";

/** One quiet line for a page whose lists are still empty. */
export default function EmptyNote() {
  return (
    <div className="frame pb-20">
      <p className="prose-serif border-t border-rule pt-10 text-ink-soft">{site.labels.empty}</p>
    </div>
  );
}
