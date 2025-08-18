"use client";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define colors directly within the component
  const colors = {
    white: '#FFFFFF',
    beige200: '#EEE4D1', // For border
    brown600: '#7A5230', // For logo
    brown700: '#6B4728', // For navigation text
    gold500: '#D4AF37', // For hover underline
    gold600: '#B58C58', // For hover text
  };

  const navigationItems = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Programme', href: '#programme' },
    { name: 'À propos', href: '#apropos' },
    
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm"
      style={{ backgroundColor: `${colors.white}E6` }} // 90% opacity white
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-serif font-bold" style={{ color: colors.brown600 }}>
              AMA Retreat
            </h1>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                  style={{ color: colors.brown700 }}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.gold600}
                  onMouseLeave={(e) => e.currentTarget.style.color = colors.brown700}
                  onClick={item.name === 'Contact' ? (e) => {
                    e.preventDefault();
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  } : undefined}
                >
                  {item.name}
                  {/* The underline animation still uses Tailwind's group-hover for simplicity and effectiveness */}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: colors.gold500 }}
                  ></span>
                </a>
              ))}
            </div>
          </nav>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              style={{ color: colors.brown700 }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.gold600}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.brown700}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: colors.white, borderColor: colors.beige200 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium transition-colors duration-200"
                style={{ color: colors.brown700 }}
                onClick={item.name === 'Contact' ? (e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                } : () => setIsMenuOpen(false)}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.gold600}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.brown700}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
