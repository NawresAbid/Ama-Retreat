"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, User, Sun, Users, CheckCircle2, Compass, Star, HelpCircle, XCircle } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  fetchPrograms,
  Program as ProgramFromAPIType,
  getIdFromSlug,
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

        // Get the ID from the slug
        const slug = params.slug as string;
        const programId = getIdFromSlug(slug);

        const foundProgram = apiPrograms.find(
          (p) => p.id === programId
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

    if (params.slug) {
      loadProgram();
    }
  }, [params.slug]);

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



  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.beige50 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back Button */}
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

        {/* Section 1: Title Section */}
        <div className="mb-20">
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
            <h1
              className="text-4xl md:text-5xl font-serif font-bold mb-4"
              style={{ color: colors.brown800 }}
            >
              Retraite Bien-Être à Djerba – Yoga, Méditation et Évasion
            </h1>
            <p className="text-2xl mb-8" style={{ color: colors.gold600 }}>
              Du 25 au 29 Avril 2026
            </p>
          </div>

          {/* Info Badges Row */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ backgroundColor: colors.beige100, color: colors.brown700 }}
            >
              <Calendar size={16} style={{ color: colors.gold600 }} />
              <span className="font-bold">4 jours</span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ backgroundColor: colors.beige100, color: colors.brown700 }}
            >
              <MapPin size={16} style={{ color: colors.gold600 }} />
              <span className="font-bold">Djerba, Tunisie</span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ backgroundColor: colors.beige100, color: colors.brown700 }}
            >
              <Users size={16} style={{ color: colors.gold600 }} />
              <span className="font-bold">10 personnes</span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ backgroundColor: colors.beige100, color: colors.brown700 }}
            >
              <User size={16} style={{ color: colors.gold600 }} />
              <span className="font-bold">Team AMA Retreat</span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.gold600}, ${colors.gold700})`,
                color: colors.white,
              }}
            >
              <span className="font-bold">Prix: 800€</span>
            </div>
          </div>
        </div>

        {/* Section 2: Introduction */}
        <Card className="border-0 shadow-md mb-20 p-8 md:p-12" style={{ backgroundColor: colors.white }}>
          <div className="flex items-start gap-6 mb-6">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full flex-shrink-0"
              style={{
                backgroundImage: `linear-gradient(135deg, ${colors.gold600}, ${colors.gold700})`,
                color: colors.white,
              }}
            >
              <Compass size={32} />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-serif font-bold mb-4" style={{ color: colors.brown800 }}>
                Introduction
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: colors.brown600 }}>
                Une retraite bien-être à Djerba conçue pour aider les participants à ralentir, se reconnecter avec eux-mêmes et partager des expériences significatives. La retraite combine des séances de yoga, de la méditation, du développement personnel, une découverte culturelle et des moments de relaxation dans un environnement paisible.
              </p>
            </div>
          </div>
        </Card>

        {/* Section 3: Points Forts de l'Expérience */}
        <Card className="border-0 shadow-md mb-20 p-8 md:p-12" style={{ backgroundColor: colors.white }}>
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-8">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.gold600}, ${colors.gold700})`,
                  color: colors.white,
                }}
              >
                <Star size={32} />
              </div>
              <h2 className="text-3xl font-serif font-bold" style={{ color: colors.brown800 }}>
                Points Forts de l'Expérience
              </h2>
            </div>
          </div>
          <div
            className="p-6 rounded-lg space-y-4"
            style={{ backgroundColor: colors.beige50 }}
          >
            {[
              "Retraite bien-être dans un cadre paisible à Djerba",
              "Séances de yoga et méditation guidées",
              "Activités de développement personnel",
              "Découverte de l'île de Djerba",
              "Demi-journée spa dans un hôtel d'exception",
              "Hébergement dans une maison avec piscine",
              "Cuisine méditerranéenne locale",
              "Groupe limité à 10 personnes",
            ].map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: colors.gold200 }}
                >
                  <CheckCircle2 size={16} style={{ color: colors.gold600 }} />
                </div>
                <p className="text-base leading-relaxed" style={{ color: colors.brown700 }}>
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Section 4: Détails Complets */}
        <Card className="border-0 shadow-md mb-20 p-8 md:p-12" style={{ backgroundColor: colors.white }}>
          <div className="flex items-center gap-4 mb-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full"
              style={{
                backgroundImage: `linear-gradient(135deg, ${colors.gold600}, ${colors.gold700})`,
                color: colors.white,
              }}
            >
              <Calendar size={32} />
            </div>
            <h2 className="text-3xl font-serif font-bold" style={{ color: colors.brown800 }}>
              Détails Complets de l'Expérience
            </h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.brown800 }}>
                Séances de Yoga et Méditation du Matin
              </h3>
              <p className="leading-relaxed" style={{ color: colors.brown600 }}>
                Commencez chaque journée par des séances guidées de yoga et de méditation dans un cadre serein, conçues pour dynamiser votre corps et apaiser votre esprit.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.brown800 }}>
                Ateliers de Développement Personnel et Partages en Groupe
              </h3>
              <p className="leading-relaxed" style={{ color: colors.brown600 }}>
                Participez à des ateliers interactifs axés sur la croissance personnelle, la pleine conscience et des discussions de groupe significatives.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.brown800 }}>
                Exploration de Djerba avec Promenades et Visites Culturelles
              </h3>
              <p className="leading-relaxed" style={{ color: colors.brown600 }}>
                Découvrez la beauté de Djerba lors de promenades guidées et d'excursions culturelles vers des sites locaux et des attractions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.brown800 }}>
                Expériences de Relaxation Incluant une Demi-Journée Spa
              </h3>
              <p className="leading-relaxed" style={{ color: colors.brown600 }}>
                Profitez de traitements spa revitalisants et de séances de relaxation dans un cadre hôtelier de luxe.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.brown800 }}>
                Excursion Désert Optionnelle pour une Expérience Sahara Unique
              </h3>
              <p className="leading-relaxed" style={{ color: colors.brown600 }}>
                Vivez la magie du Sahara avec une excursion optionnelle dans le désert (un coût supplémentaire peut s'appliquer).
              </p>
            </div>
          </div>
        </Card>

        {/* Section 5: Inclusions */}
        <Card className="border-0 shadow-md mb-20 p-8 md:p-12" style={{ backgroundColor: colors.white }}>
          <div className="flex items-center gap-4 mb-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full"
              style={{
                backgroundImage: `linear-gradient(135deg, #10b981, #059669)`,
                color: colors.white,
              }}
            >
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-3xl font-serif font-bold" style={{ color: colors.brown800 }}>
              Inclusions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              "Hébergement dans une maison avec piscine",
              "Pension complète (petit-déjeuner, déjeuner, dîner)",
              "Séances de yoga et méditation",
              "Activités de développement personnel",
              "Activités de groupe",
              "Randonnées et visites locales",
              "Demi-journée spa dans un hôtel",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg" style={{ backgroundColor: "#DCFCE7" }}>
                <CheckCircle2 size={20} style={{ color: "#10b981", flexShrink: 0 }} />
                <span style={{ color: colors.brown700 }}>{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Section 6: Non Inclus */}
        <Card className="border-0 shadow-md mb-20 p-8 md:p-12" style={{ backgroundColor: colors.white }}>
          <div className="flex items-center gap-4 mb-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full"
              style={{
                backgroundImage: `linear-gradient(135deg, #E74C3C, #C0392B)`,
                color: colors.white,
              }}
            >
              <XCircle size={32} />
            </div>
            <h2 className="text-3xl font-serif font-bold" style={{ color: colors.brown800 }}>
              Non Inclus
            </h2>
          </div>
          <div className="space-y-4">
            {[
              "Vols internationaux",
              "Transferts aéroport (si non précisés)",
              "Excursion désert (activité optionnelle)",
              "Dépenses personnelles",
              "Assurance voyage",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg" style={{ backgroundColor: "#FCE4E4" }}>
                <XCircle size={20} style={{ color: "#E74C3C", flexShrink: 0 }} />
                <span style={{ color: colors.brown700 }}>{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Section 7: FAQ */}
        <Card className="border-0 shadow-md mb-20 p-8 md:p-12" style={{ backgroundColor: colors.white }}>
          <div className="flex items-center gap-4 mb-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full"
              style={{
                backgroundImage: `linear-gradient(135deg, ${colors.gold600}, ${colors.gold700})`,
                color: colors.white,
              }}
            >
              <HelpCircle size={32} />
            </div>
            <h2 className="text-3xl font-serif font-bold" style={{ color: colors.brown800 }}>
              FAQ – Questions Fréquemment Posées
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger style={{ color: colors.brown800 }}>
                Le séjour est-il adapté aux débutants en yoga ?
              </AccordionTrigger>
              <AccordionContent style={{ color: colors.brown600 }}>
                Oui, notre retraite accueille les participants de tous les niveaux, du débutant au confirmé. Nos instructeurs adaptent les sessions pour chacun.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger style={{ color: colors.brown800 }}>
                Combien de participants participent à la retraite ?
              </AccordionTrigger>
              <AccordionContent style={{ color: colors.brown600 }}>
                Notre retraite est limitée à 10 personnes pour créer une atmosphère intime et permettre une attention personnalisée.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger style={{ color: colors.brown800 }}>
                Où se déroule l'hébergement ?
              </AccordionTrigger>
              <AccordionContent style={{ color: colors.brown600 }}>
                L'hébergement se fait dans une belle maison avec piscine, idéalement située à Djerba pour un accès facile aux activités et aux attractions locales.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger style={{ color: colors.brown800 }}>
                Les repas sont-ils inclus ?
              </AccordionTrigger>
              <AccordionContent style={{ color: colors.brown600 }}>
                Oui, la pension complète est incluse avec un petit-déjeuner, déjeuner et dîner tous les jours, préparés avec des ingrédients locaux méditerranéens.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger style={{ color: colors.brown800 }}>
                L'excursion dans le désert est-elle incluse ?
              </AccordionTrigger>
              <AccordionContent style={{ color: colors.brown600 }}>
                Non, l'excursion dans le désert est une activité optionnelle avec un coût supplémentaire. Contactez-nous pour plus de détails.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger style={{ color: colors.brown800 }}>
                Comment réserver ?
              </AccordionTrigger>
              <AccordionContent style={{ color: colors.brown600 }}>
                Vous pouvez réserver en cliquant sur le bouton "Réserver maintenant" ci-dessous ou en nous contactant directement pour plus d'informations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* CTA Section */}
        <Card className="border-0 shadow-lg p-8 md:p-12 text-center" style={{ backgroundColor: colors.gold50 }}>
          <h3 className="text-3xl font-serif font-bold mb-4" style={{ color: colors.brown800 }}>
            Prêt(e) pour cette expérience transformatrice ?
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: colors.brown600 }}>
            Rejoignez-nous pour une semaine inoubliable de reconnexion avec vous-même dans un cadre naturel exceptionnel.
          </p>
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
        </Card>
      </div>
    </div>
  );
};

export default ProgramDetailsPage;
