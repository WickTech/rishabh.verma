import { profile } from "@/data/profile";

export function Experience() {
  return (
    <section id="experience" className="sec">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="k">
            <span className="kicker">Track record</span>
            <h2 className="display">Experience</h2>
          </div>
          <span className="idx display stroke">03</span>
        </div>

        <div className="timeline">
          {profile.experience.map((e) => (
            <div className="tl-item reveal" key={`${e.org}-${e.role}`}>
              <div className="tl-when">
                {e.period}
                <span className="tl-loc">{e.location}</span>
              </div>
              <div className="tl-body">
                <h3>{e.role}</h3>
                <div className="org">{e.org}</div>
                <p>{e.summary}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="edu reveal">
          {profile.education.map((ed) => (
            <div className="edu-item" key={ed.org}>
              <div className="cred">{ed.credential}</div>
              <div className="where">{ed.org}</div>
              <div className="yrs">{ed.period}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
