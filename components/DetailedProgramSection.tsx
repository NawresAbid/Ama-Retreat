"use client"; // This component will contain Client Components

// FIX: Changed from named import { ProgramCard } to default import ProgramCard
import { ProgramCard } from '@/components/ProgramCard';

// Removed unused lucide-react imports as custom SVGs are handled by ProgramCard
// import { Heart, Utensils, Activity, Sparkles } from 'lucide-react';

// Define colors directly within the component, matching ProgramCard's internal colors
const colors = {
  beige50: '#FDF8F0',
  brown600: '#7A5230',
  brown800: '#5C3A1F',
  gold600: '#B58C58', // Needed for iconColor assignment and button background
  white: '#FFFFFF', // Needed for button text color
};

// Define ProgramData interface (copied from ProgramCard for consistency)
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

const DetailedProgramSection = () => {
  const programs: ProgramData[] = [
    {
      id: 'yoga',
      title: "Yoga",
      description: "Sessions de yoga quotidiennes pour harmoniser corps et esprit dans un cadre paisible.",
      duration: "1h30",
      capacity: 12,
      price: 85,
      location: {
        address: "123 Chemin de la Sérénité",
        city: "Annecy",
        postalCode: "74000",
        coordinates: {
          lat: 45.8992,
          lng: 6.1294
        }
      },
      instructor: "Marie Dubois - Certifiée Yoga Alliance",
      schedule: [
        "Lundi - Vendredi: 7h00 - 8h30",
        "Samedi: 8h00 - 9h30",
        "Dimanche: Repos contemplatif"
      ]
    },
    {
      id: 'nutrition',
      title: "Alimentation Saine",
      description: "Cuisine végétarienne bio préparée avec des ingrédients locaux et de saison.",
      duration: "Toute la journée",
      capacity: 20,
      price: 120,
      location: {
        address: "125 Chemin de la Sérénité",
        city: "Annecy",
        postalCode: "74000",
        coordinates: {
          lat: 45.8995,
          lng: 6.1298
        }
      },
      instructor: "Chef Antoine Martin - Cuisine bio",
      schedule: [
        "Petit-déjeuner: 8h00 - 9h30",
        "Déjeuner: 12h30 - 14h00",
        "Dîner: 19h00 - 20h30",
        "Atelier cuisine: Mercredi 16h00"
      ]
    },
    {
      id: 'sport',
      title: "Sport & Fitness",
      description: "Activités physiques douces adaptées à tous les niveaux pour revitaliser votre corps.",
      duration: "1h00",
      capacity: 15,
      price: 65,
      location: {
        address: "127 Chemin de la Sérénité",
        city: "Annecy",
        postalCode: "74000",
        coordinates: {
          lat: 45.8998,
          lng: 6.1302
        }
      },
      instructor: "Lucas Moreau - Coach sportif",
      schedule: [
        "Lundi, Mercredi, Vendredi: 10h00 - 11h00",
        "Mardi, Jeudi: 16h00 - 17h00",
        "Samedi: Randonnée guidée 9h00 - 12h00"
      ]
    },
    {
      id: 'massage',
      title: "Massage & Soins",
      description: "Soins relaxants et thérapeutiques pour libérer les tensions et retrouver l'équilibre.",
      duration: "1h15",
      capacity: 8,
      price: 95,
      location: {
        address: "129 Chemin de la Sérénité",
        city: "Annecy",
        postalCode: "74000",
        coordinates: {
          lat: 45.9001,
          lng: 6.1306
        }
      },
      instructor: "Sophie Laurent - Massothérapeute certifiée",
      schedule: [
        "Du lundi au samedi: 9h00 - 18h00",
        "Réservation sur rendez-vous",
        "Massage en duo disponible",
        "Soins du visage: Mardi et Jeudi"
      ]
    }
  ];

  // The programIcons array is no longer needed here as iconType is passed directly
  // const programIcons = [
  //   { icon: Heart, color: "text-gold-600" },
  //   { icon: Utensils, color: "text-brown-600" },
  //   { icon: Activity, color: "text-gold-600" },
  //   { icon: Sparkles, color: "text-brown-600" }
  // ];

  return (
    <section className="py-20" style={{ backgroundColor: colors.beige50 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: colors.brown800 }}>
            Programmes Détaillés
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: colors.brown600 }}>
            Découvrez tous les détails de nos programmes de bien-être avec coordonnées et horaires
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {programs.map((program) => ( // Removed index as it's not directly used for icon mapping now
            <ProgramCard
              key={program.id}
              program={program}
              // Dynamically assign iconType based on program id
              iconType={
                program.id === 'yoga' ? 'yoga' :
                program.id === 'nutrition' ? 'alimentation' : // Changed 'nutrition' to 'alimentation' for icon mapping
                program.id === 'sport' ? 'sport' :
                program.id === 'massage' ? 'massage' : 'yoga' // Default to yoga if no match
              }
              // Dynamically assign iconColor based on program id
              iconColor={
                program.id === 'yoga' || program.id === 'sport' ? colors.gold600 :
                program.id === 'nutrition' || program.id === 'massage' ? colors.brown600 : colors.gold600
              }
              buttonBgColor={colors.gold600}
              buttonTextColor={colors.white}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailedProgramSection;
