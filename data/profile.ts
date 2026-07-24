export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export const profile = {
  name: "Rishabh Verma",
  role: "Product Builder & AI Engineer",
  // Hero
  headline: ["I build real", "products —", "end to end."],
  tagline:
    "Full-stack & AI engineer shipping marketplaces, dashboards, and AI tools. From first commit to live product.",
  // About
  summary:
    "I'm a product-minded full-stack and AI engineer from Durg, India. I design, build, and ship complete products — a live influencer marketplace, real-time intelligence dashboards, RAG engines, and developer tooling. I move fast across the stack: React/Next.js on the front, Node and Python on the back, and AI woven through the middle.",
  about: [
    "I don't stop at demos. Kalakaarian is a live marketplace with real payments, escrow, and campaign workflows. Atlas pulls live world data into an India-first intelligence dashboard. My AI work ships with the unglamorous parts — auth, billing ledgers, and evaluation harnesses — wired the way real products need them.",
    "I work like a product manager who can also write the code: scope tightly, ship the smallest thing that's genuinely useful, then iterate. AI is my force multiplier, not my crutch.",
  ],
  location: "Durg, Chhattisgarh, India",
  email: "rishabhverma.dev@gmail.com",
  phone: "7000797371",
  resume: "/resume.pdf",
  url: "https://rishabh-verma.vercel.app",

  // What I work with — shown in the About section
  toolbox: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "FastAPI",
    "Tailwind CSS",
    "Supabase / Postgres",
    "Prisma",
    "Vercel AI SDK",
    "LLMs & RAG",
    "Razorpay",
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/WickTech", handle: "WickTech" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rishabh-verma-",
      handle: "Rishabh Verma",
    },
    {
      label: "Twitter / X",
      href: "https://twitter.com/rishabhverma707",
      handle: "@rishabhverma707",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/rishi_musicoholic",
      handle: "@rishi_musicoholic",
    },
  ] satisfies SocialLink[],
} as const;
