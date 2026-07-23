"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-reactive node-network background — replaces the old three.js sphere.
 * Lighter (2D canvas, no WebGL), on-brand for the AI / systems / RAG work.
 * Reads the --net-line / --net-hi CSS vars so it re-tints on theme change;
 * the toggle dispatches a "themechange" event that we listen for.
 */
export function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = ref.current;
    if (!c) return;
    const x = c.getContext("2d");
    if (!x) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    let raf = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;
    const mouse = { x: -9999, y: -9999 };
    let line: number[] = [160, 130, 255];
    let hi: number[] = [76, 214, 255];

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c!.width = window.innerWidth * dpr;
      h = c!.height = window.innerHeight * dpr;
      c!.style.width = window.innerWidth + "px";
      c!.style.height = window.innerHeight + "px";
      const n = Math.min(70, Math.floor(window.innerWidth / 22));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18 * dpr,
        vy: (Math.random() - 0.5) * 0.18 * dpr,
        r: (Math.random() * 1.4 + 0.6) * dpr,
      }));
    }

    function refresh() {
      const cs = getComputedStyle(document.documentElement);
      const p = (s: string) => s.trim().split(",").map(Number);
      const l = cs.getPropertyValue("--net-line");
      const hh = cs.getPropertyValue("--net-hi");
      if (l) line = p(l);
      if (hh) hi = p(hh);
    }

    const tint = (a: number) => `rgba(${line[0]},${line[1]},${line[2]},${a})`;

    function draw() {
      x!.clearRect(0, 0, w, h);
      const R = 140 * dpr;
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < R) {
            x!.strokeStyle = tint(0.12 * (1 - d / R));
            x!.lineWidth = dpr * 0.6;
            x!.beginPath();
            x!.moveTo(a.x, a.y);
            x!.lineTo(b.x, b.y);
            x!.stroke();
          }
        }
      }
      for (const p of pts) {
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const near = dm < 180 * dpr;
        x!.beginPath();
        x!.arc(p.x, p.y, p.r * (near ? 1.8 : 1), 0, 7);
        x!.fillStyle = near ? `rgba(${hi[0]},${hi[1]},${hi[2]},.9)` : tint(0.55);
        x!.fill();
        if (near) {
          x!.strokeStyle = `rgba(${hi[0]},${hi[1]},${hi[2]},${
            0.35 * (1 - dm / (180 * dpr))
          })`;
          x!.lineWidth = dpr * 0.7;
          x!.beginPath();
          x!.moveTo(p.x, p.y);
          x!.lineTo(mouse.x, mouse.y);
          x!.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
    };
    const onOut = () => {
      mouse.x = mouse.y = -9999;
    };
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(size, 200);
    };

    refresh();
    size();
    draw();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("resize", onResize);
    window.addEventListener("themechange", refresh);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("themechange", refresh);
    };
  }, []);

  return <canvas id="net" ref={ref} aria-hidden />;
}
