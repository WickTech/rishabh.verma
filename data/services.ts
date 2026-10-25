export interface Service {
  title: string;
  blurb: string;
  timeline: string;
  proof: string;
  items: string[];
}

export const SERVICES: Service[] = [
  {
    title: "Business & portfolio websites",
    blurb:
      "Fast, SEO-ready sites with a clean design, contact forms and analytics. Static-first, deployed on Vercel.",
    timeline: "1–2 weeks",
    proof: "Sāmya, this portfolio",
    items: ["Next.js + Tailwind", "SEO & JSON-LD", "Forms & analytics"],
  },
  {
    title: "Full-stack web app / MVP",
    blurb:
      "Auth, database, dashboards and a deployable product, scoped tight so the first version ships fast.",
    timeline: "4–8 weeks",
    proof: "Kalakaarian, LogiPilot, Atlas",
    items: ["React / Next.js + Node", "Supabase / Postgres", "CI & deploy"],
  },
  {
    title: "AI features & automation",
    blurb:
      "Streaming chat, retrieval-augmented answers with citations and an evaluation harness, or scheduled LLM pipelines.",
    timeline: "2–4 weeks",
    proof: "Nimbus AI, Lumen RAG, autoflow",
    items: ["LLMs & RAG", "Vercel AI SDK", "Evals & fallbacks"],
  },
  {
    title: "Payments & backend APIs",
    blurb:
      "Razorpay checkout, wallets and escrow, idempotent REST APIs and webhooks that stay correct under retries.",
    timeline: "3–5 weeks",
    proof: "Kalakaarian, walletd",
    items: ["Razorpay", "Ledgers & webhooks", "REST API design"],
  },
];

