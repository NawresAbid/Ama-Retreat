"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, User, Sun, Users } from "lucide-react";
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

  // Fonction pour simuler la division du programme en jours et ajouter l'image
  const getDailyPrograms = (scheduleText: string) => {
    const allActivities = scheduleText.split("\n").filter(line => line.trim() !== "");
    const dailyPrograms = [];
    const activitiesPerDay = 9; 
    let day = 1;

    for (let i = 0; i < allActivities.length; i += activitiesPerDay) {
      const activitiesForDay = allActivities.slice(i, i + activitiesPerDay);
      const dayActivitiesString = activitiesForDay.join(" ").toLowerCase();

      let imageSrc = "https://images.unsplash.com/photo-1517436214552-6e2793132711?q=80&w=2787&auto=format&fit=crop";

      if (dayActivitiesString.includes("yoga") || dayActivitiesString.includes("méditation")) {
        imageSrc = "/yoga.png";
      } else if (dayActivitiesString.includes("randonnée") || dayActivitiesString.includes("marche en nature")) {
        imageSrc = "https://images.unsplash.com/photo-1594247585090-410a568165d7?q=80&w=2787&auto=format&fit=crop";
      } else if (dayActivitiesString.includes("alimentation saine") || dayActivitiesString.includes("cuisine saine") || dayActivitiesString.includes("repas équilibré")) {
        imageSrc = "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=60";
      } else if (dayActivitiesString.includes("gratitude") || dayActivitiesString.includes("clôture")) {
        imageSrc = "https://images.unsplash.com/photo-1517436214552-6e2793132711?q=80&w=2787&auto=format&fit=crop";
      }

      dailyPrograms.push({
        day: `Jour ${day}`,
        title: `Titre du Jour ${day}`,
        activities: activitiesForDay,
        image: imageSrc
      });
      day++;
    }
    return dailyPrograms;
  };

  const dailyPrograms = getDailyPrograms(program.schedule);

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

        {/* En-tête */}
        <div className="text-center mb-16">
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

          {/* Infos */}
          <div
            className="flex flex-wrap justify-center items-center gap-6 mb-8"
            style={{ color: colors.brown600 }}
          >
            <div className="flex items-center space-x-2">
              <Calendar size={20} style={{ color: colors.gold600 }} />
              <span className="font-medium">{program.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User size={20} style={{ color: colors.gold600 }} />
              <span className="font-medium">
                {program.capacity} participants max
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={20} style={{ color: colors.gold600 }} />
              <span className="font-medium">
                Instructeur: {program.instructor}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={20} style={{ color: colors.gold600 }} />
              <span className="font-medium">
                {program.city}, {program.postal_code}
              </span>
            </div>
          </div>

          <div
            className="rounded-full px-8 py-3 inline-block font-serif text-xl"
            style={{
              backgroundImage: `linear-gradient(to right, ${colors.gold600}, ${colors.brown600})`,
              color: colors.white,
            }}
          >
            À partir de {program.price}CHF tout compris (vol non inclu)
          </div>
        </div>

        {/* Programme */}
        <div className="space-y-8">
          {dailyPrograms.length > 0 ? (
            dailyPrograms.map((dayProgram, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-white shadow-lg border-0 p-8 animate-fade-in rounded-2xl"
              >
                <CardHeader className="p-0 mb-6">
                  <div className="flex items-center space-x-4 mb-3">
                    {dayProgram.image && (
                      <Image
                        src={dayProgram.image}
                        alt={`Image pour le ${dayProgram.day}`}
                        width={160}
                        height={160}
                        className="w-40 h-40 object-cover border-2"
                        style={{ borderColor: colors.gold600 }}
                      />
                    )}
                    <CardTitle
                      className="text-2xl font-serif"
                      style={{ color: colors.brown800 }}
                    >
                      {dayProgram.day}
                    </CardTitle>
                  </div>
                  <p className="text-base leading-relaxed" style={{ color: colors.brown600 }}>
                    {program.title} - Programme détaillé
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dayProgram.activities.map((activity: string, activityIndex: number) => (
                      <div
                        key={activityIndex}
                        className="flex items-start space-x-3 p-4 rounded-xl border transition-all duration-300 transform hover:scale-105"
                        style={{
                          borderColor: colors.beige200,
                          backgroundColor: colors.beige50,
                        }}
                      >
                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: colors.gold500 }}></div>
                        <span className="text-brown-700 text-sm leading-relaxed">{activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p
              className="text-center text-xl"
              style={{ color: colors.brown600 }}
            >
              Aucun programme détaillé n&apos;est disponible pour le moment.
            </p>
          )}
        </div>

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
