"use client";

import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Connexion
          </h1>
          <LoginForm />
          
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-center text-sm">
              <span className="text-gray-600">Vous n'avez pas de compte ?</span>
              <Link className="font-bold ml-2 text-blue-600 hover:text-blue-800" href="/register">
                S'inscrire
              </Link>
            </div>
            <div className="flex items-center justify-center text-sm">
              <span className="text-gray-600">Mot de passe oublié ?</span>
              <Link className="font-bold ml-2 text-blue-600 hover:text-blue-800" href="/forgot-password">
                Réinitialiser
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

