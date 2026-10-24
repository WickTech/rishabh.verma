import { profile } from "@/data/profile";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="reveal">
          <h2 className="display">Let&apos;s build something real.</h2>
          <p className="sub">
            Have a product in mind or a role to fill? Send a message and I will reply by email.
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
