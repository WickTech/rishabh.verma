import { profile } from "@/data/profile";
import { SERVICES } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="sec">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2 className="display">Freelance services</h2>
          <p className="sec-sub">Fixed-price projects, scoped on a short call.</p>
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
                <span className="from">from</span>
                <span className="amt">{s.price}</span>
                <span className="tl">{s.timeline}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="svc-note reveal">
          Prices are starting points in INR, excluding GST and third-party costs
          (hosting, APIs).{" "}
          <a href={`mailto:${profile.email}?subject=Project%20enquiry`}>
            Get a quote →
          </a>
        </p>
      </div>
    </section>
  );
}
