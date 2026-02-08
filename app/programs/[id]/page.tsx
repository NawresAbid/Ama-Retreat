"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, User, Sun, Users, Clock, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  fetchPrograms,
  Program as ProgramFromAPIType,
} from "@/utils/program";

const colors = {
  beige50: "#FDF8F0",
  beige100: "#F9ECD9",
  beige200: "#F3E4D1",
  brown600: "#7A5230",
  brown700: "#6B4728",
  brown800: "#5C3A1F",
  gold50: "#FFFBEB",
  gold100: "#E0B87A",
  gold200: "#D7B481",
  gold500: "#D4AF37",
  gold600: "#B58C58",
  gold700: "#A37E4C",
  white: "#FFFFFF",
};

// Programme depuis l'API (schedule est maintenant un texte simple)
interface ProgramFromAPILocal {
  id?: string;
  title?: string;
  description: string;
  duration: string;
  capacity: number;
  price: number;
  address: string;
  city: string;
  postal_code: string;
  instructor: string;
  status: "active" | "inactive";
  images?: string[];
  schedule: string; // <-- simplifié en texte
}

const ProgramDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const [program, setProgram] = useState<ProgramFromAPILocal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProgram = async () => {
      try {
        setLoading(true);
        const apiPrograms: ProgramFromAPIType[] = await fetchPrograms();

        const foundProgram = apiPrograms.find(
          (p) => p.id === params.id || p.title === params.id
        );

        if (foundProgram) {
          const mappedProgram: ProgramFromAPILocal = {
            ...foundProgram,
            schedule:
              typeof foundProgram.schedule === "string"
                ? foundProgram.schedule
                : "", // fallback si pas string
          };
          setProgram(mappedProgram);
        } else {
          setError("Programme non trouvé.");
        }
      } catch (err) {
        console.error("Erreur de chargement du programme:", err);
        setError(
          "Impossible de charger le programme. Veuillez réessayer plus tard."
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadProgram();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: colors.beige50 }}>
        <div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
          style={{ color: colors.brown600 }}
        >
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
          <Button
            onClick={() => router.back()}
            className="mt-6"
            style={{ backgroundColor: colors.gold600, color: colors.white }}
          >
            <ArrowLeft className="mr-2" size={16} />
            Retour
          </Button>
        </div>
      </div>
    );
  }

  // Fonction pour parser le schedule et extraire les activités
  const parseSchedule = (scheduleText: string) => {
    // Diviser par le séparateur '---' pour obtenir les jours
    const dayBlocks = scheduleText.split('---').map(block => block.trim()).filter(Boolean);
    
    if (dayBlocks.length === 0) {
      // Si pas de séparateur, traiter comme une liste simple
      const activities = scheduleText.split('\n').filter(line => line.trim() !== '');
      return {
        hasDays: false,
        activities: activities,
        days: []
      };
    }

    // Parser chaque bloc de jour
    const days = dayBlocks.map((block, index) => {
      const lines = block.split('\n').map(line => line.trim()).filter(Boolean);
      const dayTitle = lines[0] || `Jour ${index + 1}`;
      const activities = lines.slice(1);
      return {
        day: dayTitle,
        activities: activities
      };
    });

    return {
      hasDays: true,
      activities: [],
      days: days
    };
  };

  const scheduleData = parseSchedule(program.schedule);

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.beige50 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Retour */}
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mb-8 border-2 hover:bg-opacity-10"
          style={{
            borderColor: colors.brown600,
            color: colors.brown600,
            backgroundColor: "transparent",
          }}
        >
          <ArrowLeft className="mr-2" size={16} />
          Retour aux programmes
        </Button>

        {/* En-tête avec image */}
        <div className="mb-16">
          {/* Image principale du programme */}
          {program.images && program.images.length > 0 && (
            <div className="relative w-full h-96 mb-8 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={program.images[0]}
                alt={program.title || "Programme"}
                fill
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, transparent 0%, ${colors.brown800}dd 100%)`,
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2
                  className="text-4xl md:text-5xl font-serif font-bold mb-4"
                >
                  {program.title}
                </h2>
                <p className="text-lg md:text-xl max-w-3xl leading-relaxed opacity-95">
                  {program.description}
                </p>
              </div>
            </div>
          )}

          {/* En-tête sans image */}
          {(!program.images || program.images.length === 0) && (
            <div className="text-center mb-12">
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${colors.gold100}, ${colors.beige100})`,
                  color: colors.gold600,
                }}
              >
                <Sun size={36} />
              </div>
              <h2
                className="text-4xl md:text-5xl font-serif font-bold mb-6"
                style={{ color: colors.brown800 }}
              >
                <span
                  style={{
                    backgroundImage: `linear-gradient(to right, ${colors.gold600}, ${colors.brown600})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {program.title}
                </span>
              </h2>
              <p
                className="text-xl max-w-4xl mx-auto leading-relaxed mb-8"
                style={{ color: colors.brown600 }}
              >
                {program.description}
              </p>
            </div>
          )}

          {/* Infos organisées en cartes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: colors.white }}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.gold50 }}
                  >
                    <Calendar size={24} style={{ color: colors.gold600 }} />
                  </div>
                </div>
                <p className="text-sm mb-1" style={{ color: colors.brown600 }}>Durée</p>
                <p className="font-bold text-lg" style={{ color: colors.brown800 }}>
                  {program.duration}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: colors.white }}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.gold50 }}
                  >
                    <Users size={24} style={{ color: colors.gold600 }} />
                  </div>
                </div>
                <p className="text-sm mb-1" style={{ color: colors.brown600 }}>Capacité</p>
                <p className="font-bold text-lg" style={{ color: colors.brown800 }}>
                  {program.capacity} personnes
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: colors.white }}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.gold50 }}
                  >
                    <User size={24} style={{ color: colors.gold600 }} />
                  </div>
                </div>
                <p className="text-sm mb-1" style={{ color: colors.brown600 }}>Instructeur</p>
                <p className="font-bold text-lg" style={{ color: colors.brown800 }}>
                  {program.instructor}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: colors.white }}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.gold50 }}
                  >
                    <MapPin size={24} style={{ color: colors.gold600 }} />
                  </div>
                </div>
                <p className="text-sm mb-1" style={{ color: colors.brown600 }}>Lieu</p>
                <p className="font-bold text-lg" style={{ color: colors.brown800 }}>
                  {program.city}
                </p>
                <p className="text-xs" style={{ color: colors.brown600 }}>
                  {program.postal_code}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Prix en badge élégant */}
          <div className="text-center">
            <div
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-serif text-xl shadow-lg"
              style={{
                backgroundImage: `linear-gradient(135deg, ${colors.gold600}, ${colors.gold700})`,
                color: colors.white,
              }}
            >
              <span className="text-2xl font-bold">{program.price}</span>
              <span className="text-lg">CHF</span>
            </div>
          </div>
        </div>

        {/* Programme - Design amélioré avec timeline */}
        <Card
          className="overflow-hidden bg-white shadow-xl border-0 p-8 sm:p-12 animate-fade-in rounded-2xl"
        >
          <CardHeader className="p-0 mb-10">
            <div className="flex flex-col items-center text-center mb-4">
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 shadow-lg"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.gold600}, ${colors.gold700})`,
                }}
              >
                <Calendar size={40} style={{ color: colors.white }} />
              </div>
              <CardTitle
                className="text-3xl md:text-4xl font-serif font-bold mb-3"
                style={{ color: colors.brown800 }}
              >
                Programme Complet
              </CardTitle>
              <p className="text-lg leading-relaxed max-w-2xl" style={{ color: colors.brown600 }}>
                Découvrez toutes les activités et expériences qui vous attendent
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Affichage avec jours structurés - Timeline Design */}
            {scheduleData.hasDays && scheduleData.days.length > 0 ? (
              <div className="relative">
                {/* Ligne verticale de la timeline */}
                <div
                  className="absolute left-8 top-0 bottom-0 w-0.5 hidden md:block"
                  style={{ backgroundColor: colors.gold200 }}
                />
                
                <div className="space-y-12">
                  {scheduleData.days.map((dayData, dayIndex) => (
                    <div key={dayIndex} className="relative">
                      {/* Point de la timeline */}
                      <div className="absolute left-0 top-0 hidden md:flex items-center justify-center">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10"
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${colors.gold600}, ${colors.gold700})`,
                            color: colors.white,
                          }}
                        >
                          <span className="font-bold text-xl">{dayIndex + 1}</span>
                        </div>
                      </div>

                      {/* Contenu du jour */}
                      <div className="md:ml-24">
                        {/* En-tête du jour */}
                        <div
                          className="mb-6 pb-4 border-b-2 rounded-lg p-6"
                          style={{
                            borderColor: colors.gold200,
                            backgroundColor: colors.gold50,
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="md:hidden">
                              <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{
                                  backgroundImage: `linear-gradient(135deg, ${colors.gold600}, ${colors.gold700})`,
                                  color: colors.white,
                                }}
                              >
                                <span className="font-bold text-lg">{dayIndex + 1}</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3
                                className="text-2xl md:text-3xl font-serif font-bold mb-2"
                                style={{ color: colors.brown800 }}
                              >
                                {dayData.day}
                              </h3>
                              <div className="flex items-center gap-2 text-sm" style={{ color: colors.brown600 }}>
                                <Clock size={16} />
                                <span>{dayData.activities.length} activité{dayData.activities.length > 1 ? 's' : ''}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Activités du jour - Design amélioré */}
                        {dayData.activities.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {dayData.activities.map((activity: string, activityIndex: number) => (
                              <div
                                key={activityIndex}
                                className="group flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                style={{
                                  borderColor: colors.beige200,
                                  backgroundColor: colors.white,
                                }}
                              >
                                <div className="flex-shrink-0 mt-1">
                                  <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: colors.gold50 }}
                                  >
                                    <CheckCircle2 size={18} style={{ color: colors.gold600 }} />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <p
                                    className="text-base leading-relaxed font-medium"
                                    style={{ color: colors.brown700 }}
                                  >
                                    {activity}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 rounded-xl" style={{ backgroundColor: colors.beige50 }}>
                            <p style={{ color: colors.brown600 }}>
                              Aucune activité prévue pour ce jour
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : scheduleData.activities.length > 0 ? (
              /* Affichage simple sans jours - Design amélioré */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {scheduleData.activities.map((activity: string, activityIndex: number) => (
                  <div
                    key={activityIndex}
                    className="group flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{
                      borderColor: colors.beige200,
                      backgroundColor: colors.white,
                    }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: colors.gold50 }}
                      >
                        <CheckCircle2 size={18} style={{ color: colors.gold600 }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p
                        className="text-base leading-relaxed font-medium"
                        style={{ color: colors.brown700 }}
                      >
                        {activity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-xl" style={{ backgroundColor: colors.beige50 }}>
                <Calendar size={48} className="mx-auto mb-4" style={{ color: colors.gold600 }} />
                <p className="text-xl font-medium" style={{ color: colors.brown600 }}>
                  Aucun programme détaillé n&apos;est disponible pour le moment.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CTA */}
        <div
          className="text-center mt-16 rounded-2xl p-8"
          style={{ backgroundColor: colors.white }}
        >
          <h3
            className="text-2xl font-serif font-bold mb-4"
            style={{ color: colors.brown800 }}
          >
            Prêt(e) pour cette exp&eacute;rience transformatrice ?
          </h3>
          <p className="mb-6 max-w-2xl mx-auto" style={{ color: colors.brown600 }}>
            Rejoignez-nous pour une semaine inoubliable de reconnexion avec
            vous-m&ecirc;me dans un cadre naturel exceptionnel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="px-12 py-4 text-lg font-medium rounded-full hover:scale-105 transition-all duration-300"
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.gold600}, ${colors.brown600})`,
                color: colors.white,
              }}
              onClick={() => router.push(`/register/${program.id}`)}
            >
              Réserver maintenant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailsPage;
