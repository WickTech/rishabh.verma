import { profile } from "@/data/profile";

interface Service {
  title: string;
  blurb: string;
  price: string;
  timeline: string;
  proof: string;
  items: string[];
}

const SERVICES: Service[] = [
  {
    title: "Business & portfolio websites",
    blurb:
      "Fast, SEO-ready sites with a clean design, contact forms and analytics. Static-first, deployed on Vercel.",
    price: "₹15,000",
    timeline: "1–2 weeks",
    proof: "Sāmya, this portfolio",
    items: ["Next.js + Tailwind", "SEO & JSON-LD", "Forms & analytics"],
  },
  {
    title: "Full-stack web app / MVP",
    blurb:
      "Auth, database, dashboards and a deployable product, scoped tight so the first version ships fast.",
    price: "₹80,000",
    timeline: "4–8 weeks",
    proof: "Kalakaarian, LogiPilot, Atlas",
    items: ["React / Next.js + Node", "Supabase / Postgres", "CI & deploy"],
  },
  {
    title: "AI features & automation",
    blurb:
      "Streaming chat, retrieval-augmented answers with citations and an evaluation harness, or scheduled LLM pipelines.",
    price: "₹50,000",
    timeline: "2–4 weeks",
    proof: "Nimbus AI, Lumen RAG, autoflow",
    items: ["LLMs & RAG", "Vercel AI SDK", "Evals & fallbacks"],
  },
  {
    title: "Payments & backend APIs",
    blurb:
      "Razorpay checkout, wallets and escrow, idempotent REST APIs and webhooks that stay correct under retries.",
    price: "₹60,000",
    timeline: "3–5 weeks",
    proof: "Kalakaarian, walletd",
    items: ["Razorpay", "Ledgers & webhooks", "REST API design"],
  },
];

export function Services() {
  return (
    <section id="services" className="sec">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="k">
            <span className="kicker">Work with me</span>
            <h2 className="display">Services</h2>
          </div>
          <span className="idx display stroke">06</span>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s) => (
            <div key={s.title} className="exp glass svc reveal">
              <h3 className="display">{s.title}</h3>
              <p>{s.blurb}</p>
              <div className="svc-price">
                <span className="from">from</span>
                <span className="flux">{s.price}</span>
                <span className="tl">· {s.timeline}</span>
              </div>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>
                    <i style={{ background: "var(--secondary)" }} />
                    {it}
                  </li>
                ))}
              </ul>
              <p className="svc-proof">Built before: {s.proof}</p>
            </div>
          ))}
        </div>
        <p className="svc-note reveal">
          Fixed-price quotes after a short scope call. Prices are starting
          points in INR, excluding GST and third-party costs (hosting, APIs).{" "}
          <a href={`mailto:${profile.email}?subject=Project%20enquiry`}>
            Get a quote →
          </a>
        </p>
      </div>
    </section>
  );
}
