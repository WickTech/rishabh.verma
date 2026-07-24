import { profile } from "@/data/profile";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact">
      <div className="glow" />
      <div className="wrap">
        <div className="reveal">
          <p className="kicker" style={{ marginBottom: 24 }}>
            Open to work &amp; collaboration
          </p>
          <h2 className="display">
            Let&apos;s build
            <br />
            <span className="flux">something real.</span>
          </h2>
          <p className="sub">
            Have a product in mind, a role to fill, or just want to talk shop? My
            inbox is open.
          </p>

          <ContactForm />

          <div className="cta" style={{ marginTop: 28 }}>
            <a
              href={`mailto:${profile.email}`}
              className="btn-ghost"
              style={{ padding: "12px 22px" }}
            >
              {profile.email}
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener"
              className="btn-ghost"
              style={{ padding: "12px 22px" }}
            >
              Download résumé
            </a>
          </div>
          <div className="socials">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener">
                <span className="lbl">{s.label}</span>
                {s.handle}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
