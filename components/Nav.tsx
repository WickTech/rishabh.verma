"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav content${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}>
      <div className="scroll-progress" aria-hidden style={{ transform: `scaleX(${progress})` }} />
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
            <button
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? "Close" : "Menu"}
            </button>
            <ThemeToggle />
            <a href="#contact" className="btn-grad nav-cta">
              Get in touch
            </a>
          </div>
        </nav>
        {open && (
          <ul id="mobile-menu" className="mobile-menu">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mobile-cta">
              <a href="#contact" onClick={() => setOpen(false)}>
                Get in touch
              </a>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
