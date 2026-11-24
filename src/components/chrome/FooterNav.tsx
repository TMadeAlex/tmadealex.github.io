"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ApertureIcon,
  ChartLineUpIcon,
  ChatsCircleIcon,
  CodeIcon,
  GithubLogoIcon,
  HouseIcon,
  PlanetIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";
import type { NavLink } from "@/data/site";
import WelcomeAgain from "@/components/chrome/WelcomeAgain";
import { openRisk } from "@/components/chrome/RiskWindow";
import { localizeHref } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

const icons = { trading: ChartLineUpIcon, photography: ApertureIcon, contact: ChatsCircleIcon };

interface FooterNavProps {
  locale: Locale;
  homeLabel: string;
  links: NavLink[];
  github: { home: { label: string; href: string }; source: { label: string; href: string }; log: { short: string; href: string } };
  risk: string;
  welcome: string;
}

/**
 * The links at the very end of each page, each with its picture, the page you
 * are on lit, as the menu at the top lights it. Then his GitHub home, this
 * site's source and his AstroLog, the risk window, and the welcome.
 */
export default function FooterNav({ locale, homeLabel, links, github, risk, welcome }: FooterNavProps) {
  const pathname = usePathname();
  const here = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const pages = [{ href: "/", label: homeLabel, icon: null }, ...links].map((link) => ({
    ...link,
    href: localizeHref(locale, link.href),
  }));

  return (
    <ul className="footer-nav">
      {pages.map((link) => {
        const Icon = link.icon ? icons[link.icon] : HouseIcon;
        const current = here === link.href;
        return (
          <li key={link.href}>
            <Link href={link.href} aria-current={current ? "page" : undefined} className="footer-link">
              <Icon weight="duotone" aria-hidden="true" />
              {link.label}
            </Link>
          </li>
        );
      })}
      <li>
        <a href={github.home.href} rel="noopener noreferrer" className="footer-link">
          <GithubLogoIcon weight="duotone" aria-hidden="true" />
          {github.home.label}
        </a>
      </li>
      <li>
        <a href={github.source.href} rel="noopener noreferrer" className="footer-link">
          <CodeIcon weight="duotone" aria-hidden="true" />
          {github.source.label}
        </a>
      </li>
      <li>
        <a href={github.log.href} rel="noopener noreferrer" className="footer-link">
          <PlanetIcon weight="duotone" aria-hidden="true" />
          {github.log.short}
        </a>
      </li>
      <li>
        <button type="button" className="footer-link" onClick={openRisk}>
          <ShieldCheckIcon weight="duotone" aria-hidden="true" />
          {risk}
        </button>
      </li>
      <li>
        <WelcomeAgain label={welcome} className="footer-link footer-welcome" />
      </li>
    </ul>
  );
}
