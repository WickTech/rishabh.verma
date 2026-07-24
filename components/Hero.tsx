import Image from "next/image";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const SHIPPED = projects.map((p) => `${p.emoji} ${p.name}`);

const STATS = [
  { n: "9", l: "Products shipped" },
  { n: "1", l: "Live marketplace" },
  { n: "∞", l: "Full-stack + AI" },
  { n: "Durg", l: "India, remote-ready" },
];

export function Hero() {
  return (
    <section id="hero">
      <div
        className="aurora"
        style={{
          left: "-10%",
          top: "12%",
          height: "40vw",
          width: "40vw",
          background: "radial-gradient(circle,#0070f3,transparent 70%)",
        }}
      />
      <div
        className="aurora"
        style={{
          right: "-8%",
          top: "34%",
          height: "36vw",
          width: "36vw",
          background: "radial-gradient(circle,#d16bff,transparent 70%)",
          animationDelay: "-8s",
        }}
      />
      <div className="wrap" style={{ width: "100%" }}>
        <div className="hero-grid">
          <div className="hero-left">
            <div className="chip reveal">
              <span className="dot">
                <span />
                <span />
              </span>
              <span className="lbl">{profile.role}</span>
            </div>
            <h1 className="hero display">
              {profile.headline.map((ln, i) => (
                <span className="line reveal" key={ln}>
                  {i === profile.headline.length - 1 ? (
                    <span className="flux">{ln}</span>
                  ) : (
                    ln
                  )}
                </span>
              ))}
            </h1>
            <p className="hero-sub reveal">{profile.tagline}</p>
            <div className="hero-cta reveal">
              <a href="#work" className="btn-grad">
                See the work <span className="arrow">→</span>
              </a>
            </div>
            <div className="stats reveal">
              {STATS.map((s) => (
                <div className="stat" key={s.l}>
                  <div className="n">
                    <span className="flux">{s.n}</span>
                  </div>
                  <div className="l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-portrait reveal">
            <div className="pglow" aria-hidden />
            <div className="frame">
              <Image
                src="/portrait.jpeg"
                alt={`${profile.name} — ${profile.role}`}
                width={1023}
                height={1537}
                priority
                sizes="(min-width: 980px) 400px, 340px"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="ticker">
        <div className="row">
          <span className="tag">Shipped /</span>
          <div className="marquee-mask">
            <div className="marquee">
              {[...SHIPPED, ...SHIPPED].map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
