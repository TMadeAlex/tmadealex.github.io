"use client";

import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { HandHeart, X } from "lucide-react";

interface SupportButtonProps {
  /** The button's word ("Support"). */
  label: string;
  /** The close button's word, for a screen reader. */
  closeLabel: string;
  /** The id of the window's title, so a screen reader names the window by it. */
  titleId: string;
  /** What the window holds (SupportWindow), drawn on the server. */
  children: ReactNode;
}

/**
 * The Support button at the top of every page, and the window it opens. The
 * window is the browser's own modal dialog: while it is open the page behind it
 * cannot be reached, Tab stays inside it, and Escape closes it. A click on the
 * dimmed page around it closes it too.
 */
export default function SupportButton({ label, closeLabel, titleId, children }: SupportButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  /* The window fills its dialog edge to edge, so a click whose target is the dialog itself landed outside it. */
  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <>
      <button type="button" onClick={open} aria-haspopup="dialog" className="support-open">
        <HandHeart aria-hidden="true" className="support-open-icon" strokeWidth={1.75} />
        {label}
      </button>
      <dialog ref={dialogRef} aria-labelledby={titleId} onClick={onDialogClick} className="support">
        <div className="support-card">
          <button type="button" onClick={close} aria-label={closeLabel} className="support-close">
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
          {children}
        </div>
      </dialog>
    </>
  );
}
