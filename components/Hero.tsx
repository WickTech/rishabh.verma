"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const NOW_BUILDING = projects.map((p) => `${p.emoji} ${p.name}`);

export function Hero() {
  const reduce = useReducedMotion();

  const line = {
    hidden: { opacity: 0, y: reduce ? 0 : 40 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pt-24 pb-16 sm:px-8">
      {/* Aurora blobs */}
      <div className="absolute inset-0 -z-10">
        <div
          className="aurora left-[-10%] top-[10%] h-[42vw] w-[42vw]"
          style={{ background: "radial-gradient(circle, #ff5e3a, transparent 70%)" }}
        />
        <div
          className="aurora right-[-8%] top-[30%] h-[38vw] w-[38vw]"
          style={{
            background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
            animationDelay: "-6s",
          }}
        />
        <div
          className="aurora bottom-[-10%] left-[30%] h-[34vw] w-[34vw]"
          style={{
            background: "radial-gradient(circle, #ff3d8a, transparent 70%)",
            animationDelay: "-12s",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          custom={0}
          variants={line}
          initial="hidden"
          animate="show"
          className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-bone-muted"
        >
          <span className="h-px w-10 bg-amber" />
          {profile.role}
        </motion.p>

        <h1 className="display text-[clamp(2.75rem,11vw,9rem)]">
          {profile.headline.map((ln, i) => (
            <motion.span
              key={ln}
              custom={i + 1}
              variants={line}
              initial="hidden"
              animate="show"
              className="block"
            >
              <span className={i === profile.headline.length - 1 ? "text-flux" : "text-bone"}>
                {ln}
              </span>
            </motion.span>
          ))}
        </h1>

        <motion.p
          custom={profile.headline.length + 1}
          variants={line}
          initial="hidden"
          animate="show"
          className="mt-8 max-w-xl text-lg leading-relaxed text-bone-muted"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          custom={profile.headline.length + 2}
          variants={line}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-bone px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03]"
          >
            See the work
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-bone transition-colors hover:border-amber hover:text-amber"
          >
            Résumé
          </a>
        </motion.div>
      </div>

      {/* Now-building ticker pinned to the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-line bg-void/40 py-3 backdrop-blur-sm">
        <div className="flex items-center">
          <span className="z-10 shrink-0 bg-void/0 px-5 font-mono text-[11px] uppercase tracking-[0.3em] text-amber sm:px-8">
            Shipped&nbsp;/
          </span>
          <div className="overflow-hidden">
            <div className="marquee gap-10 font-mono text-[11px] uppercase tracking-widest text-bone-faint">
              {[...NOW_BUILDING, ...NOW_BUILDING].map((item, i) => (
                <span key={i} className="px-3">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
