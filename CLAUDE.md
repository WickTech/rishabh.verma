# CLAUDE.md

Guidance for AI agents working in this repo.

## What this is

Personal portfolio for **Rishabh Verma** — product builder & AI engineer. Next.js 15 (App Router) + React 19 + Tailwind v4, TypeScript. Single-page site plus per-project case-study pages. Design system: "Obsidian Kinetic" deep-space theme with **dark + light modes** and a persistent toggle.

- Repo: `WickTech/rishabh.verma` (default branch `main`)
- Production: https://rishabh-verma.vercel.app (Vercel, auto-deploys on push to `main`)

## Commands

```bash
npm run dev      # local dev
npm run build    # production build (also the CI/verification step)
npm run start    # serve the production build
npm run lint     # eslint
```

## Architecture

- **Content is data-driven.** Almost nothing is hardcoded in components — edit `data/profile.ts` (identity, experience, education, socials) and `data/projects.ts` (projects). Components render from those. To add a project, add an entry in `data/projects.ts`; `featured: true` puts it in the Work section, else the "More" grid.
- **Case studies.** A project may carry an optional `caseStudy` (problem → architecture → metrics → outcome). When present, `/projects/[slug]` renders the deep-dive and the card links to it. Atlas is the reference example. Keep metrics honest/structural — never invent traction.
- **Sections / flow** (in `app/page.tsx`): Hero → Expertise(01) → About(02) → Experience(03) → Work(04) → More(05) → Contact. Section numbers and the nav order (`components/Nav.tsx`) must stay in sync if you reorder.
- **Background** is `components/NetworkCanvas.tsx` — a 2D-canvas node-network with brand-tinted cursor splash-ripples. It is intentionally **not** three.js / WebGL (three.js was removed to keep First Load JS ~102 KB). Reads `--net-line` / `--net-hi`, re-tints on theme change, disabled under `prefers-reduced-motion`, pauses on hidden tab.
- **Theme** toggle (`components/ThemeToggle.tsx`) sets `data-theme` on `<html>` and persists `rv-theme` in localStorage; a pre-paint inline script in `app/layout.tsx` applies it before first paint to avoid a flash. It dispatches a `themechange` event that the canvas listens for.
- **Scroll reveals**: add class `reveal` to an element; `components/RevealInit.tsx` (an IntersectionObserver) handles the rest. Don't reach for framer-motion (removed).
- **Contact form** (`components/ContactForm.tsx`) posts to **Web3Forms** (free, client-side only). The access key is a public client-side key — safe to commit; override with `NEXT_PUBLIC_WEB3FORMS_KEY`.

## CSS conventions (important)

`app/globals.css` is: `@import "tailwindcss"` → an `@theme` bridge (maps `--color-*` Tailwind utilities onto the themed `--*` vars) → the whole ported design stylesheet wrapped in **`@layer base { … }`**.

- **Keep the design sheet inside `@layer base`.** It contains a `* { margin:0; padding:0 }` reset; unlayered CSS outranks every `@layer`, so if it leaks out of the layer it silently clobbers all Tailwind spacing utilities (`mt-12`, `p-6`, …). That broke the case-study page's alignment once. Never add unlayered global margin/padding rules.
- The homepage components use the plain design classes (`.wrap`, `.sec`, `.exp`, `.flagship`, `.flux`, `.content`, …). The case-study and not-found pages use Tailwind utilities (resolved through the `@theme` bridge). Both must keep working.
- Dead/renamed classes to avoid: `.text-flux` → use `.flux`; `.content-layer` → use `.content`.
- Theme tokens are plain CSS vars (`--bg`, `--primary`, `--net-hi`, …) with `html[data-theme="light"]` overrides. Add new colors as vars, not literals.

## Conventions

- Match the surrounding code style; keep components server-only unless they need interactivity (`"use client"`).
- Verify changes with `npm run build`. Note: in some sandboxes a local server isn't reachable — inspect the prerendered output in `.next/server/app/**.html` and compiled CSS in `.next/static/css/*.css` instead of running `next start`.
- Commit/push only when asked. The user pushes directly to `main` (authorized); Vercel deploys from there.
