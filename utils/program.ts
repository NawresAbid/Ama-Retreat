import { createClient } from './supabase/client';

const supabase = createClient();

export interface Program {
  id?: string;
  title?: string;
  description: string;
  duration: string;
  capacity: number;
  price: number;
  address: string;
  city: string;
  postal_code: string;
  instructor: string;
  schedule: string;
  status: 'active' | 'inactive';
  images?: string[]; // stocke ici les chemins dans le storage (ex: programs/123456.jpg)
}

// Ajouter un programme
export const addProgram = async (program: Omit<Program, 'id'>) => {
  const { data, error } = await supabase
    .from('programs')
    .insert([program])
    .select()
    .single();
  if (error) throw error;
  return data;
};

// Modifier un programme
export const updateProgram = async (id: string, program: Omit<Program, 'id'>) => {
  const { data, error } = await supabase
    .from('programs')
    .update(program)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

// Récupérer les programmes publics avec URLs publiques pour les images
export const fetchPrograms = async (): Promise<Program[]> => {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Pour chaque programme, convertir les chemins images en URLs publiques
  return (data || []).map(program => {
    if (program.images && program.images.length) {
      const imagesUrls = program.images.map((path: string) => {
        const { data } = supabase.storage.from('programs').getPublicUrl(path);
        return data.publicUrl;
      });
      return { ...program, images: imagesUrls };
    }
    return program;
  });
};

// Récupérer tous les programmes (pour admin) avec URLs publiques pour les images
export const fetchAllPrograms = async (): Promise<Program[]> => {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Pour chaque programme, convertir les chemins images en URLs publiques
  return (data || []).map(program => {
    if (program.images && program.images.length) {
      const imagesUrls = program.images.map((path: string) => {
        const { data } = supabase.storage.from('programs').getPublicUrl(path);
        return data.publicUrl;
      });
      return { ...program, images: imagesUrls };
    }
    return program;
  });
};

// Supprimer un programme
export const deleteProgram = async (id: string) => {
  const { error } = await supabase
    .from('programs')
    .delete()
    .eq('id', id);
  if (error) throw error;
};


export async function getAllPrograms() {
  const { data, error } = await supabase
    .from('programs')
    .select('id'); // juste l'ID pour le sitemap

  if (error) {
    console.error('Erreur getAllPrograms:', error);
    return [];
  }
  return data; // [{ id: '1' }, { id: '2' }, ...]
}
