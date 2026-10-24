import Image from "next/image";
import type { Project } from "@/data/projects";

/** Screenshot when the project has one, otherwise a flat tinted spec tile. */
export function ProjectVisual({
  project,
  sizes,
  priority = false,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
}) {
  if (project.image) {
    return (
      <Image
        className="shot"
        src={project.image.src}
        alt={project.image.alt}
        fill
        sizes={sizes}
        priority={priority}
      />
    );
  }
  return (
    <div className={`spec tint-${project.tint}`}>
      <ol className="spec-steps">
        {(project.spec ?? project.tagline).split(" → ").map((step) => (
          <li key={step}>
            <code>{step}</code>
          </li>
        ))}
      </ol>
    </div>
  );
}
