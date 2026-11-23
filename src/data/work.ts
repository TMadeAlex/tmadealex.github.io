/*
 * The list of work. While it is empty, the work section does not appear.
 * To add an entry, copy the example, take away the two slashes at the start
 * of each of its lines, and change the words between the quote marks.
 */

export interface WorkItem {
  /** A short name with no spaces, different for each entry. */
  id: string;
  title: string;
  /** Optional: when it was, for example "2026" or "2024 to now". */
  period?: string;
  /** One or two plain sentences. */
  summary: string;
  /** Optional: a web address where it can be seen. */
  href?: string;
  /** Optional: the words of that link. Without it the link says "See it" (ui.seeIt in site.ts). */
  linkLabel?: string;
}

export const work: WorkItem[] = [
  // {
  //   id: "an-example",
  //   title: "A piece of work",
  //   period: "2026",
  //   summary: "What it was and who it was for, in a sentence or two.",
  //   href: "https://example.org/",
  //   linkLabel: "See it",
  // },
];
