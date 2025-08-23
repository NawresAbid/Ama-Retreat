'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle, Heart, Sparkles } from 'lucide-react';

function SuccessContent() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-emerald-200">
        {/* Icône animée */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <CheckCircle className="w-20 h-20 text-emerald-500 animate-pulse" />
            <Sparkles className="w-6 h-6 text-amber-400 absolute -top-2 -right-2 animate-bounce" />
          </div>
        </div>

        {/* Titre avec émoticône et animation */}
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 mb-3">
          Félicitations 🎉
        </h1>

        {/* Message chaleureux */}
        <p className="text-lg text-gray-700 mb-2">
          Votre paiement a été reçu avec succès !
        </p>
        <p className="text-gray-600 mb-8">
          Nous avons hâte de vous accueillir. Un email de confirmation vient de vous être envoyé.
        </p>

        {/* Bouton stylisé */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all duration-300"
        >
          <Heart className="w-5 h-5" />
          Retour à l&apos;accueil
        </Link>

        {/* Décor subtil */}
        <div className="mt-10 flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}