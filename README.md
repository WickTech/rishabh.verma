# 💼 Portfolio — Rishabh Verma

A bold, motion-driven portfolio that showcases the products I've shipped — a live
influencer marketplace, intelligence dashboards, RAG engines, and developer tooling.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and
**Framer Motion**. Per-project case-study pages, SSR/SEO, sitemap, and JSON-LD.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme` tokens in `app/globals.css`) |
| Motion | Framer Motion (respects `prefers-reduced-motion`) |
| Fonts | `next/font` — Space Grotesk (display), Inter (body), JetBrains Mono |
| Deploy | Vercel |

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (prerenders all routes)
```

## Where the content lives

Everything is data-driven — no need to touch components to update content:

- **`data/projects.ts`** — the single source of truth for every project (cards,
  routes, SEO). Each entry: `slug, name, emoji, tagline, description, role, year,
  stack[], status ('live' | 'oss' | 'wip'), highlights[], links{live?, github?},
  featured, accent`.
- **`data/profile.ts`** — name, role, hero copy, about text, toolbox, socials, résumé path.

### Adding / updating a project
Add an object to the `projects` array in `data/projects.ts`. Set `featured: true`
for a large card on the home page, or `false` for the "More projects" grid. A
case-study page is generated automatically at `/projects/<slug>`.

## To-do before going live

- [ ] Add **`public/resume.pdf`** (the Hero & Contact buttons link to `/resume.pdf`).
- [ ] Fill in GitHub links for Nimbus AI, Lumen RAG, autoflow, Reddit Keyword Bot,
      and LogiPilot once those repos are pushed (the `links.github` field).
- [ ] (Optional) Replace the gradient project posters with real screenshots.

## Structure

```
app/
  layout.tsx              # fonts + global metadata
  page.tsx                # home: Hero → Featured → More → About → Contact
  projects/[slug]/page.tsx# per-project case study (static params + metadata + JSON-LD)
  sitemap.ts, robots.ts   # SEO
  not-found.tsx, icon.svg
components/                # Hero, ProjectCard, ProjectGridItem, About, Contact, …
  motion/Reveal.tsx        # scroll-reveal wrapper
data/                      # projects.ts, profile.ts  ← edit content here
public/                    # og.svg, resume.pdf (add yours)
```
