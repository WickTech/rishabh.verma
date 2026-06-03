import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Expertise } from "@/components/Expertise";
import { Featured } from "@/components/Featured";
import { MoreProjects } from "@/components/MoreProjects";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

/** Thin gradient rule that separates major sections (DESIGN.md "Glow Beam"). */
function GlowBeam() {
  return (
    <div className="content-layer mx-auto max-w-6xl px-5 sm:px-8">
      <hr className="glow-beam" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <GlowBeam />
        <Expertise />
        <GlowBeam />
        <Featured />
        <GlowBeam />
        <MoreProjects />
        <GlowBeam />
        <About />
        <GlowBeam />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
