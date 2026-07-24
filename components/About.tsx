import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" className="sec">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="k">
            <span className="kicker">Philosophy</span>
            <h2 className="display">Who&apos;s behind it</h2>
          </div>
          <span className="idx display stroke">02</span>
        </div>
        <div className="about-grid">
          <div className="about-panel glass reveal">
            <div className="glow" />
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
              <p style={{ color: "var(--on-surface)" }}>{profile.location}</p>
            </div>
            <div>
              <h3>Off the clock</h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                Musician at heart — I go by{" "}
                <span style={{ color: "var(--on-surface)" }}>
                  @rishi_musicoholic
                </span>
                . The same instinct for rhythm and iteration shows up in how I
                ship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
