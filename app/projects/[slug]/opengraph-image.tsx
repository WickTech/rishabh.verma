import { ImageResponse } from "next/og";
import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const name = project?.name ?? profile.name;
  const tagline = project?.tagline ?? profile.role;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f4ef",
          color: "#171612",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", opacity: 0.6 }}>
          {`${profile.name} / Case study`}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: name.length > 14 ? 128 : 168,
              fontWeight: 900,
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: -4,
            }}
          >
            {name}
          </div>
          <div style={{ fontSize: 36, marginTop: 28, opacity: 0.75, maxWidth: 960 }}>{tagline}</div>
        </div>
        <div style={{ fontSize: 26, opacity: 0.6 }}>{profile.url.replace("https://", "")}</div>
      </div>
    ),
    size,
  );
}
