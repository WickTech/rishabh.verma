export type Tint = "sage" | "sand" | "blue" | "rose";

export type ProjectStatus = "live" | "oss" | "wip";

export interface ProjectLinks {
  live?: string;
  github?: string;
}

/** Optional deep-dive shown on the /projects/[slug] case-study page. */
export interface CaseStudy {
  /** the problem the project set out to solve */
  problem: string;
  /** architecture / how-it-works, as titled points */
  architecture: { title: string; detail: string }[];
  /** headline numbers — keep these honest/structural, not invented traction */
  metrics: { value: string; label: string }[];
  /** what shipped and why it holds up */
  outcome: string;
}

export interface Project {
  slug: string;
  name: string;
  /** short one-liner shown on cards */
  tagline: string;
  /** longer paragraph shown on the case-study page */
  description: string;
  role: string;
  year: string;
  stack: string[];
  status: ProjectStatus;
  highlights: string[];
  links: ProjectLinks;
  /** featured cards render large on the home page; the rest go in the grid */
  featured: boolean;
  /** screenshot of the live site (1440x900), shown on cards and the project page */
  /** fullPage: the whole long page is shown at natural height, not cropped */
  image?: { src: string; alt: string; fullPage?: { width: number; height: number } };
  /** one line of real substance shown on cards that have no screenshot */
  spec?: string;
  /** muted pastel used for the card tile and badges */
  tint: Tint;
  /** optional long-form case study rendered on the project page */
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  /* ---------------------------------------------------------------- */
  /*  FEATURED                                                        */
  /* ---------------------------------------------------------------- */
  {
    slug: "kalakaarian",
    image: {
      src: "/projects/kalakaarian-full.jpg",
      alt: "Kalakaarian home page, full length: hero, how it works, creator categories, campaign workflow, pricing and footer",
      fullPage: { width: 1440, height: 11042 },
    },
    name: "Kalakaarian",
    tagline:
      "India's AI-powered influencer–brand marketplace, live in production.",
    description:
      "Kalakaarian connects brands with authentic creators and runs the entire collaboration end to end — discovery, a seven-stage campaign workflow, cart and checkout, an escrow wallet, PDF invoices, and real Instagram analytics. It's a full two-sided marketplace running live on real payments.",
    role: "Solo founder & full-stack engineer",
    year: "2026",
    stack: ["React", "Vite", "TypeScript", "Supabase", "Razorpay", "Vercel"],
    status: "live",
    highlights: [
      "Full 7-stage campaign workflow with cart, checkout, and PDF invoices",
      "Escrow wallet with platform fee + payouts and a transactional ledger",
      "Instagram OAuth + live analytics (followers, engagement, authenticity score)",
      "Creator onboarding wizard, Google OAuth, PWA, SEO + JSON-LD, GA4 + Clarity",
    ],
    // GitHub intentionally omitted: Kalakaarian is a private, live commercial
    // product. The live site is the proof; the source stays closed.
    links: {
      live: "https://kalakaarian.com",
    },
    featured: true,
    tint: "sand",
  },
  {
    slug: "atlas",
    image: { src: "/projects/atlas.webp", alt: "Atlas dashboard: globe with regional risk layers and a country instability index" },
    name: "Atlas",
    tagline:
      "Real-time global situational-awareness console: country risk, markets and world news on a 3D globe.",
    description:
      "Atlas brings country risk, cross-stream signals, markets and world news into one console on a GPU-rendered globe. It runs entirely on free, keyless, open data (publisher RSS, GDELT, Yahoo Finance, USGS, NASA EONET and more), generates AI briefs with a deterministic fallback, and keeps the last good data on screen when an upstream fails.",
    role: "Full-stack engineer",
    year: "2026",
    stack: ["Next.js", "TypeScript", "MapLibre", "deck.gl", "Tailwind"],
    status: "oss",
    highlights: [
      "Per-country risk choropleth and a country instability index on a WebGL globe",
      "Live layers: news, earthquakes, disasters, aircraft, internet outages, markets",
      "AI briefs via Groq or OpenRouter, with a deterministic fallback",
      "Shareable deep links: layers, filters and camera sync to the URL",
    ],
    links: {
      live: "https://atlas-eight-fawn.vercel.app",
      github: "https://github.com/WickTech/atlas",
    },
    featured: true,
    tint: "blue",
    caseStudy: {
      problem:
        "Global-event intelligence is scattered across news, markets, hazards and infrastructure feeds, each behind its own flaky, rate-limited API. Dashboards that fan out to every source on each load go blank the moment one upstream throttles or fails. Atlas set out to put those streams in a single console that keeps working when its sources do not.",
      architecture: [
        {
          title: "Free, keyless data pipeline",
          detail:
            "Server route handlers pull publisher RSS, GDELT, Yahoo Finance, NASA EONET and GDACS, adsb.lol and IODA, normalize them, and serve them with CDN caching (s-maxage plus stale-while-revalidate). No API key is required to run it.",
        },
        {
          title: "Risk scoring and cross-stream signals",
          detail:
            "News is tagged to countries and rolled up into a per-country risk score, drawn as a choropleth on the globe. A signals pass looks across news, markets and hazards together to surface the moments where several streams move at once.",
        },
        {
          title: "One WebGL context",
          detail:
            "MapLibre GL renders the globe and the choropleth; deck.gl layers are interleaved in the same context. The map loads as a lazy chunk so the initial bundle stays small.",
        },
        {
          title: "Resilient client data layer",
          detail:
            "TanStack Query polls with exponential backoff, pauses in background tabs, and retains the last good data, so an upstream outage costs freshness and not the whole view.",
        },
        {
          title: "AI briefs with a fallback",
          detail:
            "Briefs come from Groq or OpenRouter when a key is available and fall back to a deterministic summary otherwise. Server routes validate input, cache results and rate-limit.",
        },
        {
          title: "URL as state",
          detail:
            "Layers, filters, camera and selection live in a Zustand store with debounced two-way URL sync, so any view can be shared as a link.",
        },
      ],
      metrics: [
        { value: "12", label: "Publisher RSS feeds" },
        { value: "0", label: "API keys required to run" },
        { value: "1", label: "WebGL context for globe and layers" },
        { value: "165 kB", label: "Initial JS, gzipped" },
      ],
      outcome:
        "Atlas is live as a single console that holds together under real-world API flakiness: caching and last-good-data retention mean an upstream outage degrades freshness, not availability. It shows how I wire messy public data, a WebGL map and an AI layer into one product with CI and production smoke tests.",
    },
  },
  {
    slug: "skyline",
    image: { src: "/projects/skyline.webp", alt: "Skyline showing current weather and air quality for London" },
    name: "Skyline",
    tagline: "One search — current weather and air quality, anywhere.",
    description:
      "Skyline is a clean single-search weather and air-quality dashboard. Type a city, get the current conditions, a five-day forecast, and a live air-quality index in one view. Born from merging two earlier apps (WeatherNow + AirNow) into one focused product.",
    role: "Frontend engineer",
    year: "2025",
    stack: ["React", "OpenWeatherMap", "WAQI", "CSS"],
    status: "oss",
    highlights: [
      "Single-search current weather + 5-day forecast",
      "Live air-quality index from the WAQI network",
      "Recent-search memory persisted locally",
      "Lightweight, zero-framework-bloat CRA build",
    ],
    links: {
      live: "https://skyline-ten-jet.vercel.app",
      github: "https://github.com/WickTech/Skyline",
    },
    featured: false,
    tint: "blue",
  },
  {
    slug: "axion",
    spec: "session → worktree → diff → approve → merge",
    name: "Axion",
    tagline:
      "Mission control for AI coding agents: isolated worktrees, diff review, approval-gated merges.",
    description:
      "Axion is a local-first mission control for AI coding agents. It runs real terminals in the browser (node-pty over WebSockets), gives every session its own git worktree and branch, shows you the exact diff, and merges only what you approve — bound to a hash of the reviewed diff, with an optional verify command and an audit log. Includes a Mission Control dashboard, session notifications and a task board. Formerly AI-Orc.",
    role: "Full-stack engineer",
    year: "2026",
    stack: ["Next.js", "TypeScript", "xterm.js", "node-pty", "WebSocket"],
    status: "oss",
    highlights: [
      "Real terminals in the browser (node-pty + ws on a custom server)",
      "One git worktree + branch per agent session; your checkout is never touched",
      "Approval-gated merge bound to a hash of the reviewed diff, optional verify gate, audit log",
      "Hardened for localhost: Host/Origin checks, optional token sign-in, threat model in SECURITY.md",
    ],
    links: { github: "https://github.com/WickTech/axion" },
    featured: true,
    tint: "rose",
  },

