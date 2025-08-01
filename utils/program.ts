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

// 📥 Récupérer tous les programmes
export const fetchPrograms = async () => {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// ❌ Supprimer un programme
export const deleteProgram = async (id: string) => {
  const { error } = await supabase
    .from('programs')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
