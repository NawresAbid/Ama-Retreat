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
  schedule: string[];
}

const DetailedProgramSection = () => {
  const [programs, setPrograms] = useState<ProgramForCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setLoading(true);
        const apiPrograms: ProgramFromAPI[] = await fetchPrograms();

        const formattedPrograms: ProgramForCard[] = apiPrograms.map((p) => ({
          id: p.id || p.title,
          title: p.title,
          description: p.description,
          duration: p.duration,
          capacity: p.capacity,
          price: p.price,
          instructor: p.instructor,
          schedule: p.schedule,
          location: {
            address: p.address,
            city: p.city,
            postalCode: p.postal_code,
          },
        }));

        setPrograms(formattedPrograms);
      } catch (err) {
        console.error("Erreur de chargement des programmes:", err);
        // ===================================================================================
        // CORRECTION ESLINT : Remplacement de l'apostrophe
        setError("Impossible de charger les programmes. Veuillez réessayer plus tard.");
        // ===================================================================================
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
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
                  iconColor={
                    program.title.toLowerCase().includes('yoga') || program.title.toLowerCase().includes('sport') ? colors.gold600 : colors.brown600
                  }
                  buttonBgColor={colors.gold600}
                  buttonTextColor={colors.white}
                />
              ))}
            </div>
          ) : (
            <div className="text-center" style={{ color: colors.brown600 }}>
              {/* CORRECTION ESLINT : Remplacement de l'apostrophe */}
              <p>Aucun programme n&apos;est disponible pour le moment.</p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default DetailedProgramSection;
