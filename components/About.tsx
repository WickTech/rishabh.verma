import { profile } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./motion/Reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" kicker="Who's behind it" title="About" />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="flex flex-col gap-6">
            <p className="text-xl leading-relaxed text-bone">{profile.summary}</p>
            {profile.about.map((para) => (
              <p key={para.slice(0, 24)} className="leading-relaxed text-bone-muted">
                {para}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-8">
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-bone-faint">
                Toolbox
              </h3>
              <ul className="flex flex-wrap gap-2">
                {profile.toolbox.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-line bg-ink px-3 py-1.5 text-sm text-bone-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-bone-faint">
                Based in
              </h3>
              <p className="text-bone">{profile.location}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
