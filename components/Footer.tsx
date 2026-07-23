import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="site content">
      <div className="wrap inner">
        <div>
          <p className="fn">{profile.name}</p>
          <p className="fnote">Crafted with technical precision.</p>
        </div>
        <nav>
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener">
              {s.label}
            </a>
          ))}
        </nav>
        <p className="cp">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
