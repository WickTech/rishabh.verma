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
          className="rounded-full border border-glass bg-primary/5 px-2.5 py-1 font-mono text-xs text-on-surface-variant"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}
