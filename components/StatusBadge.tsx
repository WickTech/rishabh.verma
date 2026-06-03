import { STATUS_LABEL, type ProjectStatus } from "@/data/projects";

const STYLES: Record<ProjectStatus, string> = {
  live: "border-emerald-400/40 text-emerald-300 bg-emerald-400/10",
  oss: "border-soft-purple/40 text-soft-purple bg-soft-purple/10",
  wip: "border-tertiary/40 text-tertiary bg-tertiary/10",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wider ${STYLES[status]}`}
    >
      {status === "live" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
      )}
      {STATUS_LABEL[status]}
    </span>
  );
}
