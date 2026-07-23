import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Expertise } from "@/components/Expertise";
import { Featured } from "@/components/Featured";
import { MoreProjects } from "@/components/MoreProjects";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { RevealInit } from "@/components/RevealInit";

/** Thin gradient rule that separates major sections (design "beam"). */
function Beam() {
  return (
    <div className="wrap content">
      <hr className="beam" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <RevealInit />
      <Nav />
      <main className="content">
        <Hero />
        <Beam />
        <Expertise />
        <Beam />
        <Featured />
        <Beam />
        <MoreProjects />
        <Beam />
        <About />
        <Beam />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
