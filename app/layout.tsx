import type { Metadata } from "next";
import { Archivo, Big_Shoulders, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import { AskLauncher } from "@/components/AskLauncher";
import { askEnabled } from "@/lib/ask/enabled";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Archivo — body and UI
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

// Big Shoulders: condensed heavy display face for headings
const condensed = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-condensed",
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
    images: [{ url: "/og.png", width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
    creator: "@rishabhverma707",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

// Set the persisted theme on <html> before first paint (light is the default; no flash).
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('rv-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${archivo.variable} ${condensed.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <div className="frame">{children}</div>
        {askEnabled() && <AskLauncher />}
        <Analytics />
      </body>
    </html>
  );
}
