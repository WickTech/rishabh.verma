import { moreProjects, STATUS_LABEL } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

export function MoreProjects() {
  return (
    <section id="more" className="sec">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2 className="display">More projects</h2>
          <p className="sec-sub">Smaller builds, tools and work in progress.</p>
        </div>
        <div className="more-grid">
          {moreProjects.map((p) => (
            <div className="card reveal" key={p.slug}>
              <div className="thumb">
                <ProjectVisual
                  project={p}
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="top">
                <h4 className="display">{p.name}</h4>
                <span className={`badge ${p.status}`}>
                  {STATUS_LABEL[p.status]}
                </span>
              </div>
              <p>{p.tagline}</p>
              <div className="foot">
                {p.stack.map((s) => (
                  <span className="chip-s" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <div className="links">
                <a className="pri" href={`/projects/${p.slug}`}>
                  Details →
                </a>
                {p.links.live && (
                  <a
                    href={p.links.live}
                    target="_blank"
                    rel="noopener"
                  >
                    Live site ↗
                  </a>
                )}
                {p.links.github && (
                  <a href={p.links.github} target="_blank" rel="noopener">
                    GitHub ↗
                  </a>
                )}
                {!p.links.live && !p.links.github && (
                  <span className="gh">Private</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
