# UI Upgrade Report — "Obsidian Kinetic" Redesign

Implementation of the Google Stitch
`UI/stitch_kinetic_3d_narrative_portfolio/` design into the existing Next.js
portfolio. The site was re-skinned from the warm amber/magenta "experimental"
theme into Stitch's deep-space, glassmorphic **Sophisticated Technicality**
aesthetic, with a scroll-driven 3D background — **all existing content,
routing, data model, and SEO preserved.**

---

## Files changed

### Design system / app shell
- `app/globals.css` — **rewritten**. Old token set (`void/ink/panel/bone*/amber/
  magenta/violet`, `.grain`) replaced with the Obsidian Kinetic deep-space palette
  (`bg #050816`, `surface`, `slate #1D1836`, `primary #d1bcff`, `soft-purple
  #D16BFF`, `electric-blue #0070F3`, `secondary #4cd6ff`, glass borders). Added
  `.glass`, `.glow-beam`, `.ambient-glow`, `.content-layer`, repainted `.text-flux`
  / `.text-stroke` / `.display`. Reduced-motion guard kept.
- `app/layout.tsx` — fonts swapped **Space Grotesk + Inter → Geist** (display+body)
  with JetBrains Mono retained for labels; mounts the persistent `<Scene/>` 3D
  background + `.ambient-glow`. All `metadata` (title, OG, Twitter, robots,
  keywords) left intact.
- `app/page.tsx` — added the new **Expertise** section and **Glow Beam** dividers
  between sections.

### New components
- `components/three/Scene.tsx` — client mount point; lazy-loads the WebGL canvas
  via `next/dynamic({ ssr:false })`, gated on client mount + `prefers-reduced-motion`
  off + WebGL availability; renders a static gradient fallback otherwise.
- `components/three/KineticCanvas.tsx` — React Three Fiber canvas. One low-poly
  icosahedron morphs through **5 scroll stages** (geometric → network → neural →
  flowing → brand glow) via damped scroll interpolation, group transforms,
  per-stage colour/opacity, and a shader-free vertex wobble. Lower poly + capped
  `dpr` on mobile.
- `components/Expertise.tsx` — Stitch "Core Competencies": three glassmorphism
  cards (Engineering / AI & Systems / Product Strategy), middle card raised.

### Refactored sections (repainted, content preserved)
- `components/Nav.tsx` — glass sticky bar, full brand name, gradient "Hire me" CTA,
  links now include `#expertise`.
- `components/Hero.tsx` — centered deep-space hero, animated status chip showing the
  real role, gradient final headline line, gradient primary CTA, kept the
  "Shipped /" marquee (data-driven from `projects`).
- `components/Featured.tsx`, `ProjectCard.tsx` — glass posters with top-light border,
  gradient hover wash; alternating layout, links, and copy unchanged.
- `components/MoreProjects.tsx`, `ProjectGridItem.tsx` — glass bento tiles.
- `components/About.tsx` — narrative in a glass "Philosophy" panel with inner glow;
  toolbox + location preserved.
- `components/Contact.tsx` — deep-space CTA, gradient headline, gradient email button;
  all socials/links preserved.
- `components/Footer.tsx` — glass footer with tagline.
- `components/SectionHeading.tsx`, `StatusBadge.tsx`, `StackChips.tsx` — repainted to
  new tokens (chips now pill-shaped per DESIGN.md).

### Pages
- `app/projects/[slug]/page.tsx` — poster band, meta grid, badges, links, and "next
  project" repainted to deep-space/glass. `generateStaticParams`,
  `generateMetadata`, and the `SoftwareApplication` JSON-LD untouched.
- `app/not-found.tsx` — repainted, gradient CTA.

### Assets / config / docs
- `app/icon.svg`, `public/og.svg` — regenerated in the deep-space + electric-blue→
  soft-purple palette with Geist typography.
- `package.json` — added `three`, `@react-three/fiber`, `@react-three/drei`
  (deps) + `@types/three` (devDep). **Next.js bumped 15.1.11 → 15.5.x** to close
  pre-existing security advisories (see below).
- `README.md` — stack table updated (Geist, R3F).
- `docs/ui-migration-plan.md`, `docs/ui-upgrade-report.md` — new.

---

## Components updated

Nav · Hero · Expertise (new) · Featured/ProjectCard · MoreProjects/ProjectGridItem ·
About · Contact · Footer · SectionHeading · StatusBadge · StackChips ·
project case-study page · 404 · Scene + KineticCanvas (new 3D).

