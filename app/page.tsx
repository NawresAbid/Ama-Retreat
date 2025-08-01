import ProgramSection from "@/components/ProgramSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import  Header  from "../components/Header";
import DetailedProgramSection from "../components/DetailedProgramSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    // The main container is now a flexbox column that spans the full height and width of the viewport.
    // This removes the fixed grid structure and padding to allow components to extend to the edges.
    <div className="flex flex-col min-h-screen w-full font-[family-name:var(--font-geist-sans)]">
      {/* The main content area, now a flexible container that grows to fill available space. */}
      {/* It contains the Hero component, designed to take up the full viewport height. */}
      <Header/>
      <main className="flex-grow">
        
        <Hero/>
        
        <ProgramSection/>
       <DetailedProgramSection/>
       <TestimonialsSection/>
      </main>

      {/* The footer section, placed at the bottom of the flexbox column. */}
      {/* This ensures the footer is always at the bottom of the page. */}
      <div className="w-full">
        <Footer/>
      </div>
    </div>
  );
}