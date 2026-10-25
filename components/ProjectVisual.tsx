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
  if (project.image?.fullPage) {
    const { width, height } = project.image.fullPage;
    return (
      <Image
        className="shot full"
        src={project.image.src}
        alt={project.image.alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        quality={85}
      />
    );
  }
  if (project.image) {
    return (
      <Image
        className="shot"
        src={project.image.src}
        alt={project.image.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={priority ? 90 : 80}
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
