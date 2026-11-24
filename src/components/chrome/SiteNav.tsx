"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import {
  ApertureIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  CameraIcon,
  CaretDownIcon,
  ChartLineUpIcon,
  CodeIcon,
  ChatsCircleIcon,
  CompassIcon,
  GithubLogoIcon,
  HandWavingIcon,
  HouseIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  ListIcon,
  PlanetIcon,
  ShieldCheckIcon,
  StorefrontIcon,
  TranslateIcon,
  XIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import type { ExternalLink, NavLink } from "@/data/site";
import LookToggle from "@/components/chrome/LookToggle";
import ScrollJump from "@/components/chrome/ScrollJump";
import { openRisk } from "@/components/chrome/RiskWindow";
import { useLocale } from "@/i18n/client";
import { localizeHref, twinHref } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
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
  code: CodeIcon,
  log: PlanetIcon,
};

/** The menu's words in one language. */
export interface NavBundle {
  name: string;
  homeLabel: string;
  links: NavLink[];
  explore: { label: string; links: ExternalLink[] };
  source: {
    menu: string;
    label: string;
    short: string;
    href: string;
    home: ExternalLink & { short: string };
    log: ExternalLink & { short: string };
  };
  look: { heading: string; night: string; morning: string; toNight: string; toMorning: string };
  party: { heading: string; name: string; hint: string };
  languages: { heading: string; other: string; otherShort: string; otherLabel: string; otherLang: string };
  welcomeAgain: string;
  thisPage: { heading: string; top: string; bottom: string; risk: string };
  words: { menu: string; openMenu: string; closeMenu: string; home: string };
}

interface SiteNavProps {
  /** The menu's words in English and in Spanish; the page's address picks one. */
  bundles: Record<Locale, NavBundle>;
  /** The Support button and its window, drawn on the server. */
  support: ReactNode;
}

function PlaceIcon({ icon }: { icon?: ExternalLink["icon"] }) {
  const Icon = icon ? placeIcons[icon] : ArrowUpRightIcon;
  return <Icon weight="duotone" aria-hidden="true" className="nav-icon" />;
}

interface NavDropdownProps {
  id: string;
  label: string;
  icon: typeof CompassIcon;
  links: ExternalLink[];
  /** Hide the word on narrower desktops, keeping the picture. */
  labelClass?: string;
}

/**
 * A pill that opens a small menu of links to his pages elsewhere (Explore, GitHub).
 * It closes on a click elsewhere, on Escape (the keyboard goes back to the pill),
 * and when the keyboard leaves it.
 */
function NavDropdown({ id, label, icon: Icon, links, labelClass }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="nav-explore">
      <button
        type="button"
        className="nav-pill"
        aria-expanded={open}
        aria-controls={id}
        aria-label={labelClass ? label : undefined}
        title={label}
        onClick={() => setOpen((was) => !was)}
      >
        <Icon weight="duotone" aria-hidden="true" className="nav-icon" />
        <span className={labelClass}>{label}</span>
        <CaretDownIcon weight="bold" aria-hidden="true" className={open ? "nav-caret nav-caret-open" : "nav-caret"} />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.ul
            id={id}
            className="nav-menu glass"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            onBlur={(event) => {
              if (!ref.current?.contains(event.relatedTarget as Node)) setOpen(false);
            }}
          >
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} rel="noopener noreferrer" className="nav-menu-link" onClick={() => setOpen(false)}>
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
  );
}

/**
 * The menu, fixed at the top of the screen on frosted glass, in the way the
 * Find Your Feathers and iamoneself sites lay theirs out: his name and the home
 * mark, the three pages as pills with their pictures (a glowing pill slides to
 * the page you are on), Explore for his own pages elsewhere, GitHub (his home
 * there and this site's source), the night and morning looks, PARTY_MODE, and Support.
 *
 * On a narrow screen the pages fold into a menu button that opens a panel from
 * the right. That panel is the browser's own modal dialog, so Tab stays inside
 * it and Escape closes it.
 */
