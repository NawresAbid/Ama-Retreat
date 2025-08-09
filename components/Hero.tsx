import React from 'react';
// Assuming '@/components/ui/button' is a shadcn/ui button or similar component
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1602594748821-6df031e275e1?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
       <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Bienvenue à{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-stone-800">
              AMA RETREAT
            </span>
          </h2>
          <p className="text-2xl md:text-3xl font-serif text-white italic mb-8 leading-relaxed">
            Un espace sacré pour vous reconnecter à vous-même… et à
            l&apos;essentiel.
          </p>
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button 
            size="lg" 
            className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Réserver ma retraite
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
