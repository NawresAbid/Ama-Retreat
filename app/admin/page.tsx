"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";
import { createClient } from "@/utils/supabase/client";

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    const checkAdminAccess = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          if (mounted) {
            router.push('/login');
          }
          return;
        }

        const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !currentUser) {
          if (mounted) {
            router.push('/login');
          }
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("user_profiles")
          .select("role")
          .eq("id", currentUser.id)
          .single();
        
        if (profileError) {
          console.error("Erreur lors de la récupération du profil:", profileError);
        }

        const userIsAdmin = profile?.role === "admin" || currentUser.user_metadata?.role === "admin";
        
        if (!userIsAdmin) {
          if (mounted) {
            router.push('/');
          }
          return;
        }

        if (mounted) {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'accès admin:", error);
        if (mounted) {
          router.push('/login');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkAdminAccess();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.push('/login');
      } else if (event === 'SIGNED_IN' && session?.user) {
        checkAdminAccess();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B58C58] mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de l'accès administrateur...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <AdminDashboard />; {/* ✅ Sans la prop user */}
}