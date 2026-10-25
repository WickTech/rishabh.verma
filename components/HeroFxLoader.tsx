"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroFx = dynamic(() => import("./HeroFx"), { ssr: false });

/** Loads the canvas effects after first paint so they never touch LCP. */
export function HeroFxLoader() {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setGo(true), 800);
    return () => window.clearTimeout(id);
  }, []);
  return go ? <HeroFx /> : null;
}
