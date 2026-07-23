import { featuredProjects, STATUS_LABEL } from "@/data/projects";

const poster = (a: [string, string]) =>
  `radial-gradient(120% 120% at 0% 0%,${a[0]}33,transparent 55%),radial-gradient(120% 120% at 100% 100%,${a[1]}33,transparent 55%),linear-gradient(160deg,var(--card-a),var(--card-b))`;

export function Featured() {
  const [flagship, ...rest] = featuredProjects;

  return (
    <section id="work" className="sec">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="k">
            <span className="kicker">Selected work</span>
            <h2 className="display">Products I&apos;ve shipped</h2>
          </div>
          <span className="idx display stroke">02</span>
        </div>

        {/* Flagship */}
        <div className="flagship reveal">
          <div className="flagship-inner">
            <div className="poster">
              <div className="flag-glow" />
              <div className="meta">
                <span className="badge live">
                  <span className="dot" style={{ height: 6, width: 6 }}>
                    <span style={{ background: "#34d399" }} />
                    <span style={{ background: "#34d399" }} />
                  </span>
                  Live in production
                </span>
                <span className="yr" style={{ color: "var(--tertiary)" }}>
                  {flagship.year} · Flagship
                </span>
              </div>
              <div className="big">
                {flagship.name.slice(0, 4)}
                <em>{flagship.name.slice(4)}</em>
              </div>
              {flagship.links.live && (
                <a
                  href={flagship.links.live}
                  target="_blank"
                  rel="noopener"
                  className="url"
                >
                  {flagship.links.live.replace(/^https?:\/\//, "")} <span>↗</span>
                </a>
              )}
            </div>
            <div className="body">
              <h3 className="display">{flagship.tagline}</h3>
              <p>{flagship.description}</p>
              <ul className="hl">
                {flagship.highlights.map((h) => (
                  <li key={h}>
                    <svg viewBox="0 0 24 24">
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
                    Visit live site →
                  </a>
                )}
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
          {rest.map((p, i) => (
            <article className="feat reveal" key={p.slug}>
              <div
                className="poster"
                style={{ backgroundImage: poster(p.accent) }}
              >
                <span className="em">{p.emoji}</span>
                <span className="num stroke display">0{i + 2}</span>
              </div>
              <div className="body">
                <div className="meta">
                  <span className={`badge ${p.status}`}>
                    {p.status === "live" && (
                      <span className="dot" style={{ height: 6, width: 6 }}>
                        <span />
                        <span />
                      </span>
                    )}
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
                  {p.caseStudy && (
                    <a className="pri" href={`/projects/${p.slug}`}>
                      Case study →
                    </a>
                  )}
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
