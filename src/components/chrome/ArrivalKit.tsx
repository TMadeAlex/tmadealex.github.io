"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ApertureIcon,
  ChartLineUpIcon,
  ConfettiIcon,
  HouseIcon,
  MoonStarsIcon,
  SunHorizonIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import type { Arrival } from "@/data/site";
import { delocalizeHref, localeFromPath, localizeHref } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { readLook, readParty, setLook } from "@/lib/look";
import { toggleParty } from "@/components/chrome/Providers";

const KEY = "tmadealex-arrival";
const STEPS = 3;
const doorIcons = { trading: ChartLineUpIcon, photography: ApertureIcon, watch: YoutubeLogoIcon, stay: HouseIcon };

function arrivedBefore(): boolean | null {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return null;
  }
}

function remember() {
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    /* A private window may refuse; the welcome then shows again next time. */
  }
}

/**
 * The arrival: on a first visit, a short welcome, one question at a time.
 * Language first (English is the default, Spanish one tap away), so everything
 * after it reads in the visitor's own language; then the look (night or
 * morning, PARTY_MODE); then where to go first. Every choice stays in this
 * browser. It opens again from the menu ("Welcome again"), or with
 * ?arrival=again on any address. Escape, or Skip, closes it at any step.
 *
 * Built on the browser's own modal dialog, so Tab stays inside it. Nothing is
 * drawn for a visitor who has been before, or for a browser that keeps nothing.
 */
export default function ArrivalKit({ words }: { words: Record<Locale, Arrival> }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState<Locale>("en");
  const [look, setLookChoice] = useState<"night" | "morning">("night");
  const [party, setPartyChoice] = useState(false);

  const t = words[lang];

  useEffect(() => {
    const start = () => {
      setLang(localeFromPath(window.location.pathname));
      setLookChoice(readLook());
      setPartyChoice(readParty());
      setStep(0);
      setOpen(true);
    };
    const again = new URLSearchParams(window.location.search).get("arrival") === "again";
    const timer = window.setTimeout(() => {
      if (again || arrivedBefore() === false) start();
    }, 700);
    window.addEventListener("tmade:arrival", start);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("tmade:arrival", start);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLInputElement>("input:checked")?.focus();
    }
    if (!open && dialog?.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (open && step > 0) headingRef.current?.focus();
  }, [step, open]);

  const here = pathname.endsWith("/") ? pathname : `${pathname}/`;

  /** Where an internal address leads in the chosen language. */
  const inLang = (href: string) => (lang === "es" ? localizeHref("es", href) : delocalizeHref(href));

  const finish = (door?: Arrival["doors"][number]) => {
    remember();
    setOpen(false);
    if (door && door.href.startsWith("http")) {
      window.location.assign(door.href);
      return;
    }
    const target = door ? inLang(door.href) : inLang(here);
    if (target !== here) router.push(target);
    else if (door?.id === "stay") window.scrollTo({ top: 0 });
  };

  const chooseLook = (next: "night" | "morning") => {
    setLookChoice(next);
    if (readLook() !== next) setLook(next);
  };

  const chooseParty = (on: boolean) => {
    setPartyChoice(on);
    if (readParty() !== on) toggleParty({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (step < STEPS - 1) setStep(step + 1);
    else finish();
  };

  if (!open) return null;

  const headings = [t.welcome, t.look, t.go];

  return (
    <dialog
      ref={dialogRef}
      className="arrival"
      aria-labelledby="arrival-title"
      lang={lang}
      onCancel={(event) => {
        event.preventDefault();
        finish();
      }}
    >
      <form className="arrival-card glass" onSubmit={onSubmit}>
        <div className="arrival-top">
          <span className="arrival-mark" aria-hidden="true">
            <span />
          </span>
          <ol className="arrival-steps" aria-label={t.step.replace("{n}", String(step + 1)).replace("{total}", String(STEPS))}>
            {Array.from({ length: STEPS }, (_, i) => (
              <li key={i} data-state={i < step ? "done" : i === step ? "now" : "later"} />
            ))}
          </ol>
          <button type="button" className="arrival-skip" onClick={() => finish()}>
            {t.skip}
          </button>
        </div>

        <div className="arrival-stage" key={`${step}-${lang}`}>
          <h2 id="arrival-title" ref={headingRef} tabIndex={-1} className="arrival-title">
            {headings[step].title}
            {step === 0 ? <span className="dot" aria-hidden="true" /> : null}
          </h2>
          <p className="arrival-sub">{headings[step].sub}</p>

          {step === 0 ? (
            <fieldset className="arrival-choices arrival-two">
              <legend className="sr-only">{t.label}</legend>
              {(["en", "es"] as const).map((code) => {
                const door = code === "en" ? t.english : t.spanish;
                return (
                  <label key={code} className="arrival-choice" lang={code}>
                    <input className="sr-only" type="radio" name="arrival-lang" checked={lang === code} onChange={() => setLang(code)} />
                    <span className="arrival-badge">{code.toUpperCase()}</span>
                    <span className="arrival-name">{door.name}</span>
                    <span className="arrival-line">{door.line}</span>
                  </label>
                );
              })}
            </fieldset>
          ) : null}

          {step === 1 ? (
            <>
              <fieldset className="arrival-choices arrival-two">
                <legend className="sr-only">{t.look.title}</legend>
                <label className="arrival-choice">
                  <input className="sr-only" type="radio" name="arrival-look" checked={look === "night"} onChange={() => chooseLook("night")} />
                  <MoonStarsIcon weight="duotone" aria-hidden="true" className="arrival-icon" />
                  <span className="arrival-name">{t.night}</span>
                </label>
                <label className="arrival-choice">
                  <input className="sr-only" type="radio" name="arrival-look" checked={look === "morning"} onChange={() => chooseLook("morning")} />
                  <SunHorizonIcon weight="duotone" aria-hidden="true" className="arrival-icon" />
                  <span className="arrival-name">{t.morning}</span>
                </label>
              </fieldset>
              <label className="arrival-switch">
                <input type="checkbox" className="sr-only" checked={party} onChange={(event) => chooseParty(event.target.checked)} />
                <ConfettiIcon weight="duotone" aria-hidden="true" className="arrival-icon" />
                <span className="arrival-name arrival-mono">{t.party}</span>
                <span className="arrival-toggle" aria-hidden="true">
                  <span />
                </span>
              </label>
            </>
          ) : null}

          {step === 2 ? (
            <ul className="arrival-doors">
              {t.doors.map((door) => {
                const Icon = doorIcons[door.id];
                return (
                  <li key={door.id}>
                    <button type="button" className="arrival-door" onClick={() => finish(door)}>
                      <Icon weight="duotone" aria-hidden="true" className="arrival-icon" />
                      <span className="arrival-name">{door.title}</span>
                      <span className="arrival-line">{door.line}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div className="arrival-foot">
          {step > 0 ? (
            <button type="button" className="button button-glass" onClick={() => setStep(step - 1)}>
              {t.back}
            </button>
          ) : (
            <span />
          )}
          {step < STEPS - 1 ? (
            <button type="submit" className="button button-solid">
              {t.next}
            </button>
          ) : null}
        </div>
        <p className="arrival-small">{t.small}</p>
      </form>
    </dialog>
  );
}