  /* ---------------------------------------------------------------- */
  /*  MORE PROJECTS                                                   */
  /* ---------------------------------------------------------------- */
  {
    slug: "nimbus-ai",
    image: { src: "/projects/nimbus-ai.webp", alt: "Nimbus AI landing page: 'Ship an AI product, not boilerplate'" },
    name: "Nimbus AI",
    tagline:
      "Production-shaped AI SaaS starter — streaming chat, auth, credit billing.",
    description:
      "Nimbus is the part everyone rebuilds when shipping an AI product: auth, persistence, streaming responses, and a way to charge for tokens without losing money. Small enough to read in one sitting, wired the way a real SaaS would be.",
    role: "Author",
    year: "2025",
    stack: ["Next.js", "NextAuth v5", "Prisma", "Vercel AI SDK"],
    status: "oss",
    highlights: [
      "Token-by-token streaming chat via the Vercel AI SDK",
      "Credential auth (NextAuth v5) + Prisma persistence",
      "Transactional usage-based credit billing ledger",
    ],
    links: {
      live: "https://nimbus-ai-sandy.vercel.app",
      github: "https://github.com/WickTech/nimbus-ai",
    },
    featured: false,
    tint: "blue",
  },
  {
    slug: "lumen-rag",
    image: { src: "/projects/lumen-rag.webp", alt: "Lumen RAG live demo: load documents, ask a question, run retrieval eval" },
    name: "Lumen RAG",
    tagline:
      "A transparent, evaluated RAG engine — with a real IR-metric harness.",
    description:
      "Most RAG demos stop at 'it answered my question.' Lumen treats retrieval as the engineering problem it is, shipping an evaluation harness so you can prove recall@5 went up when you change chunking, embeddings, or reranking. Runs 100% offline with no API key.",
    role: "Author",
    year: "2025",
    stack: ["Python", "FastAPI", "Vector search"],
    status: "oss",
    highlights: [
      "Ingest → retrieve → answer with citations",
      "Built-in IR-metric evaluation suite (recall@k, etc.)",
      "Runs fully offline; add an API key for real embeddings",
    ],
    links: {
      live: "https://huggingface.co/spaces/WickTech/lumen-rag",
      github: "https://github.com/WickTech/lumen-rag",
    },
    featured: true,
    tint: "sand",
  },
  {
    slug: "autoflow",
    spec: "scrape → filter → dedup → summarize → publish",
    name: "autoflow",
    tagline:
      "Pluggable content-automation pipeline, described in a tiny YAML file.",
    description:
      "scrape → filter → dedup → summarize → publish, configured declaratively. Point autoflow at any RSS/Atom feed and it builds a daily AI-news digest, posts it to Slack, and never repeats a story — all on a schedule via GitHub Actions, with no glue code.",
    role: "Author",
    year: "2025",
    stack: ["Python", "GitHub Actions", "YAML"],
    status: "oss",
    highlights: [
      "Declarative source → transform → sink pipeline",
      "Dedup + scheduled runs via GitHub Actions",
      "Runs offline with a deterministic extractive summarizer",
    ],
    links: { github: "https://github.com/WickTech/autoflow" },
    featured: false,
    tint: "sage",
  },
  {
    slug: "logipilot",
    image: { src: "/projects/logipilot.webp", alt: "LogiPilot merchant portal home page: 'Always moving forward'" },
    name: "LogiPilot",
    tagline:
      "Self-serve shipping MVP for small Indian businesses to ship anywhere.",
    description:
      "A pivot of an internal courier tool into a self-serve product: small businesses get a prepaid wallet, a local rate engine, booking with AWB/label generation, and simulated tracking — built on a swappable courier-provider interface for real integrations later.",
    role: "Product & engineering",
    year: "2026",
    stack: ["React", "Express", "MongoDB", "Razorpay"],
    status: "wip",
    highlights: [
      "Merchant accounts + prepaid wallet (real Razorpay test flow)",
      "Local rate engine, booking, AWB/label generation",
      "Swappable courier-provider interface (mock → real)",
    ],
    links: { live: "https://logipilot-lac.vercel.app" },
    featured: false,
    tint: "sand",
  },
  {
    slug: "reddit-keyword-bot",
    spec: "comment → keyword match → reply once",
    name: "Reddit Keyword Bot",
    tagline:
      "A Reddit (Devvit) bot that watches subreddits for keywords.",
    description:
      "A Reddit app built on the Devvit platform that monitors subreddits for configured keywords and reacts in real time — a compact, typed automation that lives inside Reddit's own app framework.",
    role: "Author",
    year: "2025",
    stack: ["TypeScript", "Devvit", "Reddit API"],
    status: "oss",
    highlights: [
      "Real-time subreddit keyword monitoring",
      "Built on Reddit's Devvit app platform",
      "Typed, test-covered automation",
    ],
    links: { github: "https://github.com/WickTech/RedBot" },
    featured: false,
    tint: "rose",
  },
  {
    slug: "walletd",
    spec: "every journal entry: sum of postings = 0",
    name: "walletd",
    tagline:
      "Double-entry wallet & payments service with database-enforced ledger invariants.",
    description:
      "walletd is a small payments service built the way a payments team would build it: every money movement is a journal entry whose postings sum to zero, and Postgres itself refuses anything else. Retries are safe, concurrent spends are safe, and events are never lost between 'money moved' and 'event sent'.",
    role: "Author",
    year: "2026",
    stack: ["Java 25", "Spring Boot 4", "PostgreSQL 17", "Prometheus"],
    status: "oss",
    highlights: [
      "Constraint triggers in Postgres enforce balanced journal entries",
      "Idempotency-Key API: a client retry moves money exactly once",
      "HMAC-signed webhook + transactional outbox with an at-least-once relay",
      "Ordered row locks under concurrency; reconciliation audit; metrics",
    ],
    links: { github: "https://github.com/WickTech/walletd" },
    featured: true,
    tint: "sage",
  },
  {
    slug: "stocky",
    spec: "5y daily prices → Random Forest → direction + confidence",
    name: "stocky",
    tagline:
      "Local ML signals for Indian equities & forex, with a Claude risk-manager co-pilot.",
    description:
      "stocky pulls five years of price history, engineers technical features, trains a per-ticker Random Forest, backtests it, and writes plain-text context files that a Claude Project turns into risk-first trade plans. Educational use only, not financial advice.",
    role: "Author",
    year: "2026",
    stack: ["Python", "scikit-learn", "yfinance", "Claude"],
    status: "oss",
    highlights: [
      "Per-ticker Random Forest with backtesting on 5y daily data",
      "Technical features (RSI, SMA, returns) → next-day direction + confidence",
      "Claude co-pilot governed by project instructions, risk-first by design",
    ],
    links: { github: "https://github.com/WickTech/stocky" },
    featured: false,
    tint: "rose",
  },
  {
    slug: "twinz-ai-studio",
    spec: "script → voice → lip-sync → captions → review",
    name: "Twinz AI Studio",
    tagline:
      "Consented AI avatars and human-reviewed Shorts/Reels in English, Hindi and more.",
    description:
      "Create a consenting creator's AI avatar once, then turn scripts into vertical Shorts/Reels in their face and voice. Every video carries an AI label and watermark, goes through human review, and nothing auto-posts. Built to plug into Kalakaarian later. Source is private.",
    role: "Product & engineering",
    year: "2026",
    stack: ["Python", "Lip-sync", "TTS", "FFmpeg"],
    status: "wip",
    highlights: [
      "Consent-first avatar + cloned-voice pipeline with revoke-and-delete",
      "Script → voice → lip-sync → captions → AI label & watermark → review",
      "Swappable lip-sync and TTS engine adapters; English, Hindi, Hinglish",
    ],
    links: {},
    featured: false,
    tint: "blue",
  },
  {
    slug: "samya",
    image: { src: "/projects/samya.webp", alt: "Sāmya cloud kitchen home page with menu and WhatsApp order buttons" },
    name: "Sāmya",
    tagline: "Website for a wellness-focused cloud kitchen in Bhilai–Durg.",
    description:
      "A static-first, data-driven Next.js site for Sāmya, a pure-veg, high-protein cloud kitchen: menu of bowls, salads, sandwiches, smoothies and cold-pressed juices. A client project, rebuilt from a single-file site and deployed on Vercel. Source is private.",
    role: "Full-stack engineer",
    year: "2026",
    stack: ["Next.js", "TypeScript", "Vercel"],
    status: "live",
    highlights: [
      "Data-driven menu; static-first for speed",
      "Rebuilt from a single-file site into Next.js",
      "Auto-deploys to production on every push to main",
    ],
    links: { live: "https://samya-tawny.vercel.app" },
    featured: false,
    tint: "sage",
  },
];

// Projects with a screenshot and a live site lead; the rest follow (stable order).
const rank = (p: Project) => (p.image && p.links.live ? 0 : 1);
const byRank = (a: Project, b: Project) => rank(a) - rank(b);

export const featuredProjects = projects.filter((p) => p.featured).sort(byRank);
export const moreProjects = projects.filter((p) => !p.featured).sort(byRank);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "Live",
  oss: "Open source",
  wip: "In progress",
};
