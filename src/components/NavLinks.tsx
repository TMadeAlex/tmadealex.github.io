"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  links: { href: string; label: string }[];
  /** The name of the menu, for a screen reader (ui.menu in site.ts). */
  label: string;
}

/**
 * The menu. The page someone is on is underlined, and said so to a screen reader.
 * Its words come in as props, so the browser is sent only these, not the whole of site.ts.
 */
export default function NavLinks({ links, label }: NavLinksProps) {
  const pathname = usePathname();
  const here = pathname.endsWith("/") ? pathname : `${pathname}/`;

  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
        {links.map((link) => {
          const current = here === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={
                  current
                    ? "underline decoration-accent decoration-2 underline-offset-[0.35em]"
                    : "text-ink-soft hover:text-ink"
                }
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
