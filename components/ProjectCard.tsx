"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
import { StatusBadge } from "./StatusBadge";
import { StackChips } from "./StackChips";

/**
 * Large featured project card. Alternates left/right on wide screens.
 * The visual half is a gradient "poster" with the product glyph; the
 * content half carries name, blurb, stack, highlights and links.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const flip = index % 2 === 1;
  const [from, to] = project.accent;

  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10"
    >
      {/* Poster */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${project.name} — view case study`}
        className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-line ${
          flip ? "lg:order-2" : ""
        }`}
        style={{
          backgroundImage: `radial-gradient(120% 120% at 0% 0%, ${from}33, transparent 55%), radial-gradient(120% 120% at 100% 100%, ${to}33, transparent 55%), linear-gradient(160deg, #14141f, #0d0d14)`,
        }}
      >
        <span
          aria-hidden
          className="select-none text-[clamp(4rem,14vw,9rem)] drop-shadow-lg transition-transform duration-500 ease-out group-hover:scale-110"
        >
          {project.emoji}
        </span>
        <span
          aria-hidden
          className="display pointer-events-none absolute bottom-4 left-5 text-5xl text-stroke opacity-40 sm:text-6xl"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `linear-gradient(160deg, ${from}1a, ${to}1a)` }}
        />
      </Link>

      {/* Content */}
      <div className={`flex flex-col justify-center gap-5 ${flip ? "lg:order-1" : ""}`}>
        <div className="flex items-center gap-3">
          <StatusBadge status={project.status} />
          <span className="font-mono text-xs text-bone-faint">{project.year}</span>
        </div>

        <div>
          <h3 className="display text-4xl text-bone sm:text-5xl">
            <Link
              href={`/projects/${project.slug}`}
              className="bg-gradient-to-r from-bone to-bone bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_2px]"
              style={{ backgroundImage: `linear-gradient(90deg, ${from}, ${to})` }}
            >
              {project.name}
            </Link>
          </h3>
          <p className="mt-3 max-w-md text-base leading-relaxed text-bone-muted">
            {project.tagline}
          </p>
        </div>

        <StackChips stack={project.stack} />

        <p className="font-mono text-xs uppercase tracking-wider text-bone-faint">
          {project.role}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-bone transition-colors hover:text-amber"
          >
            Case study
            <span aria-hidden>→</span>
          </Link>
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-bone-muted transition-colors hover:text-bone"
            >
              Live ↗
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-bone-muted transition-colors hover:text-bone"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
