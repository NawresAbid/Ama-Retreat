import ProgramSection from "@/components/ProgramSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Header from "../components/Header";
import DetailedProgramSection from "../components/DetailedProgramSection"; // C'est le bon composant pour afficher une liste de cartes
import TestimonialsSection from "@/components/TestimonialsSection";
import About from "@/components/About";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full font-[family-name:var(--font-geist-sans)]">
      <Header/>
      <main className="flex-grow">
        <Hero/>
        <About/>
        <ProgramSection/>
        
        {/* C'est ici que vous affichez la section détaillée des programmes */}
        <DetailedProgramSection/>
       <TestimonialsSection/>
      
      </main>

      <div className="w-full">
        <Footer/>
      </div>
    </div>
  );
}
