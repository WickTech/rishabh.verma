import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Featured } from "@/components/Featured";
import { MoreProjects } from "@/components/MoreProjects";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { RevealInit } from "@/components/RevealInit";

export default function Home() {
  return (
    <>
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
