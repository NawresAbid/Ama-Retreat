"use client";

import { useState, useEffect } from 'react';
import { ProgramCard } from '@/components/ProgramCard';
import { fetchPrograms, Program as ProgramFromAPI } from '@/utils/program';

const colors = {
  beige50: '#FDF8F0',
  brown600: '#7A5230',
  brown800: '#5C3A1F',
  gold600: '#B58C58',
  white: '#FFFFFF',
};

interface ProgramForCard {
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
  };
  instructor: string;
  schedule: string;
  images?: string[];
}

// Static data for the two retraites
const staticRetraites: ProgramForCard[] = [
  {
    id: "6d8b2f6e-fcef-430e-8331-bb186c441fae",
    title: "Retraite Bien-Être à Djerba",
    description: "Yoga, méditation et évasion à Djerba. Une expérience transformatrice dans un cadre paisible.",
    duration: "4 jours",
    capacity: 10,
    price: 800,
    instructor: "Team AMA Retreat",
    schedule: "",
    location: {
      address: "",
      city: "Djerba, Tunisie",
      postalCode: "",
    },
    images: [],
  },
  {
    id: "2eb64782-9126-4e61-bda8-b200cee20ae5",
    title: "Retraite Bien-Être à Palerme",
    description: "Immersion entre culture sicilienne et développement personnel. Yoga, méditation et découverte culturelle.",
    duration: "5 jours",
    capacity: 10,
    price: 1200,
    instructor: "Team AMA Retreat",
    schedule: "",
    location: {
      address: "",
      city: "Palerme, Italie",
      postalCode: "",
    },
    images: [],
  },
];

const DetailedProgramSection = () => {
  const [programs, setPrograms] = useState<ProgramForCard[]>(staticRetraites);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Fetch only images from API
        const apiPrograms: ProgramFromAPI[] = await fetchPrograms();
        
        // Map images to static data
        const updatedPrograms = staticRetraites.map(staticProgram => {
          const apiProgram = apiPrograms.find(p => p.id === staticProgram.id);
          return {
            ...staticProgram,
            images: apiProgram?.images || [],
          };
        });
        
        setPrograms(updatedPrograms);
      } catch (err) {
        console.error("Erreur de chargement des images:", err);
        // Keep static data even if images fail to load
        setPrograms(staticRetraites);
      }
    };

    loadImages();
  }, []);

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

        {loading && (
          <div className="text-center" style={{ color: colors.brown600 }}>
            <p className="text-xl">Chargement des programmes...</p>
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg max-w-md mx-auto">
            <h3 className="font-bold">Une erreur est survenue</h3>
            <p>{error}</p>
          </div>
        )}
        {!loading && !error && (
          programs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {programs.map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  iconType={
                    program.title.toLowerCase().includes('yoga') ? 'yoga' :
                    program.title.toLowerCase().includes('alimentation') ? 'alimentation' :
                    program.title.toLowerCase().includes('sport') ? 'sport' :
                    program.title.toLowerCase().includes('massage') ? 'massage' : 'yoga'
                  }
                  //iconColor={
                  //  program.title.toLowerCase().includes('yoga') || program.title.toLowerCase().includes('sport') ? colors.gold600 : colors.brown600
                  //}
                  buttonBgColor={colors.gold600}
                  buttonTextColor={colors.white}
                />
              ))}
            </div>
          ) : (
            <div className="text-center" style={{ color: colors.brown600 }}>
              <p>Aucun programme n&apos;est disponible pour le moment.</p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default DetailedProgramSection;

