import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./motion/Reveal";

/**
 * Core competencies — three glassmorphism cards (Stitch "Expertise" section).
 * Content reflects the real shape of the work in data/projects.ts:
 * shipping full-stack products, AI/LLM systems, and product strategy.
 */
const COMPETENCIES = [
  {
    title: "Engineering",
    icon: "terminal",
    blurb:
      "End-to-end product engineering — scalable architecture, typed APIs, and performant front-ends on modern stacks.",
    accent: "var(--color-secondary)",
    items: ["React / Next.js", "Node.js / FastAPI", "Supabase / Postgres"],
  },
  {
    title: "AI & Systems",
    icon: "neurology",
    blurb:
      "LLM products wired the way real software needs — streaming, RAG with evaluation harnesses, billing ledgers, and orchestration.",
    accent: "var(--color-soft-purple)",
    items: ["LLMs & RAG", "Vercel AI SDK", "Evaluation & retrieval"],
    raised: true,
  },
  {
    title: "Product Strategy",
    icon: "strategy",
    blurb:
      "Scoping tightly and shipping the smallest genuinely-useful thing first — aligning technical capability with real outcomes.",
    accent: "var(--color-primary)",
    items: ["Roadmap & scope", "Two-sided marketplaces", "Payments & escrow"],
  },
];

export function Expertise() {
  return (
    <section
      id="expertise"
      className="content-layer scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          kicker="Core competencies"
          title="Mapped for impact"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {COMPETENCIES.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 0.08}
              className={c.raised ? "md:-translate-y-8" : ""}
            >
              <div className="glass group h-full rounded-xl p-8 transition-colors duration-300 hover:bg-slate/80">
                <span
                  aria-hidden
                  className="mb-6 inline-block h-10 w-10 rounded-md"
                  style={{
                    background: `linear-gradient(135deg, ${c.accent}, transparent)`,
                    boxShadow: `0 0 24px -6px ${c.accent}`,
                  }}
                />
                <h3 className="display mb-4 text-2xl text-on-surface">{c.title}</h3>
                <p className="mb-6 leading-relaxed text-text-muted">{c.blurb}</p>
                <ul className="flex flex-col gap-3 font-mono text-xs text-on-surface-variant">
                  {c.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-center gap-2 border-b border-glass pb-2"
                    >
                      <span
                        aria-hidden
                        className="h-1 w-1 rounded-full"
                        style={{ background: c.accent }}
                      />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
