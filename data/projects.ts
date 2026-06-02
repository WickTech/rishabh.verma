export type ProjectStatus = "live" | "oss" | "wip";

export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface Project {
  slug: string;
  name: string;
  emoji: string;
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
  /** two hex stops used for the card's gradient accent */
  accent: [string, string];
}

export const projects: Project[] = [
  /* ---------------------------------------------------------------- */
  /*  FEATURED                                                        */
  /* ---------------------------------------------------------------- */
  {
    slug: "kalakaarian",
    name: "Kalakaarian",
    emoji: "🎨",
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
    links: {
      live: "https://kalakaarian.com",
      github: "https://github.com/WickTech/Kalakaarian",
    },
    featured: true,
    accent: ["#ff8a3d", "#ff3d8a"],
  },
  {
    slug: "atlas",
    name: "Atlas",
    emoji: "🌍",
    tagline:
      "India-first global news, market-sentiment & intelligence dashboard.",
    description:
      "Atlas fuses live world news, market data, and AI briefings into one India-centered intelligence dashboard. It pulls from GDELT, Alpha Vantage, CoinGecko, and Yahoo Finance, scores per-country risk, correlates cross-stream signals, and generates AI briefs — all behind a resilient cache that never blanks the feed.",
    role: "Full-stack engineer",
    year: "2026",
    stack: ["React", "Vite", "Node.js", "Express", "Chart.js", "Groq"],
    status: "oss",
    highlights: [
      "Live multi-source pipeline: GDELT news, finance, crypto, per-article sentiment",
      "India-centered choropleth risk map + Country Intelligence Index",
      "Cross-stream signal correlation (surges, hotspots, convergence)",
      "AI briefs via Groq with rule-based fallback; ⌘K command palette",
    ],
    links: { github: "https://github.com/WickTech/atlas" },
    featured: true,
    accent: ["#2dd4bf", "#8b5cf6"],
  },
  {
    slug: "skyline",
    name: "Skyline",
    emoji: "🌤️",
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
    links: { github: "https://github.com/WickTech/weathernow" },
    featured: true,
    accent: ["#38bdf8", "#8b5cf6"],
  },
  {
    slug: "ai-orc",
    name: "AI-Orc",
    emoji: "🛠️",
    tagline:
      "Observe and control multiple LLM CLIs from one local browser UI.",
    description:
      "AI-Orc is a local-first orchestrator for AI tooling. It runs real terminals in the browser via node-pty over WebSockets, integrates an Obsidian vault, and ships a GitHub-URL-based tool registry that clones and parses install steps automatically — one cockpit for every AI CLI you run.",
    role: "Full-stack engineer",
    year: "2026",
    stack: ["Next.js", "TypeScript", "xterm.js", "node-pty", "WebSocket"],
    status: "oss",
    highlights: [
      "Real terminals in the browser (node-pty + ws on a custom server)",
      "Tabbed multi-terminal grid; launch any tool from a dashboard card",
      "Obsidian vault integration with live markdown editing",
      "GitHub-URL tool registry: clone + parse README install steps",
    ],
    links: { github: "https://github.com/WickTech/Ai-Orc" },
    featured: true,
    accent: ["#ff5e3a", "#ff8a3d"],
  },

  /* ---------------------------------------------------------------- */
  /*  MORE PROJECTS                                                   */
  /* ---------------------------------------------------------------- */
  {
    slug: "nimbus-ai",
    name: "Nimbus AI",
    emoji: "🌩️",
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
    links: {},
    featured: false,
    accent: ["#60a5fa", "#8b5cf6"],
  },
  {
    slug: "lumen-rag",
    name: "Lumen RAG",
    emoji: "🔦",
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
    links: {},
    featured: false,
    accent: ["#fbbf24", "#ff8a3d"],
  },
  {
    slug: "autoflow",
    name: "autoflow",
    emoji: "⚙️",
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
    links: {},
    featured: false,
    accent: ["#a3e635", "#2dd4bf"],
  },
  {
    slug: "logipilot",
    name: "LogiPilot",
    emoji: "🚚",
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
    links: {},
    featured: false,
    accent: ["#f59e0b", "#ff5e3a"],
  },
  {
    slug: "reddit-keyword-bot",
    name: "Reddit Keyword Bot",
    emoji: "🤖",
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
    links: {},
    featured: false,
    accent: ["#ff5e3a", "#ff3d8a"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "Live",
  oss: "Open source",
  wip: "In progress",
};
