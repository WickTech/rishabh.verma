import type { CSSProperties } from "react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { RotatingWord } from "./RotatingWord";
import { HeroLines } from "./HeroLines";
import { HeroFxLoader } from "./HeroFxLoader";
import { AskHeroButton } from "./AskHeroButton";
import { askEnabled } from "@/lib/ask/enabled";

const STATS = [
  { n: String(projects.filter((p) => p.links.github).length), l: "Open source work" },
  { n: String(projects.filter((p) => p.links.live).length), l: "Shipped projects" },
  { n: "20+", l: "REST APIs built and documented" },
  { n: "Remote", l: "Based in Durg, India" },
];

export function Hero() {
  return (
    <section id="hero">
      <HeroFxLoader />
      <HeroLines />
      <div className="wrap" style={{ width: "100%" }}>
        <div className="hero-grid">
          <div className="hero-left">
            <p className="hero-role reveal">{profile.role}</p>
            <h1 className="hero display">
              <span className="sr-only">
                I build {profile.heroVerbs.join(", ")} end to end.
              </span>
              <span aria-hidden className="line drop" style={{ "--d": 0 } as CSSProperties}>
                I build
              </span>
              <span aria-hidden className="line accent drop" style={{ "--d": 1 } as CSSProperties}>
                <RotatingWord words={profile.heroVerbs} />
              </span>
              <span aria-hidden className="line drop" style={{ "--d": 2 } as CSSProperties}>
                end to end.
              </span>
            </h1>
            <p className="hero-sub reveal">{profile.tagline}</p>
            <div className="hero-cta reveal">
              <a href="#work" className="btn-grad">
                See the work <span className="arrow">→</span>
              </a>
              {askEnabled() && <AskHeroButton />}
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
            <aside className="hero-now reveal" aria-label="Currently">
              <h2>Now</h2>
              <dl>
                <div>
                  <dt>Building</dt>
                  <dd>
                    <a href="https://kalakaarian.com" target="_blank" rel="noopener">
                      Kalakaarian ↗
                    </a>
                    <span>Live creator marketplace, solo founder</span>
                  </dd>
                </div>
                <div>
                  <dt>Previously</dt>
                  <dd>
                    Software Engineer, Futuredge
                    <span>Banking automation, until Mar 2026</span>
                  </dd>
                </div>
                <div>
                  <dt>Open to</dt>
                  <dd>
                    Full-time roles and freelance projects
                    <span>Remote, based in Durg, India</span>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
