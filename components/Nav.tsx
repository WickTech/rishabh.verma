"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const LINKS = [
  { href: "/#expertise", label: "Expertise" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "Philosophy" },
  { href: "/#contact", label: "Contact" },
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
    <header
      className={`content-layer fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-glass bg-surface/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="display text-lg font-bold tracking-tight text-on-surface transition-opacity hover:opacity-70"
        >
          {profile.name}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${profile.email}`}
          className="rounded bg-gradient-to-r from-electric-blue to-soft-purple px-5 py-2 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90"
        >
          Hire me
        </a>
      </nav>
    </header>
  );
}
