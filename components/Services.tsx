import { SERVICES } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="sec">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2 className="display">Freelance services</h2>
          <p className="sec-sub">Quoted per project, after a short call about what you need.</p>
        </div>
        <ul className="svc-list">
          {SERVICES.map((s) => (
            <li key={s.title} className="svc reveal">
              <div className="svc-main">
                <h3 className="display">{s.title}</h3>
                <p>{s.blurb}</p>
                <p className="svc-proof">
                  {s.items.join(" · ")} — built before: {s.proof}
                </p>
              </div>
              <div className="svc-price">
                <span className="from">estimated</span>
                <span className="amt">{s.timeline}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="svc-note reveal">
          Every project is different, so there is no price list. Tell me what
          you are building and I will reply with a scoped quote.{" "}
          <a href="#contact">Get a quote →</a>
        </p>
      </div>
    </section>
  );
}
