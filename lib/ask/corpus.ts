import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { SERVICES } from "@/data/services";

export interface Chunk {
  id: string;
  title: string;
  text: string;
  /** always included in the prompt, regardless of retrieval score */
  always?: boolean;
}

const list = (xs: readonly string[]) => xs.join("; ");

/**
 * Everything the assistant may say comes from here, built from the same data
 * files that render the site. Prices are deliberately left out: pricing
 * questions are redirected to the contact form.
 */
export function buildCorpus(): Chunk[] {
  const chunks: Chunk[] = [
    {
      id: "identity",
      title: "Who Rishabh is",
      always: true,
      text: `${profile.name} is a ${profile.role} based in ${profile.location}. ${profile.summary} Site: ${profile.url}. Email: ${profile.email}. Contact form: ${profile.url}/#contact.`,
    },
    {
      id: "about",
      title: "About and working style",
      text: `${profile.about.join(" ")} Toolbox: ${list(profile.toolbox)}.`,
    },
    ...profile.experience.map((e, i) => ({
      id: `experience-${i}`,
      title: `Experience: ${e.role} at ${e.org}`,
      text: `${e.role} at ${e.org} (${e.period}, ${e.location}). ${e.summary}`,
    })),
    {
      id: "education",
      title: "Education",
      text: profile.education
        .map((e) => `${e.credential}, ${e.org} (${e.period})`)
        .join(". "),
    },
    {
      id: "services",
      title: "Freelance services",
      text: `Rishabh takes fixed-price freelance projects, scoped on a short call. Services: ${SERVICES.map(
        (s) => `${s.title} (${s.blurb} Built before: ${s.proof}.)`,
      ).join(" ")} Pricing depends on scope; point people to ${profile.url}/#services and the contact form.`,
    },
    {
      id: "links",
      title: "Links and socials",
      text: profile.socials.map((s) => `${s.label}: ${s.href}`).join(". "),
    },
    ...projects.map((p) => {
      const cs = p.caseStudy;
      return {
        id: `project-${p.slug}`,
        title: `Project: ${p.name}`,
        text: [
          `${p.name} (${p.status === "live" ? "live" : p.status === "oss" ? "open source" : "in progress"}, ${p.year}, role: ${p.role}). ${p.tagline} ${p.description}`,
          `Stack: ${list(p.stack)}.`,
          `Highlights: ${list(p.highlights)}.`,
          p.links.live ? `Live: ${p.links.live}.` : "",
          p.links.github ? `GitHub: ${p.links.github}.` : "No public source (private repository).",
          `Page: /projects/${p.slug}.`,
          cs ? `Problem: ${cs.problem} Outcome: ${cs.outcome}` : "",
        ]
          .filter(Boolean)
          .join(" "),
      };
    }),
  ];
  return chunks;
}

/** Slugs and names the model is allowed to mention as projects. */
export const KNOWN_PROJECTS = projects.map((p) => p.name);
