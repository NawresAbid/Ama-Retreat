import type { Metadata } from 'next';
//import { Inter } from 'next/font/google';
import '../app/globals.css' // Assurez-vous d'importer vos styles globaux

//const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ama Retreat',
  description: 'Ama Retreat',
  icons: {
    icon: '/favicon-v2.ico', // chemin mis à jour
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
