import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, STATUS_LABEL } from "@/data/projects";
import { profile } from "@/data/profile";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StatusBadge } from "@/components/StatusBadge";
import { StackChips } from "@/components/StackChips";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  const title = `${project.name} — ${project.tagline}`;
  return {
    title: `${project.name}`,
    description: project.description,
    openGraph: {
      title,
      description: project.description,
      url: `${profile.url}/projects/${project.slug}`,
      images: [{ url: "/og.svg", width: 1200, height: 630, alt: project.name }],
    },
    twitter: { card: "summary_large_image", title, description: project.description },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const [from, to] = project.accent;
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    author: { "@type": "Person", name: profile.name, url: profile.url },
    ...(project.links.live ? { url: project.links.live } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="px-5 pt-28 sm:px-8">
        <article className="mx-auto max-w-4xl">
          {/* Back */}
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bone-faint transition-colors hover:text-bone"
          >
            ← All work
          </Link>

          {/* Header */}
          <header className="mt-8">
            <div className="mb-5 flex items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="font-mono text-xs text-bone-faint">{project.year}</span>
            </div>
            <div className="flex items-center gap-5">
              <span aria-hidden className="text-6xl sm:text-7xl">
                {project.emoji}
              </span>
              <h1 className="display text-5xl sm:text-7xl">
                <span className="text-flux">{project.name}</span>
              </h1>
            </div>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-bone-muted">
              {project.tagline}
            </p>
          </header>

          {/* Poster band */}
          <div
            className="mt-12 flex aspect-[2/1] items-center justify-center overflow-hidden rounded-2xl border border-line"
            style={{
              backgroundImage: `radial-gradient(120% 120% at 0% 0%, ${from}33, transparent 55%), radial-gradient(120% 120% at 100% 100%, ${to}33, transparent 55%), linear-gradient(160deg, #14141f, #0d0d14)`,
            }}
          >
            <span aria-hidden className="text-[clamp(5rem,18vw,11rem)]">
              {project.emoji}
            </span>
          </div>

          {/* Meta grid */}
          <div className="mt-12 grid gap-8 border-y border-line py-8 sm:grid-cols-3">
            <div>
              <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-bone-faint">
                Role
              </h2>
              <p className="text-bone">{project.role}</p>
            </div>
            <div>
              <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-bone-faint">
                Status
              </h2>
              <p className="text-bone">{STATUS_LABEL[project.status]}</p>
            </div>
            <div>
              <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-bone-faint">
                Links
              </h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone transition-colors hover:text-amber"
                  >
                    Live ↗
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone transition-colors hover:text-amber"
                  >
                    GitHub ↗
                  </a>
                )}
                {!project.links.live && !project.links.github && (
                  <span className="text-bone-faint">
                    {project.status === "wip" ? "Coming soon" : "Private"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Overview */}
          <section className="mt-12">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-bone-faint">
              Overview
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-bone">
              {project.description}
            </p>
          </section>

          {/* Highlights */}
          <section className="mt-12">
            <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-bone-faint">
              What it does
            </h2>
            <ul className="flex flex-col gap-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-bone-muted">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
                  />
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Stack */}
          <section className="mt-12">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-bone-faint">
              Built with
            </h2>
            <StackChips stack={project.stack} />
          </section>

          {/* Next project */}
          <Link
            href={`/projects/${next.slug}`}
            className="group mt-20 flex items-center justify-between gap-6 border-t border-line py-10 transition-colors hover:border-line-strong"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-bone-faint">
                Next project
              </span>
              <p className="display mt-2 text-3xl text-bone transition-colors group-hover:text-amber sm:text-4xl">
                {next.emoji} {next.name}
              </p>
            </div>
            <span
              aria-hidden
              className="text-3xl text-bone-faint transition-transform group-hover:translate-x-2 group-hover:text-amber"
            >
              →
            </span>
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
