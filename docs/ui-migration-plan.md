# UI Migration Plan — "Obsidian Kinetic" Redesign

**Source of truth:** Google Stitch export at
`UI/stitch_kinetic_3d_narrative_portfolio/` — namely
`obsidian_kinetic/DESIGN.md` (design system) and
`rishabh_verma_portfolio_redesign/code.html` (reference layout + Three.js scene).

**Goal:** Re-skin the existing production portfolio into the Stitch "Sophisticated
Technicality / Obsidian Kinetic" aesthetic — deep-space dark canvas, glassmorphism,
electric-blue → soft-purple gradients, Geist + JetBrains Mono type, and a
scroll-driven 3D morphing canvas — **without** changing the content, routing,
data model, or SEO that already ship.

---

## 1. Audit — current state

| Area | Current | Verdict |
|---|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TS | **Keep** |
| Styling | Tailwind v4 `@theme` tokens in `app/globals.css` | **Refactor** (retoken) |
| Motion | Framer Motion, `prefers-reduced-motion` aware | **Keep + extend** |
| Fonts | Space Grotesk / Inter / JetBrains Mono via `next/font` | **Refactor** → Geist / JetBrains Mono |
| Data model | `data/projects.ts`, `data/profile.ts` (single source of truth) | **Keep verbatim** |
| Routing | `/`, `/projects/[slug]`, sitemap, robots, 404 | **Keep** |
| SEO | Metadata, OG, Twitter, JSON-LD, sitemap, robots | **Keep + refresh OG art** |
| 3D | none | **Add** (Phase 4) |

The current palette is a warm amber→magenta→violet "experimental" theme.
Stitch replaces it with a cooler **deep-space** palette (`#050816` canvas,
`#1D1836` slate surface, electric-blue `#0070F3` → soft-purple `#D16BFF`
gradient, primary lavender `#d1bcff`). This is the core visual change.

### Content reality check
The `data/projects.ts` entries were verified against the actual repos in
`~/github` (kalakaarian, ai-orc, autoflow, lumen-rag, nimbus-ai,
reddit-keyword-bot, weathernow→Skyline, logipilot). Descriptions, stacks, and
statuses are accurate and current → **no content rewrite needed**, only re-skin.

---

## 2. Components — keep / replace / refactor

| Component | Action | Notes |
|---|---|---|
| `data/projects.ts`, `data/profile.ts` | **Keep** | Source of truth, accurate. |
| `app/layout.tsx` | **Refactor** | Geist + JetBrains Mono; mount 3D scene + ambient glow; keep all metadata. |
| `app/globals.css` | **Refactor** | New token set, glass/glow-beam/aurora utilities, kept reduced-motion guard. |
| `components/Nav.tsx` | **Refactor** | Glass sticky bar, gradient "Hire me / Let's talk" CTA. |
| `components/Hero.tsx` | **Refactor** | Centered deep-space hero, gradient headline, "System Initialized" chip, keep ticker. |
| `components/Expertise.tsx` | **New** | Three glassmorphism competency cards (Engineering / Product / AI). Maps Stitch "Core Competencies". |
| `components/Featured.tsx` + `ProjectCard.tsx` | **Refactor** | Glass cards, top-light border, gradient hover; keep alternating layout + links. |
| `components/MoreProjects.tsx` + `ProjectGridItem.tsx` | **Refactor** | Glass bento tiles. |
| `components/About.tsx` | **Refactor** | "Philosophy" glass panel + inner glow; keep copy + toolbox. |
| `components/Contact.tsx` | **Refactor** | Deep-space CTA, gradient headline, glow. |
| `components/Footer.tsx` | **Refactor** | Glass footer, glow-beam separator. |
| `components/SectionHeading.tsx`, `StatusBadge.tsx`, `StackChips.tsx` | **Refactor** | Repaint to new tokens. |
| `components/motion/Reveal.tsx` | **Keep** | Already reduced-motion aware. |
| `components/three/Scene.tsx` (+ helpers) | **New** | Phase 4 — scroll-driven morph. |
| `app/projects/[slug]/page.tsx` | **Refactor** | Repaint poster band, meta grid, badges to glass/deep-space. |
| `app/not-found.tsx` | **Refactor** | Repaint to new tokens. |
| `app/icon.svg`, `public/og.svg` | **Refactor** | New deep-space + lavender/blue gradient art. |

No components are deleted; nothing is duplicated. Every change is a refactor of
an existing file or a small, additive new component.

---

## 3. Design tokens (Phase 2 target)

Derived from `obsidian_kinetic/DESIGN.md` + `code.html` Tailwind config:

