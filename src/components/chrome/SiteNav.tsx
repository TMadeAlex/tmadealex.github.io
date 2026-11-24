"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import {
  ApertureIcon,
  ArrowUpRightIcon,
  CameraIcon,
  CaretDownIcon,
  ChartLineUpIcon,
  ChatsCircleIcon,
  CompassIcon,
  GithubLogoIcon,
  HouseIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  ListIcon,
  StorefrontIcon,
  XIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import type { ExternalLink, NavLink } from "@/data/site";
import LookToggle from "@/components/chrome/LookToggle";
import PartyToggle from "@/components/chrome/PartyToggle";

const pageIcons = { trading: ChartLineUpIcon, photography: ApertureIcon, contact: ChatsCircleIcon };
const placeIcons = {
  youtube: YoutubeLogoIcon,
  whop: StorefrontIcon,
  x: XLogoIcon,
  instagram: InstagramLogoIcon,
  camera: CameraIcon,
  linkedin: LinkedinLogoIcon,
  github: GithubLogoIcon,
};

interface SiteNavProps {
  name: string;
  homeLabel: string;
  links: NavLink[];
  explore: { label: string; links: ExternalLink[] };
  source: { label: string; short: string; href: string; home: ExternalLink };
  look: { heading: string; night: string; morning: string; toNight: string; toMorning: string };
  party: { heading: string; name: string; hint: string };
  words: { menu: string; openMenu: string; closeMenu: string; home: string };
  /** The Support button and its window, drawn on the server. */
  support: ReactNode;
}

function PlaceIcon({ icon }: { icon?: ExternalLink["icon"] }) {
  const Icon = icon ? placeIcons[icon] : ArrowUpRightIcon;
  return <Icon weight="duotone" aria-hidden="true" className="nav-icon" />;
}

/**
 * The menu, fixed at the top of the screen on frosted glass, in the way the
 * Find Your Feathers and iamoneself sites lay theirs out: his name and the home
 * mark, the three pages as pills with their pictures (a glowing pill slides to
 * the page you are on), Explore for his own pages elsewhere, the site's source
 * on GitHub, the night and morning looks, PARTY_MODE, and Support.
 *
 * On a narrow screen the pages fold into a menu button that opens a panel from
 * the right. That panel is the browser's own modal dialog, so Tab stays inside
 * it and Escape closes it.
 */
