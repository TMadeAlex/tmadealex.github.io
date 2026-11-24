"use client";

import { useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";

/** The panel's small words, from ui in site.ts. */
export interface SupportWords {
  ownAddress: string;
  network: string;
  copyAddress: string;
  addressCopied: string;
  supportHow: string;
}

interface SupportPanelProps {
  address: string;
  network: string;
  note: string;
  words: SupportWords;
}

/**
 * The support panel shows the owner's own wallet address, the network it is
 * on, a button that copies the address, and a short plain note. That is all it
 * does. It does not connect to a wallet, hold anything, take a payment, mint
 * anything or load any script from elsewhere. Someone who wants to send
 * something does it from their own wallet.
 *
 * It shows nothing unless both the address and the network are given.
 */
export default function SupportPanel({ address, network, note, words }: SupportPanelProps) {
  const [copied, setCopied] = useState(false);
  const addressRef = useRef<HTMLElement>(null);
  const timer = useRef<number | undefined>(undefined);

  if (address === "" || network === "") return null;

  const selectAddress = () => {
    const node = addressRef.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      /* Copying was not allowed: mark the address so it can be copied by hand. */
      selectAddress();
    }
  };

  return (
    <div className="max-w-[40rem]">
      {note ? <p className="text-xl leading-relaxed">{note}</p> : null}

      <div className={`rounded-md border border-line bg-ground p-4 sm:p-5 ${note ? "mt-5" : ""}`}>
        <p className="text-sm text-ink-soft">{words.ownAddress}</p>
        <code ref={addressRef} className="mt-2 block font-mono text-[0.9375rem] leading-relaxed break-all">
          {address}
        </code>
        <p className="mt-2 text-sm text-ink-soft">
          {words.network}: <span className="text-ink">{network}</span>
        </p>
        <button
          type="button"
          onClick={copy}
          className="mt-4 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-accent px-4 text-[0.9375rem] font-medium text-accent hover:text-ink"
        >
          {copied ? <CheckIcon weight="bold" aria-hidden="true" className="h-4 w-4" /> : <CopyIcon weight="duotone" aria-hidden="true" className="h-4 w-4" />}
          <span aria-live="polite">{copied ? words.addressCopied : words.copyAddress}</span>
        </button>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-soft">{words.supportHow}</p>
    </div>
  );
}
