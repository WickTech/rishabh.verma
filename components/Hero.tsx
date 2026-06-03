"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const SHIPPED = projects.map((p) => `${p.emoji} ${p.name}`);

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
    <section
      id="hero"
      className="content-layer relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pt-28 pb-16 sm:px-8"
    >
      {/* Faint ambient blobs reinforcing the deep-space lighting */}
      <div className="absolute inset-0 -z-10">
        <div
          className="aurora left-[-10%] top-[12%] h-[40vw] w-[40vw]"
          style={{ background: "radial-gradient(circle, #0070f3, transparent 70%)" }}
        />
        <div
          className="aurora right-[-8%] top-[34%] h-[36vw] w-[36vw]"
          style={{
            background: "radial-gradient(circle, #d16bff, transparent 70%)",
            animationDelay: "-8s",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        {/* "System Initialized" status chip */}
        <motion.div
          custom={0}
          variants={line}
          initial="hidden"
          animate="show"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
            {profile.role}
          </span>
        </motion.div>

        <h1 className="display text-[clamp(2.5rem,9vw,7rem)] text-on-surface">
          {profile.headline.map((ln, i) => (
            <motion.span
              key={ln}
              custom={i + 1}
              variants={line}
              initial="hidden"
              animate="show"
              className="block"
            >
              <span
                className={
                  i === profile.headline.length - 1 ? "text-flux" : "text-on-surface"
                }
              >
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
          className="mt-8 max-w-xl text-lg leading-relaxed text-text-muted"
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
            className="group inline-flex items-center gap-2 rounded bg-gradient-to-r from-electric-blue to-soft-purple px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            See the work
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-glass px-6 py-3 text-sm font-semibold text-on-surface transition-all hover:border-primary hover:shadow-[0_0_15px_rgba(209,188,255,0.2)]"
          >
            Résumé
          </a>
        </motion.div>
      </div>

      {/* Now-shipped ticker pinned to the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-glass bg-surface/40 py-3 backdrop-blur-sm">
        <div className="flex items-center">
          <span className="z-10 shrink-0 px-5 font-mono text-[11px] uppercase tracking-[0.3em] text-primary sm:px-8">
            Shipped&nbsp;/
          </span>
          <div className="overflow-hidden">
            <div className="marquee gap-10 font-mono text-[11px] uppercase tracking-widest text-text-faint">
              {[...SHIPPED, ...SHIPPED].map((item, i) => (
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
