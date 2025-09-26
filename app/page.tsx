import ProgramSection from "@/components/ProgramSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Header from "../components/Header";
import DetailedProgramSection from "../components/DetailedProgramSection"; // C'est le bon composant pour afficher une liste de cartes

import About from "@/components/About";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full font-[family-name:var(--font-geist-sans)]">
      <Header />

      <main className="flex-grow">
        {/* Invisible H1 for SEO, doesn't affect design */}
        <h1 className="sr-only">
          Ama Retreat – Retraites de yoga et bien-être en Tunisie
        </h1>

        {/* Keep your components exactly as they are */}
        <Hero />
        <About />
        <ProgramSection />
        <DetailedProgramSection />
        {/* <TestimonialsSection /> */}
      </main>

      <Footer />
    </div>
  );
}
