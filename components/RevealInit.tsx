"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal driver — ports the design's vanilla IntersectionObserver.
 * Any element with class "reveal" fades/slides in once when it enters view.
 * Includes the design's failsafe so content is never left stuck invisible.
 */
export function RevealInit() {
  useEffect(() => {
    const reveals = [...document.querySelectorAll<HTMLElement>(".reveal")];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    reveals.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i, 4) * 60 + "ms";
      io.observe(el);
    });

    const forceIn = () =>
      reveals.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("in");
      });
    forceIn();
    const onLoad = () => {
      forceIn();
      setTimeout(() => reveals.forEach((el) => el.classList.add("in")), 1200);
    };
    window.addEventListener("load", onLoad);
    return () => {
      io.disconnect();
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return null;
}
