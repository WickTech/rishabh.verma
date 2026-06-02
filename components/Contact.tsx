import { profile } from "@/data/profile";
import { Reveal } from "./motion/Reveal";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden px-5 py-28 sm:px-8 sm:py-40">
      <div
        aria-hidden
        className="aurora left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, #ff3d8a, transparent 70%)", opacity: 0.25 }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-amber">
            Open to work & collaboration
          </p>
          <h2 className="display text-[clamp(2.5rem,9vw,7rem)] text-bone">
            Let&apos;s build
            <br />
            <span className="text-flux">something real.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-bone-muted">
            Have a product in mind, a role to fill, or just want to talk shop?
            My inbox is open.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-bone px-7 py-3.5 text-sm font-semibold text-void transition-transform hover:scale-[1.03]"
            >
              {profile.email}
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line-strong px-7 py-3.5 text-sm font-semibold text-bone transition-colors hover:border-amber hover:text-amber"
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
                className="group inline-flex items-center gap-2 text-sm text-bone-muted transition-colors hover:text-bone"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-bone-faint group-hover:text-amber">
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
