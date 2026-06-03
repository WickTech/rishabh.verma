import { profile } from "@/data/profile";
import { Reveal } from "./motion/Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="content-layer relative scroll-mt-24 overflow-hidden px-5 py-28 sm:px-8 sm:py-40"
    >
      <div
        aria-hidden
        className="aurora left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, #d16bff, transparent 70%)", opacity: 0.22 }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Open to work &amp; collaboration
          </p>
          <h2 className="display text-[clamp(2.5rem,9vw,6rem)] text-on-surface">
            Let&apos;s build
            <br />
            <span className="text-flux">something real.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-text-muted">
            Have a product in mind, a role to fill, or just want to talk shop?
            My inbox is open.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="rounded bg-gradient-to-r from-electric-blue to-soft-purple px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {profile.email}
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-glass px-7 py-3.5 text-sm font-semibold text-on-surface transition-all hover:border-primary hover:shadow-[0_0_15px_rgba(209,188,255,0.2)]"
            >
              Download résumé
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-on-surface"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-text-faint group-hover:text-primary">
                  {s.label}
                </span>
                {s.handle}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
