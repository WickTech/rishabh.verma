import type { ReactNode } from "react";

interface Competency {
  title: string;
  blurb: string;
  accent: string;
  glyph: ReactNode;
  items: string[];
  raised?: boolean;
}

const COMPETENCIES: Competency[] = [
  {
    title: "Engineering",
    accent: "var(--secondary)",
    glyph: (
      <svg viewBox="0 0 24 24">
        <path d="M4 17l6-6-6-6" />
        <path d="M12 19h8" />
      </svg>
    ),
    blurb:
      "End-to-end product engineering — scalable architecture, typed APIs, and performant front-ends on modern stacks.",
    items: ["React / Next.js", "Node.js / FastAPI", "Supabase / Postgres"],
  },
  {
    title: "AI & Systems",
    accent: "var(--soft-purple)",
    raised: true,
    glyph: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
      </svg>
    ),
    blurb:
      "LLM products wired the way real software needs — streaming, RAG with evaluation harnesses, billing ledgers, and orchestration.",
    items: ["LLMs & RAG", "Vercel AI SDK", "Evaluation & retrieval"],
  },
  {
    title: "Product Strategy",
    accent: "var(--primary)",
    glyph: (
      <svg viewBox="0 0 24 24">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 3 3 5-6" />
      </svg>
    ),
    blurb:
      "Scoping tightly and shipping the smallest genuinely-useful thing first — aligning technical capability with real outcomes.",
    items: ["Roadmap & scope", "Two-sided marketplaces", "Payments & escrow"],
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="sec">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="k">
            <span className="kicker">Core competencies</span>
            <h2 className="display">Mapped for impact</h2>
          </div>
          <span className="idx display stroke">01</span>
        </div>
        <div className="exp-grid">
          {COMPETENCIES.map((c) => (
            <div
              key={c.title}
              className={`exp glass reveal${c.raised ? " raised" : ""}`}
            >
              <span
                className="glyph"
                style={{
                  background: `linear-gradient(135deg,${c.accent},transparent)`,
                  boxShadow: `0 0 24px -6px ${c.accent}`,
                }}
              >
                {c.glyph}
              </span>
              <h3 className="display">{c.title}</h3>
              <p>{c.blurb}</p>
              <ul>
                {c.items.map((it) => (
                  <li key={it}>
                    <i style={{ background: c.accent }} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
