"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const KEY = "rv-boot";
const MS = 1100;

/**
 * One-time pixel boot screen per browser session. Skipped for reduced-motion
 * and when storage is unavailable. Renders nothing on the server, so it never
 * delays first paint of the real page.
 */
export function BootScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
    } catch {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    const id = window.setTimeout(() => setShow(false), MS);
    return () => window.clearTimeout(id);
  }, []);

  if (!show) return null;
  return (
    <div className="boot" aria-hidden>
      <p className="boot-name">{profile.name}</p>
      <div className="boot-bar">
        <span />
      </div>
    </div>
  );
}
