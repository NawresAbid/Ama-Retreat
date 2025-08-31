"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { CreditCard, Lock, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const colors = {
  beige50: "#FDF8F0",
  beige100: "#F9ECD9",
  brown600: "#7A5230",
  brown800: "#5C3A1F",
  gold100: "#E0B87A",
  gold600: "#B58C58",
  gold700: "#A37E4C",
  white: "#FFFFFF",
  red500: "#EF4444",
  green500: "#10B981",
  gray100: "#F3F4F6",
  gray600: "#6B7280",
};

interface ProgramInfo {
  id: string;
  title: string;
  price: number;
  duration: string;
  instructor: string;
}

interface PaymentFormProps {
  program: ProgramInfo;
  reservationId: string;
  onBack: () => void;
}

function PaymentFormInner({ program, reservationId, onBack }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [billing, setBilling] = useState({
    cardholderName: "",
    billingAddress: "",
    billingCity: "",
    billingPostalCode: "",
    billingCountry: "FR",
  });
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInput = (k: keyof typeof billing, v: string) =>
    setBilling((p) => ({ ...p, [k]: v }));

  const totalAmount = program.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // Validation simple
    if (!billing.cardholderName || !billing.billingAddress || !billing.billingCity || !billing.billingPostalCode) {
      setErrorMsg("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setProcessing(true);
    setErrorMsg(null);

    try {
      // 1. Créer le PaymentIntent
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservationId, amount: totalAmount }),
      });
      const { clientSecret, error: intentError } = await res.json();
      if (intentError) throw new Error(intentError);

      // 2. Confirmer le paiement
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Élément de carte non trouvé.");

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: billing.cardholderName,
            address: {
              line1: billing.billingAddress,
              city: billing.billingCity,
              postal_code: billing.billingPostalCode,
              country: billing.billingCountry,
            },
          },
        },
      });

      if (error) {
        setErrorMsg(error.message || "Erreur lors du paiement.");
        setProcessing(false);
      } else if (paymentIntent?.status === "succeeded") {
        window.location.href = "/success";
      }
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as { message?: string }).message === "string"
      ) {
        setErrorMsg((err as { message: string }).message);
      } else {
        setErrorMsg("Erreur inattendue.");
      }
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- Récapitulatif --- */}
        <Card className="bg-white shadow-lg border-0 h-fit">
          <CardHeader>
            <CardTitle className="text-xl font-serif" style={{ color: colors.brown800 }}>
              Récapitulatif de votre commande
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: colors.beige50 }}>
              <h3 className="font-semibold text-lg mb-2" style={{ color: colors.brown800 }}>
                {program.title}
              </h3>
              <div className="space-y-2 text-sm" style={{ color: colors.brown600 }}>
                <p>Durée : {program.duration}</p>
                <p>Instructeur : {program.instructor}</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span style={{ color: colors.brown600 }}>Prix :</span>
                <span style={{ color: colors.brown800 }}>{program.price}chf</span>
              </div>
              <p className="text-xs mt-1" style={{ color: colors.gray600 }}>
                ⚠️ Le montant affiché est celui du programme. Stripe prélève une commission pour le paiement sécurisé.
              </p>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span style={{ color: colors.brown800 }}>Total :</span>
                <span style={{ color: colors.gold600 }}>{totalAmount}chf</span>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: colors.gray100 }}>
              <Shield size={16} style={{ color: colors.green500 }} />
              <span className="text-sm" style={{ color: colors.gray600 }}>
                Paiement sécurisé SSL 256-bit
              </span>
            </div>
          </CardContent>
        </Card>

        {/* --- Formulaire Stripe --- */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl font-serif flex items-center gap-2" style={{ color: colors.brown800 }}>
              <CreditCard size={24} />
              Informations de paiement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="cardholderName" className="text-sm font-medium" style={{ color: colors.brown800 }}>
                Nom du titulaire *
              </Label>
              <Input
                id="cardholderName"
                value={billing.cardholderName}
                onChange={(e) => handleInput("cardholderName", e.target.value)}
                placeholder="Nom tel qu’il apparaît sur la carte"
              />
            </div>

            <div>
              <Label className="text-sm font-medium" style={{ color: colors.brown800 }}>
                Carte bancaire *
              </Label>
              <div className="p-3 border rounded-md mt-1">
                <CardElement
                  options={{
                    style: {
                      base: { fontSize: "16px", color: colors.brown800, "::placeholder": { color: colors.gray600 } },
                      invalid: { color: colors.red500 },
                    },
                  }}
                />
                <p className="text-xs mt-1" style={{ color: colors.gray600 }}>
                  ⚠️ Entrez votre numéro de carte, date d’expiration et CVC.
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.brown800 }}>
                Adresse de facturation
              </h3>
              <div className="space-y-4">
                <Input
                  placeholder="Adresse"
                  value={billing.billingAddress}
                  onChange={(e) => handleInput("billingAddress", e.target.value)}
                />
                <Input
                  placeholder="Ville"
                  value={billing.billingCity}
                  onChange={(e) => handleInput("billingCity", e.target.value)}
                />
                <Input
                  placeholder="Code postal"
                  value={billing.billingPostalCode}
                  onChange={(e) => handleInput("billingPostalCode", e.target.value)}
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-sm mt-2" style={{ color: colors.red500 }}>
                {errorMsg}
              </p>
            )}

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={processing}
                className="flex-1"
                style={{ borderColor: colors.brown600, color: colors.brown600 }}
              >
                Retour
              </Button>
              <Button
                type="submit"
                disabled={processing || !stripe}
                className="flex-1 flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.gold600, color: colors.white }}
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Traitement…
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Payer {totalAmount}€
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}

const PaymentForm = (props: PaymentFormProps) => (
  <Elements stripe={stripePromise}>
    <PaymentFormInner {...props} />
  </Elements>
);

export default PaymentForm;
