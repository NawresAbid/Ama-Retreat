import { createClient } from './supabase/client';

const supabase = createClient();
 // Adjust this import to your Supabase client path

export interface Reservation {
  id: string;
  program_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  medical_conditions?: string;
  experience?: string;
  special_requests?: string;
  payment_status: string;
  created_at: string;
}

export interface CreateReservationData {
  program_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  medical_conditions?: string;
  experience?: string;
  special_requests?: string;
}

// Create a new reservation with payment_status = 'pending'
export async function createReservation(data: CreateReservationData): Promise<{ reservation?: Reservation; error?: any }> {
  const { data: reservation, error } = await supabase
    .from('reservations')
    .insert([{ ...data, payment_status: 'pending' }])
    .select()
    .single();

  return { reservation, error };
}

// Update payment status for a reservation by ID
export async function updatePaymentStatus(reservationId: string, status: string): Promise<{ error?: any }> {
  const { error } = await supabase
    .from('reservations')
    .update({ payment_status: status })
    .eq('id', reservationId);

  return { error };
}

// Optional: Get all reservations for a specific program
export async function getReservationsByProgram(programId: string): Promise<{ reservations?: Reservation[]; error?: any }> {
  const { data: reservations, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('program_id', programId);

  return { reservations: reservations ?? undefined, error };
}
