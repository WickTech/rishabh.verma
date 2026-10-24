"use client";

import { ASK_OPEN_EVENT } from "./AskLauncher";

export function AskHeroButton() {
  return (
    <button
      type="button"
      className="btn-ghost"
      aria-haspopup="dialog"
      onClick={() => window.dispatchEvent(new Event(ASK_OPEN_EVENT))}
    >
      Ask my portfolio
    </button>
  );
}