`components/motion/Reveal.tsx` and the `data/` layer were intentionally left
**unchanged** — already correct and reduced-motion aware.

---

## Assets added
- Scroll-driven 3D scene (Three.js / R3F).
- New favicon (`app/icon.svg`) and social card (`public/og.svg`).

No external/CDN image dependencies were introduced — project posters remain
zero-network emoji-on-gradient panels (Stitch's photo placeholders were Google
CDN throwaways).

---

## Accessibility improvements
- 3D canvas is `aria-hidden`, `pointer-events-none`, and **fully disabled under
  `prefers-reduced-motion`** (static gradient instead) — no motion forced on users
  who opt out.
- All decorative glows/auroras/beams are `aria-hidden`.
- Status chip + "live" pulse marked decorative; semantic text retained.
- Text colours use the DESIGN.md muted-on-dark pairing (`#dfe1f6` / `#aaa6c3` on
  `#050816`) for comfortable contrast; pure white avoided for long-form body.
- Keyboard/focus order unchanged; links keep real `href`s and `rel="noopener"`.

## Performance improvements
- **Three.js is fully code-split**: loaded via `next/dynamic({ ssr:false })`, so it
  is absent from the SSR HTML and the 106 kB shared baseline. The R3F/three chunks
  (~0.8 MB) download only client-side, after mount, and never on reduced-motion.
- Home route first-load JS: **152 kB** (page) over a **106 kB** shared baseline.
- Canvas tuned for GPU efficiency: single low-poly mesh + light points layer (no
  heavy particle system), `dpr` capped at 2 (1.5 mobile), lower icosahedron detail
  on mobile, damped/frame-rate-independent interpolation, clamped frame delta.
- Fonts via `next/font` (self-hosted, `display:swap`).
- All routes prerender to static HTML/SSG (`✓ 16/16`).

## SEO improvements / protection
- **No regressions.** `metadata` (title template, description, keywords, authors,
  OG, Twitter, robots), `sitemap.ts`, `robots.ts`, per-project `generateMetadata`,
  and the `SoftwareApplication` JSON-LD are all preserved — verified in the built
  HTML (home `<title>`, OG/Twitter/description tags, and project-page JSON-LD all
  present and correct).
- OG/Twitter card art refreshed to match the new brand (same dimensions/paths, so
  no link rot).
- Canonical structure, internal links, and `/projects/<slug>` routes unchanged.

---

## Security
- Pre-existing advisories in **Next.js 15.1.11** (1 critical + 1 moderate) were
  addressed by bumping to **Next 15.5.19** (within the same major — no API change).
  The **critical** advisory is now resolved.
- 2 moderate advisories remain, both for a **postcss** copy bundled *inside* Next's
  own dependency tree (`node_modules/next/node_modules/postcss`, build-time CSS
  stringify XSS). `npm audit`'s only offered "fix" is a downgrade to `next@9.3.3`
  (a major breaking change) — declined as worse than the issue. The real fix
  arrives with Next's next patch; the issue does not affect the deployed static
  output. The added 3D dependencies (`three`/R3F) were clean.

## Vercel deployability
- Remains a standard Next.js App Router app: `next build` succeeds, `next start`
  serves all routes (home/project/404/sitemap/robots verified `200`/`404`).
- New deps are pure npm; no native/server-only modules, no edge incompatibilities,
  no new env vars. `next.config.ts` unchanged.
- **Build/install note:** on this machine `node_modules` must be installed *inside
  WSL* (Windows npm trips over Unix symlinks in `.bin`). Vercel's Linux build
  environment is unaffected — `npm install && next build` works as-is.

---

## Remaining technical debt
- **`public/resume.pdf` still absent** (pre-existing). The Hero/Contact "Résumé"
  buttons 404 until the real PDF is dropped in; path is `resume` in `data/profile.ts`.
- **`eslint` not configured** — `next lint` prompts for first-time setup
  (no eslintrc committed). Type-checking + Next's build-time lint pass; a standalone
  `npm run lint` would need an `eslint.config` first. Pre-existing.
- A few `data/projects.ts` entries (Nimbus, Lumen, autoflow, LogiPilot,
  Reddit bot) still have empty `links.github` pending public repos — pre-existing
  content TODO, not a UI issue.
- The 3D morph is geometry-/transform-based (not a custom GLSL shader). It hits the
  performance targets; a future pass could move the displacement into a vertex
  shader for even lower CPU on very large vertex counts.
