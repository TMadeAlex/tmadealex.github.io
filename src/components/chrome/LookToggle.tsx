"use client";

import type { MouseEvent } from "react";
import { MoonStarsIcon, SunHorizonIcon } from "@phosphor-icons/react";
import { readLook, setLook } from "@/lib/look";
import { useLook } from "@/lib/use-media";

interface LookToggleProps {
  words: { night: string; morning: string; toNight: string; toMorning: string };
}

/**
 * Night or morning. Both pictures are drawn and the stylesheet shows the one
 * for the look the page is in, so the button is right from the first moment.
 * Where the browser can, the new look opens from the button like a camera's iris.
 */
export default function LookToggle({ words }: LookToggleProps) {
  const look = useLook();
  const label = look === "night" ? words.toMorning : words.toNight;

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    setLook(readLook() === "night" ? "morning" : "night", { x: box.left + box.width / 2, y: box.top + box.height / 2 });
  };

  return (
    <button type="button" className="tool-button look-toggle" onClick={onClick} aria-label={label} title={label}>
      <MoonStarsIcon weight="duotone" aria-hidden="true" className="look-icon look-icon-night" />
      <SunHorizonIcon weight="duotone" aria-hidden="true" className="look-icon look-icon-morning" />
    </button>
  );
}
