"use client"; // This component uses useState, so it must be a Client Component

import { useState } from 'react';
import { MapPin, Clock, Users, Euro } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Define colors directly within the component, adjusted to match the image more closely
const colors = {
  beige50: '#FDF8F0', // Lighter background, closer to the image's overall light tone
  beige100: '#F9ECD9', // Slightly darker beige for gradient, still light
  brown600: '#7A5230', // A softer, warmer brown for descriptions and general text
  brown800: '#5C3A1F', // A deeper, richer brown for headings
  gold100: '#E0B87A', // A muted, warm gold for the gradient start
  gold600: '#B58C58', // A slightly darker, more earthy gold for icons and button background
  gold700: '#A37E4C', // A darker gold for button hover state
  white: '#FFFFFF', // For button text
};

// Define the SVG icons as a map with explicit prop typing
const customIcons = {
  yoga: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  alimentation: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 2c.5 1.5 1 3 1 5s-.5 3.5-1 5c-.5 1.5-1 3-1 5h2c0-2 1-4 1.5-5.5.5-1.5 1-3 1-5s-.5-3.5-1-5c-.5-1.5-1-3-1-5H7z"/>
      <path d="M17 2c-.5 1.5-1 3-1 5s.5 3.5 1 5c.5 1.5 1 3 1 5h-2c0-2-1-4-1.5-5.5-.5-1.5-1-3-1-5s.5-3.5 1-5c.5-1.5 1-3 1-5h2z"/>
      <line x1="12" y1="2" x2="12" y2="22" strokeWidth="1"/>
    </svg>
  ),
  sport: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h3.5l2.5-8 5 16 2.5-8H21"/>
    </svg>
  ),
  massage: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/>
      <path d="M20 10l-1.5 1.5L17 13l1.5 1.5L20 16l1.5-1.5L23 13l-1.5-1.5L20 10z"/>
      <path d="M4 10l-1.5 1.5L1 13l1.5 1.5L4 16l1.5-1.5L7 13l-1.5-1.5L4 10z"/>
    </svg>
  ),
};

interface ProgramData {
  id: string;
  title: string;
  description: string;
  duration: string;
  capacity: number;
  price: number;
  location: {
    address: string;
    city: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  instructor: string;
  schedule: string[];
}

interface ProgramCardProps {
  program: ProgramData;
  iconType: keyof typeof customIcons;
  iconColor: string;
  buttonBgColor: string; // Nouvelle propriété pour la couleur de fond du bouton
  buttonTextColor: string; // Nouvelle propriété pour la couleur du texte du bouton
}

const ProgramCard = ({ program, iconType, iconColor, buttonBgColor, buttonTextColor }: ProgramCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const IconComponent = customIcons[iconType]; // Get the actual component from the map

  // State to manage button hover color
  const [currentButtonBgColor, setCurrentButtonBgColor] = useState(buttonBgColor);

  return (
    <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md">
      <CardHeader className="text-center pb-4">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br mb-4"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${colors.gold100}, ${colors.beige100})`,
            color: iconColor, // Apply the icon-specific color
          }}
        >
          {IconComponent && <IconComponent width={32} height={32} />} {/* Render the icon */}
        </div>
        <CardTitle className="text-xl font-serif" style={{ color: colors.brown800 }}>
          {program.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-center leading-relaxed" style={{ color: colors.brown600 }}>
          {program.description}
        </CardDescription>

        <div className="flex items-center justify-between text-sm" style={{ color: colors.brown600 }}>
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{program.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>{program.capacity} pers. max</span>
          </div>
          <div className="flex items-center space-x-1">
            <Euro size={16} />
            <span>{program.price}€</span>
          </div>
        </div>

        <Button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full"
          style={{ backgroundColor: currentButtonBgColor, color: buttonTextColor }} // Utilise les nouvelles propriétés
          onMouseEnter={() => setCurrentButtonBgColor(colors.gold700)} // Change color on hover
          onMouseLeave={() => setCurrentButtonBgColor(buttonBgColor)} // Revert color on mouse leave
        >
          {showDetails ? 'Masquer détails' : 'Voir détails'}
        </Button>

        {showDetails && (
          <div className="mt-4 p-4 rounded-lg space-y-3 animate-fade-in" style={{ backgroundColor: colors.beige50 }}>
            <div>
              <h4 className="font-medium mb-2" style={{ color: colors.brown800 }}>Coordonnées</h4>
              <div className="flex items-start space-x-2 text-sm" style={{ color: colors.brown600 }}>
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p>{program.location.address}</p>
                  <p>{program.location.postalCode} {program.location.city}</p>
                  <p className="text-xs mt-1" style={{ color: colors.brown600 }}>
                    Lat: {program.location.coordinates.lat}, Lng: {program.location.coordinates.lng}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2" style={{ color: colors.brown800 }}>Instructeur</h4>
              <p className="text-sm" style={{ color: colors.brown600}}>{program.instructor}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2" style={{ color: colors.brown800 }}>Horaires</h4>
              <ul className="text-sm space-y-1" style={{ color: colors.brown600 }}>
                {program.schedule.map((time, index) => (
                  <li key={index}>• {time}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { ProgramCard };
