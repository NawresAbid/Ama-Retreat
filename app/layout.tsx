import type { Metadata } from "next";
import "../app/globals.css";

export const metadata: Metadata = {
  title: "Ama Retreat | Yoga & Bien-être en Tunisie",
  description:
    "Ama Retreat propose des retraites de yoga et de bien-être en Tunisie pour retrouver sérénité, énergie et équilibre intérieur.",
  keywords: [
    "Ama Retreat",
    "retraite yoga Tunisie",
    "bien-être Tunisie",
    "méditation",
    "séjour détente",
    "yoga et bien-être",
  ],
  authors: [{ name: "Ama Retreat" }],
  robots: {
    index: true,   // autoriser Google à indexer
    follow: true,  // autoriser à suivre les liens
  },
  alternates: {
    canonical: "https://www.amaretreat.com", // URL canonique pour éviter le contenu dupliqué
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon-v2.ico" />
        <link rel="shortcut icon" href="/favicon-v2.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
