import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const STATS = [
  { n: String(projects.length), l: "Projects built" },
  { n: "1", l: "Live marketplace" },
  { n: "20+", l: "REST APIs built and documented" },
  { n: "Remote", l: "Based in Durg, India" },
];

export function Hero() {
  return (
    <section id="hero">
      <div className="wrap" style={{ width: "100%" }}>
        <div className="hero-grid">
          <div className="hero-left">
            <p className="hero-role reveal">{profile.role}</p>
            <h1 className="hero display">
              {profile.headline.map((ln) => (
                <span className="line reveal" key={ln}>
                  {ln}
                </span>
              ))}
            </h1>
            <p className="hero-sub reveal">{profile.tagline}</p>
            <div className="hero-cta reveal">
              <a href="#work" className="btn-grad">
                See the work <span className="arrow">→</span>
              </a>
              <a href={profile.resume} className="btn-ghost" download>
                Download CV
              </a>
              <a href="#services" className="text-link">
                Hire me for a project
              </a>
            </div>
            <div className="stats reveal">
              {STATS.map((s) => (
                <div className="stat" key={s.l}>
                  <div className="n">{s.n}</div>
                  <div className="l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
