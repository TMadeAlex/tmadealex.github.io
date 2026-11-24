"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import { ArrowRightIcon, ShieldCheckIcon, XIcon } from "@phosphor-icons/react";
import { Quote } from "@/components/Cite";
import ScrollJump from "@/components/chrome/ScrollJump";
import type { Quote as QuoteData } from "@/data/sources";
import { useLocale } from "@/i18n/client";
import { localizeHref } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

export interface RiskWords {
  title: string;
  lead: string;
  his: QuoteData;
  plain: string;
  rule: QuoteData;
  line: string;
  more: string;
  close: string;
  jump: { bottom: string; top: string };
}

/** Opens the risk window from anywhere: the status bar, the phone menu, the end of a page. */
export function openRisk() {
  window.dispatchEvent(new Event("tmade:risk"));
}

/**
 * The risk window: what "Not financial advice" opens. His own disclaimer, word
 * for word, the site's plain note, his rule about stops, and a way to the
 * trading page. The browser's own modal dialog: Escape closes it, Tab stays
 * inside, and a click on the dimmed page around it closes it too.
 */
export default function RiskWindow({ words }: { words: Record<Locale, RiskWords> }) {
  const locale = useLocale();
  const t = words[locale];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("tmade:risk", onOpen);
    return () => window.removeEventListener("tmade:risk", onOpen);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
  }, [open]);

  const close = () => {
    dialogRef.current?.close();
    setOpen(false);
  };

  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  if (!open) return null;

  return (
    <dialog ref={dialogRef} className="support risk-window" aria-labelledby="risk-window-title" onClick={onDialogClick} onClose={() => setOpen(false)}>
      <div className="support-card">
        <button type="button" onClick={close} aria-label={t.close} className="support-close">
          <XIcon weight="bold" aria-hidden="true" className="h-5 w-5" />
        </button>
        <p className="risk-window-icon" aria-hidden="true">
          <ShieldCheckIcon weight="duotone" />
        </p>
        <h2 id="risk-window-title" className="support-title">
          {t.title}
          <span className="dot" aria-hidden="true" />
        </h2>
        <p className="support-lead">{t.lead}</p>
        <div className="risk-window-body">
          <Quote quote={t.his} />
          <p className="risk-plain">{t.plain}</p>
          <Quote quote={t.rule} className="risk-rule" />
          <p className="risk-plain">{t.line}</p>
        </div>
        <p className="risk-window-more">
          <Link href={localizeHref(locale, "/trading/#risk")} className="button button-glass" onClick={close}>
            {t.more}
            <ArrowRightIcon aria-hidden="true" className="button-icon" />
          </Link>
        </p>
      </div>
      <ScrollJump labels={t.jump} />
    </dialog>
  );
}
