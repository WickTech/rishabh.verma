import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Featured } from "@/components/Featured";
import { MoreProjects } from "@/components/MoreProjects";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Featured />
        <MoreProjects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
