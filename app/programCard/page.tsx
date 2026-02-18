"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Clock, Users, Heart } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Importation du type Program depuis votre fichier utils
import { fetchPrograms, type Program } from "@/utils/program"; 

const colors = {
  beige50: "#FDF8F0",
  brown600: "#7A5230",
  brown800: "#5C3A1F",
  gold600: "#B58C58",
  white: "#FFFFFF",
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800";

export default function NosProgrammesPage() {
  const router = useRouter();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPrograms = async () => {
      try {
        setLoading(true);
        const data = await fetchPrograms();
        setPrograms(data);
      } catch (error) {
        console.error("Erreur fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };
    getPrograms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.beige50 }}>
        <p className="text-xl font-serif animate-pulse" style={{ color: colors.brown600 }}>
          Chargement des programmes...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 md:px-12" style={{ backgroundColor: colors.beige50 }}>
      <div className="max-w-7xl mx-auto">
        <h3 className="text-4xl md:text-6xl font-serif font-bold mb-16" style={{ color: colors.brown800 }}>
          Nos Programmes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-10">
          {programs.map((program) => (
            /* Utilisation d'une clé de secours si l'id est undefined */
            <ProgramCard 
              key={program.id || `program-${Math.random()}`} 
              program={program} 
              router={router} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgramCard({ program, router }: { program: Program; router: AppRouterInstance }) {
  const [imgSrc, setImgSrc] = useState(program.images?.[0] || DEFAULT_IMAGE);

  // Sécurisation de la navigation : si pas d'ID, on ne fait rien
  const handleViewDetails = () => {
    if (program.id) {
      router.push(`/programs/${program.id}`);
    }
  };

  return (
    <Card className="bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full rounded-2xl overflow-hidden group">
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={imgSrc}
          alt={program.title || "Programme Ama Retreat"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={() => setImgSrc(DEFAULT_IMAGE)}
        />
      </div>

      <CardHeader className="text-center pt-6 pb-2">
        <div className="flex justify-center mb-2">
          <Heart size={22} className="text-stone-300 hover:text-red-400 cursor-pointer transition-colors" />
        </div>
        <CardTitle className="text-xl font-serif font-bold" style={{ color: colors.brown800 }}>
          {program.title || "Titre non disponible"}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col grow px-8 pb-8">
        <CardDescription className="text-center text-sm line-clamp-3 mb-8" style={{ color: colors.brown600 }}>
          {program.description}
        </CardDescription>

        <div className="flex items-center justify-between text-[13px] font-medium mb-8" style={{ color: colors.brown600 }}>
          <div className="flex items-center gap-1.5">
            <Clock size={16} />
            <span>{program.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={16} />
            <span>{program.capacity} pers. max</span>
          </div>
          <div className="font-bold text-sm">
            {program.price} CHF
          </div>
        </div>

        <Button
          onClick={handleViewDetails}
          disabled={!program.id} // Désactive le bouton si l'ID est manquant
          className="w-full py-6 text-sm font-semibold tracking-wide transition-all uppercase"
          style={{ 
            backgroundColor: colors.gold600, 
            color: colors.white,
            borderRadius: "6px"
          }}
        >
          {program.id ? "Voir détails" : "Indisponible"}
        </Button>
      </CardContent>
    </Card>
  );
}