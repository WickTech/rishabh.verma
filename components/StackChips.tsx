export function StackChips({
  stack,
  className = "",
}: {
  stack: string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-md border border-line bg-ink px-2.5 py-1 font-mono text-xs text-bone-muted"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}
