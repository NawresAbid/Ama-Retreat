// storage.ts
import { createClient } from './supabase/client';

const supabase = createClient();

export const uploadImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `programs/${fileName}`;

  const { error } = await supabase.storage
    .from('programs')
    .upload(filePath, file);

  if (error) {
    console.error("Erreur lors de l'upload de l'image:", error.message);
    throw error;
  }

  return filePath; // C'est ce qu'on enregistre dans la DB
};
