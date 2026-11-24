"use client";

import type { MouseEvent } from "react";
import { ConfettiIcon } from "@phosphor-icons/react";
import { toggleParty } from "@/components/chrome/Providers";
import { useParty } from "@/lib/use-media";

interface PartyToggleProps {
  /** "PARTY_MODE" */
  name: string;
  /** The keyboard shortcut, shown as a hint. */
  hint: string;
}

/** The PARTY_MODE switch: a power user's toy. It says whether it is on, and Shift + P does the same from anywhere. */
export default function PartyToggle({ name, hint }: PartyToggleProps) {
  const on = useParty();

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    toggleParty({ x: box.left + box.width / 2, y: box.top + box.height / 2 });
  };

  return (
    <button
      type="button"
      className={on ? "tool-button party-toggle party-toggle-on" : "tool-button party-toggle"}
      onClick={onClick}
      aria-pressed={on}
      title={`${name} (${hint})`}
    >
      <ConfettiIcon weight="duotone" aria-hidden="true" className="party-icon" />
      <span className="party-word">{name}</span>
      <span className="party-light" aria-hidden="true" />
    </button>
  );
}
