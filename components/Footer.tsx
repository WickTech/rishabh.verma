import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="content-layer border-t border-glass bg-surface-lowest/60 px-5 py-12 backdrop-blur-sm sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="display text-sm font-bold tracking-tight text-on-surface">
            {profile.name}
          </p>
          <p className="mt-1 font-mono text-xs text-text-faint">
            Crafted with technical precision.
          </p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-text-muted transition-all duration-200 hover:-translate-y-0.5 hover:text-soft-purple"
            >
              {s.label}
            </a>
          ))}
        </nav>
        <p className="font-mono text-xs text-text-faint">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
