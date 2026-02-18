// app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export const config = {
  api: {
    bodyParser: false, // Stripe requires raw body
  },
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('❌ Signature invalide :', message);
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 });
  }

  const supabase = await createClient({ forceAdmin: true });
  const obj = (event.data.object as Stripe.PaymentIntent | Stripe.PaymentIntent);

  // Fonction utilitaire pour mettre à jour la réservation
  const updateReservation = async (id: string, status: 'succeeded' | 'failed') => {
    const { error } = await supabase
      .from('reservations')
      .update({ payment_status: status })
      .eq('id', id);
    if (error) console.error(`❌ Erreur MAJ reservation : ${status}`, error);
  };

  switch (event.type) {
    case 'payment_intent.succeeded':
      if (!obj.metadata?.reservationId) break;

      await updateReservation(obj.metadata.reservationId, 'succeeded');

      // Ajouter le paiement
      const { error: insertError } = await supabase.from('payments').insert([
        {
          reservation_id: obj.metadata.reservationId,
          stripe_payment_intent_id: obj.id,
          amount: obj.amount,
          currency: obj.currency,
          status: 'succeeded',
        },
      ]);
      if (insertError) console.error('❌ Erreur insert payments :', insertError);
      else console.log('✅ Paiement enregistré :', obj.id);
      break;

    case 'payment_intent.payment_failed':
      if (obj.metadata?.reservationId) {
        await updateReservation(obj.metadata.reservationId, 'failed');
      }
      console.log('❌ Paiement échoué :', obj.last_payment_error?.message);
      break;

    default:
      console.log('ℹ️ Événement reçu :', event.type);
  }

  return NextResponse.json({ received: true });
}
