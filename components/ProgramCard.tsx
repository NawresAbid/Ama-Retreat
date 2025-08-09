"use client";

import { useRouter } from "next/navigation";
import { Clock, Users, Euro } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Image from "next/image";

const colors = {
  beige50: "#FDF8F0",
  beige100: "#F9ECD9",
  brown600: "#7A5230",
  brown800: "#5C3A1F",
  gold100: "#E0B87A",
  gold600: "#B58C58",
  gold700: "#A37E4C",
  white: "#FFFFFF",
};

const customIcons = {
  yoga: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  alimentation: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 2c.5 1.5 1 3 1 5s-.5 3.5-1 5c-.5 1.5-1 3-1 5h2c0-2 1-4 1.5-5.5.5-1.5 1-3 1-5s-.5-3.5-1-5c-.5-1.5-1-3-1-5H7z" />
      <path d="M17 2c-.5 1.5-1 3-1 5s.5 3.5 1 5c.5 1.5 1 3 1 5h-2c0-2-1-4-1.5-5.5-.5-1.5-1-3-1-5s.5-3.5 1-5c.5-1.5 1-3 1-5h2z" />
      <line x1="12" y1="2" x2="12" y2="22" strokeWidth="1" />
    </svg>
  ),
  sport: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12h3.5l2.5-8 5 16 2.5-8H21" />
    </svg>
  ),
  massage: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
      <path d="M20 10l-1.5 1.5L17 13l1.5 1.5L20 16l1.5-1.5L23 13l-1.5-1.5L20 10z" />
      <path d="M4 10l-1.5 1.5L1 13l1.5 1.5L4 16l1.5-1.5L7 13l-1.5-1.5L4 10z" />
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

interface ProgramCardProps {
  program: ProgramForCard;
  iconType: keyof typeof customIcons;
  buttonBgColor: string;
  buttonTextColor: string;
  imageUrl?: string;
}

const ProgramCard = ({
  program,
  iconType,
  buttonBgColor,
  buttonTextColor,
  imageUrl,
}: ProgramCardProps) => {
  const router = useRouter();
  const IconComponent = customIcons[iconType];

  const handleViewDetails = () => {
    router.push(`/programs/${program.id}`);
  };

  return (
    <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md flex flex-col">
      <CardHeader className="text-center pb-4">
        <Image
          src={
            imageUrl ||
            "https://media.istockphoto.com/id/499195103/photo/africa-tunisia-jerba-beach.jpg?s=612x612&w=0&k=20&c=n0Y1oOwakn6BQexWLy9mozDbHligNQf7Lhj2H4eXPmI="
          }
          alt={program.title}
          width={400}
          height={260}
          className="w-full h-64 object-cover rounded-t-2xl"
          style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
          priority
        />
        <div className="flex justify-center mt-2">
          <IconComponent
            width={32}
            height={32}
            style={{ color: colors.brown800 }}
          />
        </div>
        <CardTitle
          className="text-xl font-serif"
          style={{ color: colors.brown800 }}
        >
          {program.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col flex-grow">
        <CardDescription
          className="text-center leading-relaxed flex-grow"
          style={{ color: colors.brown600 }}
        >
          {program.description}
        </CardDescription>
        <div
          className="flex items-center justify-between text-sm"
          style={{ color: colors.brown600 }}
        >
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
          onClick={handleViewDetails}
          className="w-full mt-auto hover:opacity-90 transition-opacity"
          style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
        >
          Voir détails
        </Button>
      </CardContent>
    </Card>
  );
};

export { ProgramCard };
