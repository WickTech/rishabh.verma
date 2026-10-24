import { STATUS_LABEL, type ProjectStatus } from "@/data/projects";

const STYLES: Record<ProjectStatus, string> = {
  live: "bg-tint-sage text-tint-sage-ink",
  oss: "bg-tint-blue text-tint-blue-ink",
  wip: "bg-tint-sand text-tint-sand-ink",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wider ${STYLES[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
