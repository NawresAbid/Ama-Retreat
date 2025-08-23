"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
//import { ArrowLeft, CheckCircle, Calendar, MapPin, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
//import { Button } from "@/components/ui/button";
//import { Progress } from "@/components/ui/progress";
import RegistrationForm from "@/components/RegistrationForm";
import PaymentForm from "@/components/PaymentForm"; // <-- Stripe-based
import { fetchPrograms, Program as ProgramFromAPI } from "@/utils/program";
import { createReservation, CreateReservationData } from "@/utils/réservation";

/* … colors, ProgramForRegistration, RegistrationData …  (keep as you have) */

type Step = "registration" | "payment" | "confirmation";

type ProgramForRegistration = {
  id: string;
  title: string;
  description: string;
  duration: string;
  capacity: number;
  price: number;
  instructor: string;
  schedule: string[];
  location: {
    address: string;
    city: string;
    postalCode: string;
  };
};

type RegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalConditions: string;
  experience: string;
  specialRequests: string;
};

const RegisterPage = () => {
  const params = useParams();
  const [currentStep, setCurrentStep] = useState<Step>("registration");
  const [program, setProgram] = useState<ProgramForRegistration | null>(null);
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [reservationId, setReservationId] = useState<string | null>(null);
  /* ---------- load program ---------- */
  useEffect(() => {
    (async () => {
      try {
        const apiPrograms: ProgramFromAPI[] = await fetchPrograms();
        const found = apiPrograms.find((p) => (p.id || p.title) === params.id);
        if (!found) return;
        setProgram({
          id: found.id || found.title || "",
          title: found.title || "",
          description: found.description || "",
          duration: found.duration || "",
          capacity: found.capacity ?? 0,
          price: found.price ?? 0,
          instructor: found.instructor || "",
          schedule: found.schedule || [],
          location: {
            address: found.address || "",
            city: found.city || "",
            postalCode: found.postal_code || "",
          },
        });
      } catch {
        // fail silently
      }
    })();
  }, [params.id]);

  /* ---------- step 1 : registration ---------- */
  const handleRegistrationNext = async (data: RegistrationData) => {
    if (!program) return;

    const resData: CreateReservationData = {
      program_id: program.id,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      date_of_birth: data.dateOfBirth,
      emergency_contact: data.emergencyContact,
      emergency_phone: data.emergencyPhone,
      medical_conditions: data.medicalConditions,
      experience: data.experience,
      special_requests: data.specialRequests,
    };

    const { reservation } = await createReservation(resData);
    if (!reservation) return;
    setRegistrationData(data);
    setReservationId(reservation.id);
    setCurrentStep("payment");
  };

  /* ---------- step 2 : payment ---------- */
  const handlePaymentBack = () => setCurrentStep("registration");

  /* ---------- render ---------- */
  // (keep your existing render for loading / error / confirmation)
  // only the PaymentForm call changes:

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDF8F0" }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* … header, program card, progress, etc. … */}

        <div className="mb-8">
          {/* registration */}
          {currentStep === "registration" && (
            <RegistrationForm
              onNext={handleRegistrationNext}
              initialData={registrationData || {}}
            />
          )}

          {/* payment */}
          {currentStep === "payment" && program && reservationId && (
            <PaymentForm
              program={{
                id: program.id,
                title: program.title,
                price: program.price,
                duration: program.duration,
                instructor: program.instructor,
              }}
              reservationId={reservationId}
              onBack={handlePaymentBack}
            />
          )}

          {/* confirmation */}
          {currentStep === "confirmation" && program && (
            <Card className="bg-white shadow-xl">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Inscription confirmée !</h2>
                <p>Félicitations ! Votre inscription au programme « {program.title} » est confirmée.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;