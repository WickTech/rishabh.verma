export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  location: string;
  summary: string;
}

export interface EducationEntry {
  credential: string;
  org: string;
  period: string;
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
  resume: "/Rishabh_Verma_CV.pdf",
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

  // Work history — shown as the Experience timeline (newest first)
  experience: [
    {
      role: "Founder",
      org: "Kalakaarian",
      period: "2025 — Present",
      location: "Durg, India",
      summary:
        "Building India's AI-powered creator–brand marketplace end to end. Live on real payments, escrow, and a full seven-stage campaign workflow.",
    },
    {
      role: "Software Engineer",
      org: "Futuredge",
      period: "May 2024 — Mar 2026",
      location: "Remote · Lake Jackson, TX",
      summary:
        "Automation software for credit unions and banks. Built and documented 20+ REST APIs with zero post-deploy regressions, plus financial-data pipelines that cut manual work ~50%.",
    },
    {
      role: "Web Developer",
      org: "BuyHatke",
      period: "Sep 2023 — Apr 2024",
      location: "Bangalore, India",
      summary:
        "Shipped production React features and a reusable component library for a high-traffic e-commerce app. Built REST APIs for faster, cleaner data fetching.",
    },
  ] satisfies ExperienceEntry[],

  education: [
    {
      credential: "M.S. Computer Science (in progress)",
      org: "Woolf University",
      period: "Aug 2025 — Feb 2027",
    },
    {
      credential: "Data Science & Full-Stack Program",
      org: "Scaler Academy",
      period: "2021 — 2023",
    },
    {
      credential: "B.Tech, Electrical & Electronics Engineering",
      org: "CSVTU",
      period: "2014 — 2019",
    },
  ] satisfies EducationEntry[],

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
