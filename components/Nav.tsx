"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "#expertise", label: "Expertise" },
  { href: "#about", label: "Philosophy" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav content${scrolled ? " scrolled" : ""}`}>
      <div className="wrap">
        <nav>
          <a href="#hero" className="brand">
            {profile.name}
          </a>
          <ul className="navlinks">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ThemeToggle />
            <a href={`mailto:${profile.email}`} className="btn-grad">
              Hire me
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
