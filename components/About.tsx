import { profile } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./motion/Reveal";

export function About() {
  return (
    <section id="about" className="content-layer scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="04" kicker="Philosophy" title="Who's behind it" />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Narrative inside a glass panel with a subtle inner glow */}
          <Reveal className="relative overflow-hidden rounded-2xl">
            <div className="glass relative flex flex-col gap-6 rounded-2xl p-8 md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-1/4 -top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
              />
              <p className="relative text-xl leading-relaxed text-on-surface">
                {profile.summary}
              </p>
              {profile.about.map((para) => (
                <p
                  key={para.slice(0, 24)}
                  className="relative leading-relaxed text-text-muted"
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-8">
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                Toolbox
              </h3>
              <ul className="flex flex-wrap gap-2">
                {profile.toolbox.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-glass bg-primary/5 px-3 py-1.5 text-sm text-text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                Based in
              </h3>
              <p className="text-on-surface">{profile.location}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
