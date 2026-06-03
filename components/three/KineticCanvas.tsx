"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Scroll plumbing                                                   */
/* ------------------------------------------------------------------ */

/** Normalised page scroll, 0 → 1. Cheap; read each frame. */
function getScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return Math.min(Math.max(window.scrollY / max, 0), 1);
}

/** Smooth damp toward a target (frame-rate independent). */
function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

/* ------------------------------------------------------------------ */
/*  Morphing form                                                     */
/*                                                                    */
/*  One low-poly icosahedron carries the whole narrative. Rather than */
/*  rewriting vertex buffers every frame (expensive in JS), we morph  */
/*  via group transforms + material props + a subtle shader-free      */
/*  vertex displacement applied only on a modest vertex count. This   */
/*  keeps it GPU-light and jank-free on mobile.                       */
/*                                                                    */
/*  Stages (scroll 0→1):                                              */
/*   1  Geometric form      — calm icosahedron (hero)                 */
/*   2  Connected network   — expanded, energised wireframe + points  */
/*   3  Neural structure    — denser, structural, blue shift (works)  */
/*   4  Flowing energy form  — fluid wobble (philosophy/about)        */
/*   5  Brand-inspired final — consolidated lavender glow (contact)   */
/* ------------------------------------------------------------------ */

const COLOR_PRIMARY = new THREE.Color("#d1bcff"); // lavender
const COLOR_BLUE = new THREE.Color("#0070f3"); // electric blue
const COLOR_PURPLE = new THREE.Color("#d16bff"); // soft purple
const COLOR_POINTS = new THREE.Color("#4cd6ff"); // secondary blue

function KineticForm({ detail }: { detail: number }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const points = useRef<THREE.Points>(null);

  // Base geometry + a frozen copy of its rest positions so the wobble is
  // always applied relative to the original sphere, not cumulatively.
  const geometry = useMemo(
    () => new THREE.IcosahedronGeometry(2, detail),
    [detail],
  );
  const basePositions = useMemo(
    () => Float32Array.from(geometry.attributes.position.array),
    [geometry],
  );

  const wireMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: COLOR_PRIMARY.clone(),
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    [],
  );
  const pointsMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: COLOR_POINTS.clone(),
        size: 0.05,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      }),
    [],
  );

  // Damped scalar state we interpolate every frame.
  const state = useRef({ progress: 0, scale: 1, mx: 0, my: 0 });
  const pointer = useRef({ x: 0, y: 0 });
  const tmpColor = useMemo(() => new THREE.Color(), []);

  const { viewport } = useThree();
  // Nudge the form to the right on wide screens for layout balance.
  const offsetX = viewport.width > 7 ? 1.5 : 0;

  useFrame((threeState, delta) => {
    const dt = Math.min(delta, 0.05); // clamp big frame gaps
    const g = group.current;
    if (!g) return;

    const t = threeState.clock.elapsedTime;
    const targetProgress = getScrollProgress();
    const s = state.current;
    s.progress = damp(s.progress, targetProgress, 6, dt);
    const p = s.progress;

    // --- pointer parallax (very subtle) ---
    s.mx = damp(s.mx, pointer.current.x * 0.4, 4, dt);
    s.my = damp(s.my, pointer.current.y * 0.4, 4, dt);
    g.rotation.y += 0.06 * (s.mx - g.rotation.y);
    g.rotation.x += 0.06 * (s.my - g.rotation.x);

    // --- continuous idle rotation, faster mid-scroll (energy) ---
    const spin = 0.12 + p * 0.25;
    g.rotation.y += spin * dt;
    g.position.x = offsetX;

    // --- stage scale targets, damped ---
    let targetScale = 1;
    if (p < 0.2) targetScale = 1; // 1 geometric
    else if (p < 0.45) targetScale = 1.18; // 2 network (expand)
    else if (p < 0.65) targetScale = 0.85; // 3 neural (compact, structural)
    else if (p < 0.85) targetScale = 1.05; // 4 flowing
    else targetScale = 1.25; // 5 final glow
    const breath = Math.sin(t * 1.4) * 0.02;
    s.scale = damp(s.scale, targetScale, 4, dt);
    g.scale.setScalar(s.scale + breath);

    // --- material: colour + opacity per stage ---
    if (p < 0.45) tmpColor.copy(COLOR_PRIMARY);
    else if (p < 0.65) tmpColor.copy(COLOR_BLUE); // neural → blue
    else if (p < 0.85) tmpColor.copy(COLOR_PURPLE); // flowing → purple
    else tmpColor.copy(COLOR_PRIMARY); // final → lavender
    wireMaterial.color.lerp(tmpColor, 1 - Math.exp(-5 * dt));
    wireMaterial.opacity = THREE.MathUtils.lerp(
      wireMaterial.opacity,
      p > 0.45 && p < 0.65 ? 0.16 : 0.34,
      1 - Math.exp(-5 * dt),
    );
    pointsMaterial.size = THREE.MathUtils.lerp(
      pointsMaterial.size,
      p > 0.2 && p < 0.45 ? 0.09 : 0.045,
      1 - Math.exp(-5 * dt),
    );

    // --- shader-free vertex displacement (the morph) ---
    // Amplitude ramps with scroll; frequency gives the "network/neural" feel.
    const pos = geometry.attributes.position;
    const amp = 0.12 + Math.sin(p * Math.PI) * 0.6; // peaks mid-scroll
    const freq = 1.5 + p * 4;
    for (let i = 0; i < pos.count; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];
      const len = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
      const wobble =
        Math.sin(bx * freq + t) * Math.cos(by * freq + t * 0.8) * amp;
      const scale = (len + wobble) / len;
      pos.setXYZ(i, bx * scale, by * scale, bz * scale);
    }
    pos.needsUpdate = true;
  });

  // Pointer tracking (attached once, cleaned by R3F unmount of the canvas).
  useMemo(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <group ref={group}>
      <mesh ref={mesh} geometry={geometry} material={wireMaterial} />
      <points ref={points} geometry={geometry} material={pointsMaterial} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Canvas shell                                                      */
/* ------------------------------------------------------------------ */

export default function KineticCanvas() {
  // Lower poly + dpr on small screens to protect mobile FPS / GPU.
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;
  const detail = isMobile ? 2 : 4;
  const dpr: [number, number] = isMobile ? [1, 1.5] : [1, 2];

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <KineticForm detail={detail} />
    </Canvas>
  );
}
