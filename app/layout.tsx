import type { Metadata } from 'next';
//import { Inter } from 'next/font/google';
import '../app/globals.css' // Assurez-vous d'importer vos styles globaux

//const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Supabase Auth',
  description: 'Authentication example with Next.js and Supabase',
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
