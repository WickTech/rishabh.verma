"use client";

import { useEffect, useRef } from "react";

const CELL = 10;
const RING_SPEED = 0.38; // px per ms
const RING_MAX = 460;
const RING_BAND = 40;

/**
 * Hero background effects on one canvas: a trail of square pixels that follows
 * the pointer, and sonar rings that light up the dot grid on click and every
 * few seconds. The loop only runs while something is on screen, pauses when the
 * hero is off-screen or the tab is hidden, and never runs on touch devices or in
 * reduced-motion.
 */
export default function HeroFx() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || window.matchMedia("(pointer: coarse)").matches) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let ping = 0;
    let hl = "#ffc928";
    let ink = "#111111";
    const trail = new Map<number, number>();
    const rings: { x: number; y: number; t: number }[] = [];
    let last: { cx: number; cy: number; t: number } | null = null;

    const on = () => visible && !document.hidden && !reduce.matches;

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.ceil(r.width);
      h = Math.ceil(r.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      hl = cs.getPropertyValue("--hl").trim() || hl;
      ink = cs.getPropertyValue("--ink").trim() || ink;
    };

    const draw = (now: number) => {
      raf = 0;
      ctx.clearRect(0, 0, w, h);

      // Exponential fade: each frame keeps 94% of the alpha, so the tail
      // dissolves quickly at the ends and lingers near the head.
      const cols = Math.ceil(w / CELL);
      for (const [k, a] of trail) {
        const na = a * 0.94;
        if (na < 0.02) {
          trail.delete(k);
          continue;
        }
        trail.set(k, na);
        ctx.globalAlpha = na;
        ctx.fillStyle = na > 0.6 ? ink : hl;
        ctx.fillRect((k % cols) * CELL + 1, Math.floor(k / cols) * CELL + 1, CELL - 2, CELL - 2);
      }
      ctx.globalAlpha = 1;

      ctx.fillStyle = ink;
      for (let n = rings.length - 1; n >= 0; n--) {
        const g = rings[n];
        const r = (now - g.t) * RING_SPEED;
        if (r > RING_MAX) {
          rings.splice(n, 1);
          continue;
        }
        const fade = 1 - r / RING_MAX;
        const x0 = Math.max(0, Math.floor((g.x - r - RING_BAND) / CELL));
        const x1 = Math.min(Math.ceil(w / CELL), Math.ceil((g.x + r + RING_BAND) / CELL));
        const y0 = Math.max(0, Math.floor((g.y - r - RING_BAND) / CELL));
        const y1 = Math.min(Math.ceil(h / CELL), Math.ceil((g.y + r + RING_BAND) / CELL));
        for (let cy = y0; cy < y1; cy++) {
          for (let cx = x0; cx < x1; cx++) {
            const px = cx * CELL + CELL / 2;
            const py = cy * CELL + CELL / 2;
            const d = Math.abs(Math.hypot(px - g.x, py - g.y) - r);
            if (d > RING_BAND / 2) continue;
            const s = 2 + Math.round((1 - d / (RING_BAND / 2)) * 2);
            ctx.globalAlpha = fade * (1 - d / (RING_BAND / 2));
            ctx.fillRect(px - s / 2, py - s / 2, s, s);
          }
        }
      }
      ctx.globalAlpha = 1;

      if (trail.size || rings.length) raf = requestAnimationFrame(draw);
    };

    const wake = () => {
      if (!raf && on()) {
        readColors();
        raf = requestAnimationFrame(draw);
      }
    };

    const stopAll = () => {
      trail.clear();
      rings.length = 0;
      last = null;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      ctx.clearRect(0, 0, w, h);
    };

    // Brightness follows pointer speed: a slow drag leaves a faint trail,
    // a fast sweep leaves a bright one.
    let speed = 0;
    const mark = (cx: number, cy: number, strength: number) => {
      const cols = Math.ceil(w / CELL);
      if (cx < 0 || cy < 0 || cx >= cols || cy >= Math.ceil(h / CELL)) return;
      const k = cy * cols + cx;
      trail.set(k, Math.max(trail.get(k) ?? 0, strength));
    };

    const onMove = (e: PointerEvent) => {
      if (!on()) return;
      const r = host.getBoundingClientRect();
      const cx = Math.floor((e.clientX - r.left) / CELL);
      const cy = Math.floor((e.clientY - r.top) / CELL);
      const now = performance.now();
      const dt = Math.max(now - (last?.t ?? now), 1);
      const px = last ? Math.hypot(cx - last.cx, cy - last.cy) : 0;
      speed = Math.min(px / dt, 1.5);
      const strength = Math.min(0.35 + speed * 0.9, 1);
      if (last && (last.cx !== cx || last.cy !== cy)) {
        const steps = Math.max(Math.abs(cx - last.cx), Math.abs(cy - last.cy));
        for (let s = 1; s <= steps; s++) {
          mark(Math.round(last.cx + ((cx - last.cx) * s) / steps), Math.round(last.cy + ((cy - last.cy) * s) / steps), strength);
        }
      } else mark(cx, cy, strength);
      last = { cx, cy, t: now };
      wake();
    };

    const addRing = (x: number, y: number) => {
      if (!on()) return;
      if (rings.length > 4) rings.shift();
      rings.push({ x, y, t: performance.now() });
      wake();
    };

    const onDown = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      addRing(e.clientX - r.left, e.clientY - r.top);
    };

    const onLeave = () => {
      last = null;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!visible) stopAll();
    });
    io.observe(host);
    const onVis = () => document.hidden && stopAll();

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerdown", onDown);
    host.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);

    // First ping shortly after load, then every few seconds, so the grid
    // reads as alive without any input.
    const ambient = () => addRing(w * (0.55 + Math.random() * 0.35), h * (0.25 + Math.random() * 0.5));
    const first = window.setTimeout(ambient, 900);
    ping = window.setInterval(ambient, 6000);

    return () => {
      window.clearTimeout(first);
      window.clearInterval(ping);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="hero-fx" aria-hidden />;
}
