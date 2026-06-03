import { moreProjects } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import { ProjectGridItem } from "./ProjectGridItem";

export function MoreProjects() {
  return (
    <section id="more" className="content-layer scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" kicker="Also building" title="More projects" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((project, i) => (
            <ProjectGridItem key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
