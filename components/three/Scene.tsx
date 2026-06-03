"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * Mount point for the persistent, scroll-driven 3D background.
 *
 * The WebGL canvas (KineticCanvas) is heavy, so it is loaded with
 * `next/dynamic` + `ssr: false` — Three.js never touches the server bundle
 * or the initial HTML, keeping LCP/SSR fast. We additionally gate it on:
 *   - the client having mounted (no hydration mismatch),
 *   - `prefers-reduced-motion` being off,
 *   - WebGL being available.
 * When any gate fails we render a calm static gradient instead, so the
 * deep-space atmosphere is preserved without animation.
 */
const KineticCanvas = dynamic(() => import("./KineticCanvas"), { ssr: false });

export function Scene() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Cheap WebGL capability probe.
    let ok = false;
    try {
      const c = document.createElement("canvas");
      ok = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      ok = false;
    }
    setEnabled(ok);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        // Static fallback glow (also visible for the split-second before mount).
        background:
          "radial-gradient(45vw 45vh at 65% 30%, rgba(209,188,255,0.06), transparent 70%)",
      }}
    >
      {enabled && <KineticCanvas />}
    </div>
  );
}
