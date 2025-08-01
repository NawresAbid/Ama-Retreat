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
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in">
          Reconnectez-vous
          <br />
          <span className="text-gold-300">avec vous-même</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Une semaine de bien-être complet dans un cadre naturel exceptionnel.
          Yoga, alimentation saine, sport et massages vous attendent.
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
