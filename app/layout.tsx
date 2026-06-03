import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import { Scene } from "@/components/three/Scene";
import "./globals.css";

// Geist — display + body (DESIGN.md: "exceptional clarity, technical developer feel")
const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-geist",
  display: "swap",
});

// JetBrains Mono — labels, badges, technical metadata
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.summary,
  keywords: [
    "Rishabh Verma",
    "product builder",
    "AI engineer",
    "full-stack developer",
    "Next.js",
    "React",
    "portfolio",
  ],
  authors: [{ name: profile.name, url: profile.url }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: profile.url,
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
    siteName: `${profile.name} · Portfolio`,
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
    creator: "@rishabhverma707",
    images: ["/og.svg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`}>
      <body>
        {/* Persistent scroll-driven 3D scene (fixed, behind content) */}
        <Scene />
        {/* Cinematic ambient lighting */}
        <div className="ambient-glow" aria-hidden />
        {children}
      </body>
    </html>
  );
}
