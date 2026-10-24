import { profile } from "@/data/profile";

const COMPETENCIES = [
  {
    title: "Engineering",
    blurb:
      "End-to-end product engineering: scalable architecture, typed APIs, and performant front-ends on modern stacks.",
    items: ["React / Next.js", "Node.js / FastAPI", "Supabase / Postgres"],
  },
  {
    title: "AI & systems",
    blurb:
      "LLM products wired the way real software needs: streaming, RAG with evaluation harnesses, billing ledgers, and orchestration.",
    items: ["LLMs & RAG", "Vercel AI SDK", "Evaluation & retrieval"],
  },
  {
    title: "Product",
    blurb:
      "Scoping tightly and shipping the smallest genuinely useful thing first, then iterating against real outcomes.",
    items: ["Roadmap & scope", "Two-sided marketplaces", "Payments & escrow"],
  },
];

export function About() {
  return (
    <section id="about" className="sec">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2 className="display">About</h2>
        </div>
        <div className="about-grid">
          <div className="about-main reveal">
            <p className="lead">{profile.summary}</p>
            {profile.about.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
          <div className="about-side reveal">
            <div>
              <h3>Toolbox</h3>
              <ul className="tools">
                {profile.toolbox.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Based in</h3>
              <p>{profile.location}</p>
            </div>
            <div>
              <h3>Off the clock</h3>
              <p>
                Musician at heart. I go by <strong>@rishi_musicoholic</strong>.
                The same instinct for rhythm and iteration shows up in how I
                ship.
              </p>
            </div>
          </div>
        </div>

        <div className="comp-grid">
          {COMPETENCIES.map((c) => (
            <div className="comp reveal" key={c.title}>
              <h3 className="display">{c.title}</h3>
              <p>{c.blurb}</p>
              <ul>
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