export default function SiteNav({ name, homeLabel, links, explore, source, look, party, words, support }: SiteNavProps) {
  const pathname = usePathname();
  const here = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const [scrolled, setScrolled] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDialogElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  /* A new page closes the panel and the Explore menu. */
  useEffect(() => {
    drawerRef.current?.close();
  }, [pathname]);

  /* Explore closes on a click elsewhere, on Escape, and when the keyboard leaves it. */
  useEffect(() => {
    if (!exploreOpen) return;
    const onDown = (event: PointerEvent) => {
      if (!exploreRef.current?.contains(event.target as Node)) setExploreOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExploreOpen(false);
        exploreRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [exploreOpen]);

  const onHome = (event: MouseEvent) => {
    if (here === "/") {
      event.preventDefault();
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });
    }
  };

  const openDrawer = () => drawerRef.current?.showModal();
  const closeDrawer = () => drawerRef.current?.close();

  return (
    <header className={scrolled ? "nav-bar nav-bar-scrolled" : "nav-bar"}>
      <div className="frame nav-inner">
        <Link href="/" className="brand nav-brand" aria-label={words.home} onClick={onHome}>
          <span className="nav-brand-word">
            {name}
            <span className="dot dot-breathe" aria-hidden="true" />
          </span>
          <HouseIcon weight="duotone" aria-hidden="true" className="nav-brand-home" />
          <span className="nav-brand-here" aria-hidden="true">
            {here === "/" ? homeLabel : links.find((l) => l.href === here)?.label ?? ""}
          </span>
        </Link>

        <nav aria-label={words.menu} className="nav-pages">
          <ul>
            {links.map((link) => {
              const Icon = pageIcons[link.icon];
              const current = here === link.href;
              return (
                <li key={link.href}>
                  <Link href={link.href} aria-current={current ? "page" : undefined} className="nav-pill">
                    {current ? (
                      <motion.span layoutId="nav-here" className="nav-pill-here" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                    ) : null}
                    <Icon weight="duotone" aria-hidden="true" className="nav-icon" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <span className="nav-rule" aria-hidden="true" />

          <div ref={exploreRef} className="nav-explore">
            <button
              type="button"
              className="nav-pill"
              aria-expanded={exploreOpen}
              aria-controls="nav-explore-menu"
              onClick={() => setExploreOpen((open) => !open)}
            >
              <CompassIcon weight="duotone" aria-hidden="true" className="nav-icon" />
              <span>{explore.label}</span>
              <CaretDownIcon weight="bold" aria-hidden="true" className={exploreOpen ? "nav-caret nav-caret-open" : "nav-caret"} />
            </button>
            <AnimatePresence>
              {exploreOpen ? (
                <motion.ul
                  id="nav-explore-menu"
                  className="nav-menu glass"
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
                  onBlur={(event) => {
                    if (!exploreRef.current?.contains(event.relatedTarget as Node)) setExploreOpen(false);
                  }}
                >
                  {explore.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} rel="noopener noreferrer" className="nav-menu-link" onClick={() => setExploreOpen(false)}>
                        <PlaceIcon icon={link.icon} />
                        <span>{link.label}</span>
                        <ArrowUpRightIcon aria-hidden="true" className="nav-menu-out" />
                      </a>
                    </li>
                  ))}
                </motion.ul>
              ) : null}
            </AnimatePresence>
          </div>

          <a href={source.href} rel="noopener noreferrer" className="nav-pill nav-source" title={source.label}>
            <GithubLogoIcon weight="duotone" aria-hidden="true" className="nav-icon" />
            <span className="nav-source-word">{source.short}</span>
          </a>
        </nav>

        <div className="nav-tools">
          <LookToggle words={look} />
          <span className="nav-party-wide">
            <PartyToggle name={party.name} hint={party.hint} />
          </span>
          {support}
          <button type="button" className="nav-burger" onClick={openDrawer} aria-label={words.openMenu} aria-haspopup="dialog">
            <ListIcon weight="duotone" aria-hidden="true" />
          </button>
        </div>
      </div>

      <dialog
        ref={drawerRef}
        className="drawer"
        aria-label={words.menu}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDrawer();
        }}
      >
        <div className="drawer-panel glass">
          <div className="drawer-head">
            <span className="drawer-heading">{words.menu}</span>
            <button type="button" className="drawer-close" onClick={closeDrawer} aria-label={words.closeMenu}>
              <XIcon weight="bold" aria-hidden="true" />
            </button>
          </div>

          <ul className="drawer-list">
            <li>
              <Link href="/" className="drawer-link" aria-current={here === "/" ? "page" : undefined} onClick={onHome}>
                <HouseIcon weight="duotone" aria-hidden="true" className="nav-icon" />
                <span>{homeLabel}</span>
              </Link>
            </li>
            {links.map((link) => {
              const Icon = pageIcons[link.icon];
              return (
                <li key={link.href}>
                  <Link href={link.href} className="drawer-link" aria-current={here === link.href ? "page" : undefined}>
                    <Icon weight="duotone" aria-hidden="true" className="nav-icon" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="drawer-heading drawer-sub">{explore.label}</p>
          <ul className="drawer-list">
            {explore.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} rel="noopener noreferrer" className="drawer-link">
                  <PlaceIcon icon={link.icon} />
                  <span>{link.label}</span>
                  <ArrowUpRightIcon aria-hidden="true" className="nav-menu-out" />
                </a>
              </li>
            ))}
          </ul>

          <p className="drawer-heading drawer-sub">{look.heading}</p>
          <div className="drawer-row">
            <span>
              {look.night} / {look.morning}
            </span>
            <LookToggle words={look} />
          </div>
          <div className="drawer-row">
            <span>{party.heading}</span>
            <PartyToggle name={party.name} hint={party.hint} />
          </div>

          <ul className="drawer-list drawer-foot">
            <li>
              <a href={source.href} rel="noopener noreferrer" className="drawer-link">
                <GithubLogoIcon weight="duotone" aria-hidden="true" className="nav-icon" />
                <span>{source.label}</span>
              </a>
            </li>
            <li>
              <a href={source.home.href} rel="noopener noreferrer" className="drawer-link">
                <GithubLogoIcon weight="duotone" aria-hidden="true" className="nav-icon" />
                <span>{source.home.label}</span>
              </a>
            </li>
          </ul>
        </div>
      </dialog>
    </header>
  );
}
