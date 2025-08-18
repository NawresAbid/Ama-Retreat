'use client';


import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';


function SuccessContent() {
  const searchParams = useSearchParams();
  const [reservationId, setReservationId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get('reservationId');
    setReservationId(id);
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <h1 className="text-4xl font-bold text-green-800 mb-4">
        ✅ Paiement Réussi !
      </h1>
      <p className="text-lg text-green-900 mb-6">
        Merci pour votre paiement.
      </p>
      {reservationId && (
        <p className="text-green-700">
          Votre réservation ID : <strong>{reservationId}</strong>
        </p>
      )}
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
