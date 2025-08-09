import type { Metadata } from 'next';
//import { Inter } from 'next/font/google';
import '../app/globals.css' // Assurez-vous d'importer vos styles globaux

//const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ama Retreat',
  description: 'Ama Retreat',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
