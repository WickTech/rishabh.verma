import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="display text-sm tracking-tight text-bone-muted">
          {profile.name}
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-bone-faint transition-colors hover:text-bone"
            >
              {s.label}
            </a>
          ))}
        </nav>
        <p className="font-mono text-xs text-bone-faint">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
