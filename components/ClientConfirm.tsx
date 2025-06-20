'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ClientConfirm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('Vérification de la confirmation...');

  useEffect(() => {
    const success = searchParams.get('success');
    const errorParam = searchParams.get('message');

    if (success === 'true') {
      setMessage('Votre email a été confirmé avec succès ! Vous pouvez maintenant vous connecter.');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } else if (errorParam) {
      setMessage(`Erreur de confirmation : ${decodeURIComponent(errorParam)}`);
    } else {
      setMessage(
        "Cette page est utilisée pour le processus de confirmation d'email. " +
        "Si vous attendiez une confirmation, veuillez vérifier le lien que vous avez utilisé. " +
        "Si vous venez de vous inscrire, un email de confirmation a été envoyé. " +
        "Veuillez cliquer sur le lien dans cet email."
      );
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <p className="text-lg font-semibold text-gray-800">{message}</p>
      </div>
    </div>
  );
}