```
Canvas        --color-bg            #050816   (deep-space base, from DESIGN.md "Deep Space")
Surface       --color-surface       #0f1321
Slate surface --color-slate         #1D1836   (cards / nav)
Containers     low/…/highest        #171b2a … #303444
Text          --color-on-surface    #dfe1f6
Muted text    --color-text-muted    #AAA6C3
Primary       --color-primary       #d1bcff   (lavender)
Soft purple   --color-soft-purple   #D16BFF
Electric blue --color-electric-blue #0070F3
Secondary     --color-secondary-dim #4cd6ff
Tertiary      --color-tertiary      #ffb86c
Glass border  --color-border-glass  rgba(255,255,255,0.08)
```

Type: **Geist** (display/body) + **JetBrains Mono** (labels/badges). Radius:
soft technical (4–8px base, `rounded-full` for chips). Motion: `cubic-bezier(0.16,1,0.3,1)`.
Signature utilities: `.glass`, `.glow-beam`, `.ambient-glow`, gradient text.

The old amber/magenta/violet ramp is fully removed (no duplicate styling system).
Accent hexes inside individual `data/projects.ts` entries are kept (they tint
each card) — they read fine on the new dark canvas.

---

## 4. 3D scroll experience (Phase 4)

**Stack:** `three` + `@react-three/fiber` + `@react-three/drei`, driven by Framer
Motion's `useScroll`. The Stitch HTML used a raw `three.min.js` CDN script; we
port that intent into an idiomatic, tree-shakeable R3F component mounted once in
`layout.tsx` as a fixed, `pointer-events-none` background behind the content.

**Five scroll stages** (progress 0→1), morphing one icosahedron via shader-free
geometry blends + group transforms:

1. Geometric form (calm sphere/icosahedron) — hero
2. Connected network (expanded, wireframe + points) — expertise
3. Neural structure (denser, structural) — works
4. Flowing energy form (fluid wobble, color shift) — philosophy/about
5. Brand-inspired final (consolidated lavender glow) — contact

**Constraints (per brief):**
- Continuous morph tied to scroll, smooth interpolation (damped).
- No heavy particle systems. Single low-poly mesh + a light points layer; capped
  `dpr` at 2 (1.5 on mobile); `frameloop="demand"` driven by scroll + idle RAF.
- `prefers-reduced-motion` → render a static frame (or skip the canvas entirely).
- Lazy-loaded via `next/dynamic` (`ssr:false`) so Three.js stays out of the
  initial/SSR bundle. Target 60 FPS desktop / 30+ mobile.

---

## 5. Missing assets

- **Stitch project imagery** in `code.html` uses Google CDN placeholder photos
  (cyber dashboard, abstract glass, code editor). We keep the existing
  emoji-on-gradient posters (no external image dependency, fully on-brand,
  zero extra network weight) rather than wiring transient CDN URLs.
- **`public/resume.pdf`** still absent (pre-existing TODO; links 404 until added).
  Not introduced by this migration; noted in the upgrade report.
- New **OG image** + **favicon** regenerated in the deep-space palette.

---

## 6. Technical risks & mitigations

| Risk | Mitigation |
|---|---|
| Three.js bloats bundle / hurts LCP | `next/dynamic` `ssr:false`, lazy mount, demand frameloop, capped dpr. |
| WebGL jank on low-end mobile | Lower poly + dpr on small screens; static fallback under reduced-motion. |
| Fixed canvas stealing pointer/scroll | `pointer-events-none`, `z-0` behind `z-10` content layer. |
| Tailwind v4 token rename breaks classes | Tokens are renamed centrally in `globals.css`; every consumer updated in the same pass; `next build` gates it. |
| SEO regression | Metadata/JSON-LD/sitemap/robots untouched except OG art; verified by build. |
| Geist font availability | `next/font/google` ships Geist; falls back to system sans. |

---

## 7. Vercel deployability

Target: **redeployable on Vercel with zero config changes.**
- Stays a standard Next.js App Router app (`next build` / `next start`).
- New deps (`three`, `@react-three/fiber`, `@react-three/drei`) are pure npm and
  added to `package.json` + lockfile.
- No server-only/native modules, no edge-incompatible code, no env vars required.
- `next.config.ts` left minimal; `reactStrictMode` kept.
- Build verified locally before hand-off.

---

## 8. Execution order

1. Tokens (`globals.css`) + fonts (`layout.tsx`).
2. 3D scene component + mount.
3. Section components top-to-bottom (Nav → Hero → Expertise → Featured →
   MoreProjects → About → Contact → Footer).
4. Project case-study page + 404 + shared bits (badges, chips, headings).
5. OG/icon art.
6. `npm run build` + `lint`, fix, then `docs/ui-upgrade-report.md`.
