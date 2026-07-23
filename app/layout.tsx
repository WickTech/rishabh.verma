import type { Metadata } from "next";
import { Archivo, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import { profile } from "@/data/profile";
import { NetworkCanvas } from "@/components/NetworkCanvas";
import "./globals.css";

// Archivo — display + body (the design's primary typeface)
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

// Source Serif 4 — editorial serif accents
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

// JetBrains Mono — labels, badges, technical metadata
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
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

// Set the persisted theme on <html> before first paint (no flash of dark).
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('rv-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${archivo.variable} ${sourceSerif.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        {/* Fixed background layers (z-0/1), behind the content layer (z-10) */}
        <NetworkCanvas />
        <div className="grid-tex" aria-hidden />
        <div className="ambient" aria-hidden />
        {children}
      </body>
    </html>
  );
}
