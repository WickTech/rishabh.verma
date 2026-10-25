import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Featured } from "@/components/Featured";
import { MoreProjects } from "@/components/MoreProjects";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { profile } from "@/data/profile";
import { RevealInit } from "@/components/RevealInit";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.role,
            url: profile.url,
            email: profile.email,
            address: { "@type": "PostalAddress", addressLocality: "Durg", addressCountry: "IN" },
            sameAs: profile.socials.map((s) => s.href).filter((h) => h.startsWith("http")),
          }),
        }}
      />
      <RevealInit />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" className="content">
        <Hero />
        <Featured />
        <MoreProjects />
        <Experience />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