export default function SiteNav({ bundles, support }: SiteNavProps) {
  const pathname = usePathname();
  const here = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const locale = useLocale();
  const { name, homeLabel, explore, source, look, party, languages, welcomeAgain, thisPage, words } = bundles[locale];
  const links = bundles[locale].links.map((link) => ({ ...link, href: localizeHref(locale, link.href) }));
  const homeHref = localizeHref(locale, "/");
  const twin = twinHref(here);
  const [scrolled, setScrolled] = useState(false);
  /* The panel is open on the page it was opened on; moving to another page closes it by itself. */
  const [openOn, setOpenOn] = useState<string | null>(null);
  const drawerOpen = openOn === pathname;
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  /*
   * While the panel is open: the page behind holds still, the keyboard starts on its first link,
   * Escape closes it, and Tab goes round inside it. On closing, the keyboard returns to the menu button.
   */
  useEffect(() => {
    if (!drawerOpen) return;
    const panel = panelRef.current;
    document.documentElement.classList.add("drawer-open");
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []).filter((el) => el.offsetParent !== null);
    const first = window.setTimeout(() => focusables()[1]?.focus({ preventScroll: true }), 60);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpenOn(null);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const burger = burgerRef.current;
    return () => {
      window.clearTimeout(first);
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("drawer-open");
      burger?.focus({ preventScroll: true });
    };
  }, [drawerOpen]);

  const onHome = (event: MouseEvent) => {
    if (here === homeHref) {
      event.preventDefault();
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });
    }
  };

  const openDrawer = () => setOpenOn(pathname);
  const closeDrawer = () => setOpenOn(null);

  /* From the phone menu: close it, then go to the top or the end of the page. */
  const jumpPage = (where: "top" | "bottom") => {
    closeDrawer();
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: where === "top" ? 0 : document.documentElement.scrollHeight, behavior: still ? "auto" : "smooth" });
  };

  return (
    <header className={scrolled ? "nav-bar nav-bar-scrolled" : "nav-bar"}>
      <div className="frame nav-inner">
        <Link href={homeHref} className="brand nav-brand" aria-label={words.home} onClick={onHome}>
          <span className="nav-brand-word">
            {name}
            <span className="dot dot-breathe" aria-hidden="true" />
          </span>
          <HouseIcon weight="duotone" aria-hidden="true" className="nav-brand-home" />
          <span className="nav-brand-here" aria-hidden="true">
            {here === homeHref ? homeLabel : links.find((l) => l.href === here)?.label ?? ""}
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

          <NavDropdown id="nav-explore-menu" label={explore.label} icon={CompassIcon} links={explore.links} />
          <NavDropdown
            id="nav-github-menu"
            label={source.menu}
            icon={GithubLogoIcon}
            labelClass="nav-source-word"
            links={[source.home, { label: source.label, href: source.href, icon: "code" }, source.log]}
          />
        </nav>

        <div className="nav-tools">
          {twin !== here ? (
            <Link
              href={twin}
              hrefLang={languages.otherLang}
              lang={languages.otherLang}
              className="tool-button lang-toggle"
              aria-label={languages.otherLabel}
              title={languages.otherLabel}
            >
              <TranslateIcon weight="duotone" aria-hidden="true" />
              <span className="lang-word">{languages.otherShort}</span>
            </Link>
          ) : null}
          <LookToggle words={look} />
          <span className="nav-party-wide">
            <PartyToggle name={party.name} hint={party.hint} />
          </span>
          {support}
          <button
            ref={burgerRef}
            type="button"
            className="nav-burger"
            onClick={openDrawer}
            aria-label={words.openMenu}
            aria-haspopup="dialog"
            aria-expanded={drawerOpen}
            aria-controls="nav-drawer"
          >
            <ListIcon weight="duotone" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/*
        * The panel waits just off the right edge of the screen and slides in from there. It is not
        * the browser's dialog: some phones drew that from the left for a moment before moving it.
        */}
      <div id="nav-drawer" className={drawerOpen ? "drawer drawer-open" : "drawer"} inert={!drawerOpen}>
        <div className="drawer-scrim" onClick={closeDrawer} aria-hidden="true" />
        <div ref={panelRef} className="drawer-panel glass" role="dialog" aria-modal="true" aria-label={words.menu}>
          <div className="drawer-head">
            <span className="drawer-heading">{words.menu}</span>
            <button type="button" className="drawer-close" onClick={closeDrawer} aria-label={words.closeMenu}>
              <XIcon weight="bold" aria-hidden="true" />
            </button>
          </div>

          <ul className="drawer-list">
            <li>
              <Link href={homeHref} className="drawer-link" aria-current={here === homeHref ? "page" : undefined} onClick={onHome}>
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

          {twin !== here ? (
            <>
              <p className="drawer-heading drawer-sub">{languages.heading}</p>
              <ul className="drawer-list">
                <li>
                  <Link href={twin} hrefLang={languages.otherLang} lang={languages.otherLang} className="drawer-link">
                    <TranslateIcon weight="duotone" aria-hidden="true" className="nav-icon" />
                    <span>{languages.other}</span>
                  </Link>
                </li>
              </ul>
            </>
          ) : null}

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

          <p className="drawer-heading drawer-sub">{thisPage.heading}</p>
          <ul className="drawer-list">
            <li>
              <button type="button" className="drawer-link drawer-button" onClick={() => jumpPage("top")}>
                <ArrowUpIcon weight="duotone" aria-hidden="true" className="nav-icon" />
                <span>{thisPage.top}</span>
              </button>
            </li>
            <li>
              <button type="button" className="drawer-link drawer-button" onClick={() => jumpPage("bottom")}>
                <ArrowDownIcon weight="duotone" aria-hidden="true" className="nav-icon" />
                <span>{thisPage.bottom}</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="drawer-link drawer-button"
                onClick={() => {
                  closeDrawer();
                  openRisk();
                }}
              >
                <ShieldCheckIcon weight="duotone" aria-hidden="true" className="nav-icon" />
                <span>{thisPage.risk}</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="drawer-link drawer-button"
                onClick={() => {
                  closeDrawer();
                  window.dispatchEvent(new Event("tmade:arrival"));
                }}
              >
                <HandWavingIcon weight="duotone" aria-hidden="true" className="nav-icon" />
                <span>{welcomeAgain}</span>
              </button>
            </li>
          </ul>

          <ul className="drawer-list drawer-foot">
            <li>
              <a href={source.home.href} rel="noopener noreferrer" className="drawer-link">
                <GithubLogoIcon weight="duotone" aria-hidden="true" className="nav-icon" />
                <span>{source.home.label}</span>
              </a>
            </li>
            <li>
              <a href={source.href} rel="noopener noreferrer" className="drawer-link">
                <CodeIcon weight="duotone" aria-hidden="true" className="nav-icon" />
                <span>{source.label}</span>
              </a>
            </li>
            <li>
              <a href={source.log.href} rel="noopener noreferrer" className="drawer-link">
                <PlanetIcon weight="duotone" aria-hidden="true" className="nav-icon" />
                <span>{source.log.label}</span>
              </a>
            </li>
          </ul>
          <ScrollJump labels={{ bottom: thisPage.bottom, top: thisPage.top }} />
        </div>
      </div>
    </header>
  );
}
