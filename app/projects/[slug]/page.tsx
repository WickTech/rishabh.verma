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
  const cs = project.caseStudy;
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
      <main className="content px-5 pt-32 sm:px-8">
        <article className="mx-auto max-w-4xl">
          {/* Back */}
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-faint transition-colors hover:text-primary"
          >
            ← All work
          </Link>

          {/* Header */}
          <header className="mt-8">
            <div className="mb-5 flex items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="font-mono text-xs text-text-faint">{project.year}</span>
            </div>
            <div className="flex items-center gap-5">
              <span aria-hidden className="text-6xl sm:text-7xl">
                {project.emoji}
              </span>
              <h1 className="display text-5xl sm:text-7xl">
                <span className="text-flux">{project.name}</span>
              </h1>
            </div>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">
              {project.tagline}
            </p>
          </header>

          {/* Poster band */}
          <div
            className="mt-12 flex aspect-[2/1] items-center justify-center overflow-hidden rounded-xl border border-glass border-t-white/10"
            style={{
              backgroundImage: `radial-gradient(120% 120% at 0% 0%, ${from}33, transparent 55%), radial-gradient(120% 120% at 100% 100%, ${to}33, transparent 55%), linear-gradient(160deg, #1d1836, #0a0d1c)`,
            }}
          >
            <span aria-hidden className="text-[clamp(5rem,18vw,11rem)]">
              {project.emoji}
            </span>
          </div>

          {/* Metrics strip (case study) */}
          {cs && (
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-glass bg-glass sm:grid-cols-4">
              {cs.metrics.map((m) => (
                <div key={m.label} className="bg-surface-lowest p-6">
                  <div className="display text-4xl leading-none tracking-tight text-flux">
                    {m.value}
                  </div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Meta grid */}
          <div className="mt-12 grid gap-8 border-y border-glass py-8 sm:grid-cols-3">
            <div>
              <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                Role
              </h2>
              <p className="text-on-surface">{project.role}</p>
            </div>
            <div>
              <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                Status
              </h2>
              <p className="text-on-surface">{STATUS_LABEL[project.status]}</p>
            </div>
            <div>
              <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                Links
              </h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-on-surface transition-colors hover:text-primary"
                  >
                    Live ↗
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-on-surface transition-colors hover:text-primary"
                  >
                    GitHub ↗
                  </a>
                )}
                {!project.links.live && !project.links.github && (
                  <span className="text-text-faint">
                    {project.status === "wip" ? "Coming soon" : "Private"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Overview */}
          <section className="mt-12">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              Overview
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-on-surface">
              {project.description}
            </p>
          </section>

          {/* Problem */}
          {cs && (
            <section className="mt-12">
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                The problem
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-text-muted">
                {cs.problem}
              </p>
            </section>
          )}

          {/* Architecture */}
          {cs && (
            <section className="mt-12">
              <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                How it works
              </h2>
              <div className="flex flex-col gap-px overflow-hidden rounded-xl border border-glass bg-glass">
                {cs.architecture.map((a, i) => (
                  <div key={a.title} className="bg-surface-lowest p-6 sm:p-7">
                    <div className="flex items-baseline gap-4">
                      <span
                        aria-hidden
                        className="font-mono text-sm text-text-faint"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="display text-xl text-on-surface">
                          {a.title}
                        </h3>
                        <p className="mt-2 max-w-2xl leading-relaxed text-text-muted">
                          {a.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Highlights */}
          <section className="mt-12">
            <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              What it does
            </h2>
            <ul className="flex flex-col gap-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-text-muted">
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
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              Built with
            </h2>
            <StackChips stack={project.stack} />
          </section>

          {/* Outcome */}
          {cs && (
            <section className="mt-12">
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                Outcome
              </h2>
              <div
                className="glass rounded-xl p-7 sm:p-8"
                style={{ borderTopColor: "var(--glass-top)" }}
              >
                <p className="max-w-2xl text-lg leading-relaxed text-on-surface">
                  {cs.outcome}
                </p>
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-soft-purple"
                  >
                    See it live ↗
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Next project */}
          <Link
            href={`/projects/${next.slug}`}
            className="group mt-20 flex items-center justify-between gap-6 border-t border-glass py-10 transition-colors hover:border-line-strong"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                Next project
              </span>
              <p className="display mt-2 text-3xl text-on-surface transition-colors group-hover:text-primary sm:text-4xl">
                {next.emoji} {next.name}
              </p>
            </div>
            <span
              aria-hidden
              className="text-3xl text-text-faint transition-transform group-hover:translate-x-2 group-hover:text-primary"
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
