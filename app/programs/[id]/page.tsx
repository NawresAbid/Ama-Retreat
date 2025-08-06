"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchPrograms, Program as ProgramFromAPI } from '@/utils/program';

const colors = {
  beige50: '#FDF8F0',
  beige100: '#F9ECD9',
  brown600: '#7A5230',
  brown800: '#5C3A1F',
  gold100: '#E0B87A',
  gold600: '#B58C58',
  gold700: '#A37E4C',
  white: '#FFFFFF',
};

const customIcons = {
  yoga: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  alimentation: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 2c.5 1.5 1 3 1 5s-.5 3.5-1 5c-.5 1.5-1 3-1 5h2c0-2 1-4 1.5-5.5.5-1.5 1-3 1-5s-.5-3.5-1-5c-.5-1.5-1-3-1-5H7z"/>
      <path d="M17 2c-.5 1.5-1 3-1 5s.5 3.5 1 5c.5 1.5 1 3 1 5h-2c0-2-1-4-1.5-5.5-.5-1.5-1-3-1-5s.5-3.5 1-5c.5-1.5 1-3 1-5h2z"/>
      <line x1="12" y1="2" x2="12" y2="22" strokeWidth="1"/>
    </svg>
  ),
  sport: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h3.5l2.5-8 5 16 2.5-8H21"/>
    </svg>
  ),
  massage: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/>
      <path d="M20 10l-1.5 1.5L17 13l1.5 1.5L20 16l1.5-1.5L23 13l-1.5-1.5L20 10z"/>
      <path d="M4 10l-1.5 1.5L1 13l1.5 1.5L4 16l1.5-1.5L7 13l-1.5-1.5L4 10z"/>
    </svg>
  ),
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

const ProgramDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const [program, setProgram] = useState<ProgramForCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProgram = async () => {
      try {
        setLoading(true);
        const apiPrograms: ProgramFromAPI[] = await fetchPrograms();

        const foundProgram = apiPrograms.find(p => (p.id || p.title) === params.id);

        if (foundProgram) {
          const formattedProgram: ProgramForCard = {
            id: foundProgram.id || foundProgram.title,
            title: foundProgram.title,
            description: foundProgram.description,
            duration: foundProgram.duration,
            capacity: foundProgram.capacity,
            price: foundProgram.price,
            instructor: foundProgram.instructor,
            schedule: foundProgram.schedule,
            location: {
              address: foundProgram.address,
              city: foundProgram.city,
              postalCode: foundProgram.postal_code,
            },
          };
          setProgram(formattedProgram);
        } else {
          setError("Programme non trouvé");
        }
      } catch (err) {
        console.error("Erreur de chargement du programme:", err);
        setError("Impossible de charger le programme. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadProgram();
    }
  }, [params.id]);

  const getIconType = (title: string): keyof typeof customIcons => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('yoga')) return 'yoga';
    if (lowerTitle.includes('alimentation')) return 'alimentation';
    if (lowerTitle.includes('sport')) return 'sport';
    if (lowerTitle.includes('massage')) return 'massage';
    return 'yoga';
  };

  const getIconColor = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    return (lowerTitle.includes('yoga') || lowerTitle.includes('sport')) ? colors.gold600 : colors.brown600;
  };


  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: colors.beige50 }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center" style={{ color: colors.brown600 }}>
          <p className="text-xl">Chargement du programme...</p>
        </div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: colors.beige50 }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="text-red-600 bg-red-100 p-6 rounded-lg max-w-md mx-auto">
            <h3 className="font-bold text-lg mb-2">Erreur</h3>
            <p>{error}</p>
          </div>
          <Button onClick={() => router.back()} className="mt-6" style={{ backgroundColor: colors.gold600, color: colors.white }}>
            <ArrowLeft className="mr-2" size={16} />
            Retour
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = customIcons[getIconType(program.title)];
  const iconColor = getIconColor(program.title);
 

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.beige50 }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Retour */}
        <Button onClick={() => router.back()} variant="outline" className="mb-8 border-2 hover:bg-opacity-10" style={{ borderColor: colors.brown600, color: colors.brown600, backgroundColor: 'transparent' }}>
          <ArrowLeft className="mr-2" size={16} />
          Retour aux programmes
        </Button>

        {/* Détails */}
        <Card className="bg-white shadow-xl border-0 mb-8">
          <CardHeader className="text-center pb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6" style={{ backgroundImage: `linear-gradient(to bottom right, ${colors.gold100}, ${colors.beige100})`, color: iconColor }}>
              {IconComponent && <IconComponent width={48} height={48} />}
            </div>
            <CardTitle className="text-3xl md:text-4xl font-serif mb-4" style={{ color: colors.brown800 }}>{program.title}</CardTitle>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: colors.brown600 }}>{program.description}</p>
          </CardHeader>
        </Card>

        {/* Info pratiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: colors.brown800 }}>
                <Clock className="mr-2" size={20} /> Informations pratiques
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span style={{ color: colors.brown600 }}>Durée :</span><span className="font-medium" style={{ color: colors.brown800 }}>{program.duration}</span></div>
                <div className="flex justify-between"><span style={{ color: colors.brown600 }}>Capacité :</span><span className="font-medium" style={{ color: colors.brown800 }}>{program.capacity} personnes</span></div>
                <div className="flex justify-between"><span style={{ color: colors.brown600 }}>Prix :</span><span className="font-bold text-xl" style={{ color: colors.gold600 }}>{program.price}€</span></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: colors.brown800 }}>
                <MapPin className="mr-2" size={20} /> Localisation
              </h3>
              <div style={{ color: colors.brown600 }}>
                <p className="font-medium">{program.location.address}</p>
                <p>{program.location.postalCode} {program.location.city}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructeur et horaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: colors.brown800 }}>
                <User className="mr-2" size={20} /> Instructeur
              </h3>
              <p className="text-lg" style={{ color: colors.brown600 }}>{program.instructor}</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center" style={{ color: colors.brown800 }}>
                <Calendar className="mr-2" size={20} /> Horaires
              </h3>
              <ul className="space-y-2">
                {program.schedule.map((time, index) => (
                  <li key={index} className="flex items-center" style={{ color: colors.brown600 }}>
                    <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors.gold600 }}></span>
                    {time}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Image before CTA - stacked vertically */}
        <div className="flex flex-col items-center my-12 gap-4">
          <img 
            src='https://plus.unsplash.com/premium_photo-1669446008800-9a124b0fd3a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D'
            alt="Image du programme"
            style={{ maxWidth: 320, borderRadius: 10, border: `1px solid ${colors.beige100}`, objectFit: 'cover' }}
          />
          <img 
            src='https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhlYWx0eSUyMGZvb2R8ZW58MHx8MHx8fDA%3D'
            alt="Image du programme"
            style={{ maxWidth: 320, borderRadius: 10, border: `1px solid ${colors.beige100}`, objectFit: 'cover' }}
          />
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Button size="lg" className="px-8 py-3 text-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.gold600, color: colors.white }} onClick={() => router.push(`/register/${program.id}`)}>
            S&apos;inscrire au programme
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailsPage;