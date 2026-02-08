"use client";
import React, { useState, useEffect } from "react";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const checkUser = async () => {
      const supabaseClient = createClient();
      const { data: { user } } = await supabaseClient.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabaseClient
          .from("user_profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        
        const userIsAdmin = profile?.role === "admin" || user.user_metadata?.role === "admin";
        setIsAdmin(userIsAdmin);
        
        // Si déjà connecté et admin, rediriger directement
        if (userIsAdmin) {
          router.push('/admin');
        }
      }
    };
    checkUser();
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signIn(formData);
    
    if (result.status === "success" && result.user) {
      // Attendre l'établissement de la session
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const supabaseClient = createClient();
      const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
      
      if (sessionError || !session) {
        setError("Erreur lors de l'établissement de la session. Veuillez réessayer.");
        setLoading(false);
        return;
      }

      // Vérifier le rôle admin
      const { data: profile } = await supabaseClient
        .from("user_profiles")
        .select("role")
        .eq("id", result.user.id)
        .single();
      
      const userIsAdmin = profile?.role === "admin" || result.user.user_metadata?.role === "admin";
      
      if (userIsAdmin) {
        // Redirection avec rechargement complet pour garantir la session
        window.location.href = '/admin';
      } else {
        setError("Accès refusé. Vous devez être administrateur pour accéder à cette page.");
        setLoading(false);
      }
    } else {
      setError(result?.status ?? "Erreur de connexion");
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id="Email"
            name="email"
            required
            className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Mot de passe
          </label>
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            id="password"
            required
            className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div className="mt-4">
          <AuthButton type="login" loading={loading} />
        </div>
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </form>
      
      {isAdmin && (
        <div className="mt-4">
          <Button
            type="button"
            onClick={() => router.push('/admin')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            Accéder au tableau de bord Admin
          </Button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;