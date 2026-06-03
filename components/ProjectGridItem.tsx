"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
import { StatusBadge } from "./StatusBadge";

/** Compact glass card for the "more projects" bento grid. */
export function ProjectGridItem({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const [from, to] = project.accent;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="glass group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl p-6 transition-colors hover:bg-slate/80"
      >
        {/* accent wash on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(120% 80% at 100% 0%, ${from}26, transparent 60%)` }}
        />

        <div className="flex items-start justify-between">
          <span
            aria-hidden
            className="text-4xl transition-transform duration-500 group-hover:scale-110"
          >
            {project.emoji}
          </span>
          <StatusBadge status={project.status} />
        </div>

        <div className="relative">
          <h3 className="display text-2xl text-on-surface">{project.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {project.tagline}
          </p>
        </div>

        <ul className="relative mt-auto flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((t) => (
            <li
              key={t}
              className="rounded-full border border-glass px-2 py-0.5 font-mono text-[10px] text-text-faint"
            >
              {t}
            </li>
          ))}
        </ul>

        <span
          aria-hidden
          className="relative font-mono text-xs text-text-faint transition-colors group-hover:text-primary"
        >
          View →
        </span>
      </Link>
    </motion.div>
  );
}
