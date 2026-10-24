"use client";

import { useEffect, useState } from "react";

/**
 * Rotating hero word. Every word is in the HTML (stacked in one grid cell, so
 * the box reserves the tallest/widest word and nothing shifts); only the active
 * one is visible. The first word is active on the server, so it reads without
 * JS. Rotation is skipped for reduced-motion and paused in hidden tabs.
 */
export function RotatingWord({ words }: { words: readonly string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id: number | undefined;
    const start = () => {
      id = window.setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    };
    const stop = () => {
      if (id !== undefined) window.clearInterval(id);
      id = undefined;
    };
    const onVis = () => (document.hidden ? stop() : start());
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [words.length]);

  return (
    <span className="rotor" aria-hidden>
      {words.map((w, n) => (
        <span key={w} className={n === i ? "on" : undefined}>
          {w}
        </span>
      ))}
    </span>
  );
}
