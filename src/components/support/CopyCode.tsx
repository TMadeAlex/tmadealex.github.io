"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyCodeProps {
  code: string;
  copyLabel: string;
  copiedLabel: string;
}

/** His code, large, with a button that copies it. Where copying is not allowed, the code is marked so it can be copied by hand. */
export default function CopyCode({ code, copyLabel, copiedLabel }: CopyCodeProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      const node = codeRef.current;
      if (!node) return;
      const range = document.createRange();
      range.selectNodeContents(node);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  return (
    <div className="support-code">
      <code ref={codeRef} className="support-code-word">
        {code}
      </code>
      <button type="button" onClick={copy} className="button button-line support-action">
        {copied ? (
          <Check aria-hidden="true" className="button-icon" />
        ) : (
          <Copy aria-hidden="true" className="button-icon" />
        )}
        <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
      </button>
    </div>
  );
}
