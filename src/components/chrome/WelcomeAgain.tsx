"use client";

import { HandWavingIcon } from "@phosphor-icons/react";

interface WelcomeAgainProps {
  /** The full words ("Welcome again"), said to a screen reader and shown where there is room. */
  label: string;
  /** Optional shorter words shown in tight places ("Welcome"). */
  short?: string;
  className?: string;
}

/**
 * Opens the arrival (the welcome of a first visit) again, from anywhere: the
 * language, the look and the first door can be chosen again without clearing
 * anything in the browser.
 */
export default function WelcomeAgain({ label, short, className = "" }: WelcomeAgainProps) {
  return (
    <button
      type="button"
      className={`welcome-again ${className}`}
      onClick={() => window.dispatchEvent(new Event("tmade:arrival"))}
      aria-label={label}
      title={label}
    >
      <HandWavingIcon weight="duotone" aria-hidden="true" />
      <span className="welcome-again-word">{short ?? label}</span>
    </button>
  );
}
