"use client";

import { useSyncExternalStore } from "react";
import { readLook, readParty, subscribeLook } from "@/lib/look";

/** Whether a media query matches, kept up to date. False before the page reaches the browser. */
export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True when the visitor's device asks for less motion. */
export function useStill(): boolean {
  return useMedia("(prefers-reduced-motion: reduce)");
}

/** True for a mouse or trackpad that can hover; false for touch. */
export function useFinePointer(): boolean {
  return useMedia("(hover: hover) and (pointer: fine)");
}

/** PARTY_MODE, kept up to date. Off before the page reaches the browser. */
export function useParty(): boolean {
  return useSyncExternalStore(subscribeLook, readParty, () => false);
}

/** The look, kept up to date. Night before the page reaches the browser. */
export function useLook() {
  return useSyncExternalStore(subscribeLook, readLook, () => "night" as const);
}
