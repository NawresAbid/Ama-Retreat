import ProgramSection from "@/components/ProgramSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Header from "../components/Header";
import DetailedProgramSection from "../components/DetailedProgramSection"; // C'est le bon composant pour afficher une liste de cartes

import About from "@/components/About";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full font-(family-name:--font-geist-sans)">
      <Header />

      <main className="grow">
        {/* Invisible H1 for SEO, doesn't affect design */}
        <h3 className="sr-only">
        &quot;Des retraites bien-être et culturelles pour se reconnecter, rencontrer et respirer. AMARETREAT réunit des personnes en quête de sens dans des lieux dʼexception.&quot;
        </h3>

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
