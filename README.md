# Portfolio — Rishabh Verma

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

Live: **https://rishabh-verma.vercel.app**

Personal portfolio of a product builder and AI engineer. Shows built projects
(with live-site screenshots), experience, a fixed-price freelance services
section and per-project pages. Bold editorial design (heavy condensed headings, rotating hero word, rounded frame), light by default
with a dark toggle.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme` bridge) + a flat design stylesheet in `@layer base` (`app/globals.css`) |
| Scroll reveals | `IntersectionObserver` (`components/RevealInit.tsx`), no animation library |
| Contact form | Web3Forms (client-side; public key, override with `NEXT_PUBLIC_WEB3FORMS_KEY`) |
| SEO | Per-project metadata, sitemap, robots, JSON-LD |
| Deploy | Vercel, auto-deploys on push to `main` |

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also the CI/verification step)
npm run start    # serve the production build
```

## Page flow

Hero → Work → More → Experience → About → Services → Contact. Keep the nav
order (`components/Nav.tsx`) in sync if you reorder.

## Where the content lives

Content is data-driven; edit data, not components.

- **`data/projects.ts`**: every project (cards, routes, SEO). Fields: `slug, name,
  tagline, description, role, year, stack[], status ('live' | 'oss' | 'wip'),
  highlights[], links{live?, github?}, featured, tint, image?, spec?, caseStudy?`.
- **`data/profile.ts`**: name, role, hero copy, about text, toolbox, experience,
  education, socials, résumé path.
- **`components/Services.tsx`**: service rows and starting prices (INR).
- **`public/projects/<slug>.webp`**: 1440x900 screenshots of live sites, referenced by `image` in `data/projects.ts`.

### Adding a project

Add an object to `projects` in `data/projects.ts`. `featured: true` gives a large
card in Work; `false` puts it in the More grid. Add `links.github` only for public
repos. Add `links.live` for a deployed site. A page is generated at
`/projects/<slug>`; an optional `caseStudy` adds the deep-dive. Keep metrics honest.

## Conventions

- Keep the design stylesheet inside `@layer base`. Its `*` reset would otherwise
  override every Tailwind spacing utility.
- Add colors as CSS vars (dark overrides under `html[data-theme="dark"]`), not literals.
- No gradients, glow, glass or emoji; keep surfaces flat.
- Keep components server-only unless they need interactivity.

## Structure

```
app/
  layout.tsx               # fonts, metadata, pre-paint theme script
  page.tsx                 # home page sections
  projects/[slug]/page.tsx # per-project page (static params, metadata, JSON-LD)
  sitemap.ts, robots.ts, not-found.tsx, icon.svg
components/                # Hero, Featured, MoreProjects, ProjectVisual, Experience,
                           # About, Services, Contact, Nav, ThemeToggle, ...
data/                      # projects.ts, profile.ts
public/                    # og.png, Rishabh_Verma_CV.pdf, projects/*.webp
```
