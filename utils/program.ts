import { createClient } from './supabase/client';

const supabase = createClient(); // utilise la bonne instance

export interface Program {
  id?: string;
  title: string;
  description: string;
  duration: string;
  capacity: number;
  price: number;
  address: string;
  city: string;
  postal_code: string;
  instructor: string;
  schedule: string[];
  status: 'active' | 'inactive';
}

// ➕ Ajouter un programme
export const addProgram = async (program: Omit<Program, 'id'>) => {
  const { data, error } = await supabase
    .from('programs')
    .insert([program])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ✏️ Modifier un programme
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

// api/programs.ts

// ... (votre interface Program)

// 📥 Récupérer les programmes PUBLICS (pour les clients)
export const fetchPrograms = async (): Promise<Program[]> => {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    // 1. FILTRE DE SÉCURITÉ : Ne récupérer que les programmes "actifs"
    .eq('status', 'active') 
    .order('created_at', { ascending: false });

  if (error) {
    // 2. AMÉLIORATION DU DÉBOGAGE : Log l'erreur avant de la lancer
    console.error("Erreur lors de la récupération des programmes publics:", error.message);
    throw error;
  }
  
  // 3. AMÉLIORATION DE LA ROBUSTESSE : Garantir qu'on retourne toujours un tableau
  return data || [];
};


// ❌ Supprimer un programme
export const deleteProgram = async (id: string) => {
  const { error } = await supabase
    .from('programs')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
