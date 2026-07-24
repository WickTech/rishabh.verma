"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-reactive node-network background with brand-tinted splash ripples.
 * Lighter than WebGL (2D canvas, no GPU sim), on-brand for the AI / systems
 * work. Reads --net-line / --net-hi so it re-tints on theme change.
 *
 * Splash: moving the pointer sheds subtle expanding rings; clicking fires a
 * bigger burst that shoves nearby nodes outward — the "fluid splash" feel
 * without a WebGL fluid simulation.
 *
 * Safeguards: disabled under prefers-reduced-motion; the RAF loop pauses when
 * the tab is hidden; node count scales down on smaller screens.
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
    let ripples: { x: number; y: number; born: number; life: number; max: number }[] = [];
    let raf = 0;
    let running = true;
    let resizeTimer: ReturnType<typeof setTimeout>;
    const mouse = { x: -9999, y: -9999 };
    const lastSplash = { x: -9999, y: -9999, t: 0 };
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
    const hiRGBA = (a: number) => `rgba(${hi[0]},${hi[1]},${hi[2]},${a})`;

    function splash(px: number, py: number, strength: number) {
      ripples.push({
        x: px,
        y: py,
        born: performance.now(),
        life: 700 + strength * 500,
        max: (60 + strength * 120) * dpr,
      });
      if (ripples.length > 40) ripples.shift();
      // Shove nearby nodes outward — the "splash force".
      const R = (120 + strength * 120) * dpr;
      for (const p of pts) {
        const dx = p.x - px;
        const dy = p.y - py;
        const d = Math.hypot(dx, dy) || 1;
        if (d < R) {
          const f = ((1 - d / R) * strength * 1.6) / d;
          p.vx += dx * f;
          p.vy += dy * f;
        }
      }
    }

    function draw() {
      x!.clearRect(0, 0, w, h);
      const R = 140 * dpr;
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        // gentle damping so splash-shoved nodes settle back to a calm drift
        p.vx *= 0.99;
        p.vy *= 0.99;
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
        x!.fillStyle = near ? hiRGBA(0.9) : tint(0.55);
        x!.fill();
        if (near) {
          x!.strokeStyle = hiRGBA(0.35 * (1 - dm / (180 * dpr)));
          x!.lineWidth = dpr * 0.7;
          x!.beginPath();
          x!.moveTo(p.x, p.y);
          x!.lineTo(mouse.x, mouse.y);
          x!.stroke();
        }
      }
      // splash ripples — expanding, fading brand-tinted rings
      const now = performance.now();
      ripples = ripples.filter((rp) => now - rp.born < rp.life);
      for (const rp of ripples) {
        const t = (now - rp.born) / rp.life; // 0..1
        const rad = rp.max * (1 - Math.pow(1 - t, 2)); // ease-out expand
        const alpha = (1 - t) * 0.5;
        x!.strokeStyle = hiRGBA(alpha);
        x!.lineWidth = dpr * (1.4 * (1 - t) + 0.3);
        x!.beginPath();
        x!.arc(rp.x, rp.y, rad, 0, 7);
        x!.stroke();
      }
      if (running) raf = requestAnimationFrame(draw);
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
      // shed a subtle ripple when the pointer travels far enough, throttled
      const now = performance.now();
      const moved = Math.hypot(mouse.x - lastSplash.x, mouse.y - lastSplash.y);
      if (moved > 90 * dpr && now - lastSplash.t > 120) {
        splash(mouse.x, mouse.y, 0.35);
        lastSplash.x = mouse.x;
        lastSplash.y = mouse.y;
        lastSplash.t = now;
      }
    };
    const onOut = () => {
      mouse.x = mouse.y = -9999;
    };
    const onDown = (e: MouseEvent) => splash(e.clientX * dpr, e.clientY * dpr, 1);
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(size, 200);
    };
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    refresh();
    size();
    draw();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("themechange", refresh);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("themechange", refresh);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas id="net" ref={ref} aria-hidden />;
}
