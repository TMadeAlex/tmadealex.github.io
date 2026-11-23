"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  links: { href: string; label: string }[];
  /** The name of the menu, for a screen reader (ui.menu in site.ts). */
  label: string;
}

/**
 * The menu. The page someone is on carries the cyan dot, and is said so to a
 * screen reader. Its words come in as props, so the browser is sent only these.
 */
export default function NavLinks({ links, label }: NavLinksProps) {
  const pathname = usePathname();
  const here = pathname.endsWith("/") ? pathname : `${pathname}/`;

  return (
    <nav aria-label={label} className="nav">
      <ul>
        {links.map((link) => {
          const current = here === link.href;
          return (
            <li key={link.href}>
              <Link href={link.href} aria-current={current ? "page" : undefined} className="nav-link">
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
