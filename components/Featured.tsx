import { featuredProjects, STATUS_LABEL } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

export function Featured() {
  const [flagship, ...rest] = featuredProjects;

  return (
    <section id="work" className="sec">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2 className="display">Selected work</h2>
          <p className="sec-sub">Products I&apos;ve built and shipped.</p>
        </div>

        {/* Flagship */}
        <div className="flagship reveal">
          <div className="flagship-inner">
            <div className={`poster has-shot${flagship.image?.fullPage ? " has-full" : ""}`}>
              <ProjectVisual
                project={flagship}
                priority
                sizes="(min-width: 900px) 900px, 100vw"
              />
            </div>
            <div className="body">
              <div className="meta">
                <span className={`badge ${flagship.status}`}>
                  {STATUS_LABEL[flagship.status]}
                </span>
                <span className="yr">{flagship.year}</span>
              </div>
              <h3 className="display">{flagship.tagline}</h3>
              <p>{flagship.description}</p>
              <ul className="hl">
                {flagship.highlights.map((h) => (
                  <li key={h}>
                    <svg viewBox="0 0 24 24" aria-hidden>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="chips">
                {flagship.stack.map((s) => (
                  <span className="chip-s" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <p className="role">{flagship.role}</p>
              <div className="links">
                {flagship.links.live && (
                  <a
                    className="pri"
                    href={flagship.links.live}
                    target="_blank"
                    rel="noopener"
                  >
                    Visit {flagship.links.live.replace(/^https?:\/\//, "")} →
                  </a>
                )}
                <a href={`/projects/${flagship.slug}`}>
                  {flagship.caseStudy ? "Case study →" : "Details →"}
                </a>
                {flagship.links.github && (
                  <a href={flagship.links.github} target="_blank" rel="noopener">
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Other featured */}
        <div className="feat-list">
          {rest.map((p) => (
            <article className="feat reveal" key={p.slug}>
              <div className={`poster${p.image ? " has-shot" : ""}`}>
                <ProjectVisual
                  project={p}
                  sizes="(min-width: 820px) 300px, 100vw"
                />
              </div>
              <div className="body">
                <div className="meta">
                  <span className={`badge ${p.status}`}>
                    {STATUS_LABEL[p.status]}
                  </span>
                  <span className="yr">{p.year}</span>
                </div>
                <h3 className="display">{p.name}</h3>
                <p>{p.tagline}</p>
                <div className="chips">
                  {p.stack.map((s) => (
                    <span className="chip-s" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
                <p className="role">{p.role}</p>
                <div className="links">
                  {p.links.live && (
                    <a
                      className="pri"
                      href={p.links.live}
                      target="_blank"
                      rel="noopener"
                    >
                      Visit live site →
                    </a>
                  )}
                  <a
                    className={p.links.live ? "" : "pri"}
                    href={`/projects/${p.slug}`}
                  >
                    {p.caseStudy ? "Case study →" : "Details →"}
                  </a>
                  {p.links.github && (
                    <a href={p.links.github} target="_blank" rel="noopener">
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
