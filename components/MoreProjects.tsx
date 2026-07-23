import { moreProjects, STATUS_LABEL } from "@/data/projects";

export function MoreProjects() {
  return (
    <section id="more" className="sec">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="k">
            <span className="kicker">Also building</span>
            <h2 className="display">More projects</h2>
          </div>
          <span className="idx display stroke">03</span>
        </div>
        <div className="more-grid">
          {moreProjects.map((p) => (
            <div className="card glass reveal" key={p.slug}>
              <div className="top">
                <span className="em">{p.emoji}</span>
                <span className={`badge ${p.status}`}>
                  {STATUS_LABEL[p.status]}
                </span>
              </div>
              <h4 className="display">{p.name}</h4>
              <p>{p.tagline}</p>
              <div className="foot">
                {p.stack.map((s) => (
                  <span className="chip-s" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              {p.links.github ? (
                <a
                  className="gh"
                  href={p.links.github}
                  target="_blank"
                  rel="noopener"
                >
                  View on GitHub ↗
                </a>
              ) : (
                <span className="gh" style={{ color: "var(--faint)" }}>
                  Private / WIP
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
