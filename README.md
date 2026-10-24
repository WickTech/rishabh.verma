# Portfolio — Rishabh Verma

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

Live: **https://rishabh-verma.vercel.app**

Personal portfolio of a product builder and AI engineer. Showcases shipped
products (a live influencer marketplace, an intelligence dashboard, RAG and
payments engines, developer tooling), a fixed-price services section, and
per-project case studies. Dark and light themes.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme` bridge) + a design stylesheet in `@layer base` (`app/globals.css`) |
| Background | 2D-canvas node network (`components/NetworkCanvas.tsx`), low intensity, off under `prefers-reduced-motion` |
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

Hero → Expertise (01) → About (02) → Experience (03) → Work (04) → More (05)
→ Services (06) → Contact. Section numbers and the nav order
(`components/Nav.tsx`) must stay in sync if you reorder.

## Where the content lives

Content is data-driven; edit data, not components.

- **`data/projects.ts`**: every project (cards, routes, SEO). Fields: `slug, name,
  emoji, tagline, description, role, year, stack[], status ('live' | 'oss' | 'wip'),
  highlights[], links{live?, github?}, featured, accent, caseStudy?`.
- **`data/profile.ts`**: name, role, hero copy, about text, toolbox, experience,
  education, socials, résumé path.
- **`components/Services.tsx`**: service cards and starting prices (INR).

### Adding a project

Add an object to `projects` in `data/projects.ts`. `featured: true` gives a large
card in Work; `false` puts it in the More grid. Add `links.github` only for public
repos. Add `links.live` for a deployed site. A page is generated at
`/projects/<slug>`; an optional `caseStudy` adds the deep-dive. Keep metrics honest.

## Conventions

- Keep the design stylesheet inside `@layer base`. Its `*` reset would otherwise
  override every Tailwind spacing utility.
- Add colors as CSS vars (themed with `html[data-theme="light"]`), not literals.
- Keep components server-only unless they need interactivity.

## Structure

```
app/
  layout.tsx               # fonts, metadata, pre-paint theme script
  page.tsx                 # home page sections
  projects/[slug]/page.tsx # per-project page (static params, metadata, JSON-LD)
  sitemap.ts, robots.ts, not-found.tsx, icon.svg
components/                # Hero, Expertise, About, Experience, Featured,
                           # MoreProjects, Services, Contact, Nav, ThemeToggle, NetworkCanvas, ...
data/                      # projects.ts, profile.ts
public/                    # og.svg, Rishabh_Verma_CV.pdf
```
