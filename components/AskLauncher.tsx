"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// The panel (and its fetch/stream code) loads on first open only.
const AskPanel = dynamic(() => import("./AskPanel").then((m) => m.AskPanel), {
  ssr: false,
});

export const ASK_OPEN_EVENT = "ask:open";

/** Floating button. Anything on the page can open the panel via `ASK_OPEN_EVENT`. */
export function AskLauncher() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fab = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onOpen = () => {
      setMounted(true);
      setOpen(true);
    };
    window.addEventListener(ASK_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(ASK_OPEN_EVENT, onOpen);
  }, []);

  const close = () => {
    setOpen(false);
    fab.current?.focus();
  };

  return (
    <>
      <button
        ref={fab}
        type="button"
        className="ask-fab"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => window.dispatchEvent(new Event(ASK_OPEN_EVENT))}
      >
        Ask my portfolio
      </button>
      {mounted && <AskPanel open={open} onClose={close} />}
    </>
  );
}
