// app/api/create-payment-intent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(req: NextRequest) {
  const { amount, reservationId } = await req.json();

  if (!reservationId) {
    return NextResponse.json({ error: 'reservationId manquant' }, { status: 400 });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // centimes
    currency: 'chf',
    metadata: { reservationId }, // ⚠️ correspond au webhook
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
