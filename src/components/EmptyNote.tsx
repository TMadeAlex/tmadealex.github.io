import { site } from "@/data/site";

/** One quiet line for a part of a page whose list is still empty. */
export default function EmptyNote() {
  return <p className="empty-note">{site.labels.empty}</p>;
}
