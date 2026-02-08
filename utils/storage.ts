// utils/storage.ts
import { createClient } from './supabase/client';

export const uploadImage = async (file: File): Promise<string> => {
  const supabase = createClient();
  
  // Valider le fichier
  if (!file || !file.name) {
    throw new Error('Fichier invalide');
  }

  // ✅ VÉRIFICATION CRITIQUE : Authentification + Rôle Admin
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('Vous devez être connecté pour uploader des images.');
  }

  // Vérifier que l'utilisateur est admin
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  
  const isAdmin = profile?.role === "admin" || user.user_metadata?.role === "admin";
  
  if (!isAdmin) {
    throw new Error('Accès refusé. Seuls les administrateurs peuvent uploader des images.');
  }

  // Obtenir l'extension du fichier
  const fileExt = file.name.split('.').pop() || 'jpg';
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `programs/${fileName}`;

  // Upload du fichier
  const { error } = await supabase.storage
    .from('programs')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    const errorMessage = error.message || 'Erreur inconnue lors de l\'upload';
    console.error("Erreur lors de l'upload de l'image:", errorMessage);
    throw new Error(`Échec de l'upload: ${errorMessage}`);
  }

  return filePath;
};