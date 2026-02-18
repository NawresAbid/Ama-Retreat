"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import RegistrationForm from "@/components/RegistrationForm";
import PaymentForm from "@/components/PaymentForm";
import { fetchPrograms, Program as ProgramFromAPI } from "@/utils/program";
import { createReservation, CreateReservationData } from "@/utils/réservation";

type Step = "registration" | "payment" | "confirmation";

type ProgramForRegistration = {
  id: string;
  title: string;
  description: string;
  duration: string;
  capacity: number;
  price: number;
  instructor: string;
  schedule: string;
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
  emergencyContact?: string; // Made optional
  emergencyPhone?: string; // Made optional
  experience?: string; // Made optional
  specialRequests: string;
};

const RegisterPage = () => {
  const params = useParams();
  const [currentStep, setCurrentStep] = useState<Step>("registration");
  const [program, setProgram] = useState<ProgramForRegistration | null>(null);
  const [registrationData, setRegistrationData] =
    useState<RegistrationData | null>(null);

  const [reservationId, setReservationId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const apiPrograms: ProgramFromAPI[] = await fetchPrograms();
        const found = apiPrograms.find(
          (p) => (p.id || p.title) === params.id
        );
        if (!found) return;
        setProgram({
          id: found.id || found.title || "",
          title: found.title || "",
          description: found.description || "",
          duration: found.duration || "",
          capacity: found.capacity ?? 0,
          price: found.price ?? 0,
          instructor: found.instructor || "",
          schedule: found.schedule || "",
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

  const handleRegistrationNext = async (data: RegistrationData) => {
    if (!program) throw new Error('Programme introuvable');

    // The validation for these fields is now removed as they are optional.
    // The `required` attribute should be removed from the RegistrationForm component.
    const resData: CreateReservationData = {
      program_id: program.id,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      date_of_birth: data.dateOfBirth,
      emergency_contact: data.emergencyContact || '', // Provide a default empty string
      emergency_phone: data.emergencyPhone || '', // Provide a default empty string
      experience: data.experience || '', // Provide a default empty string
      special_requests: data.specialRequests,
    };

    try {
      const result = await createReservation(resData);
      if (result.error || !result.reservation) {
        throw new Error('Impossible de créer la réservation.');
      }
      setRegistrationData(data);
      setReservationId(result.reservation.id);
      setCurrentStep("payment");
    } catch (err) {
      throw err;
    }
  };

  const handlePaymentBack = () => setCurrentStep("registration");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDF8F0" }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/*
          I'm assuming there's a header, progress bar, etc., in your full code.
          I'll just include the conditional rendering logic for the main content.
        */}

        <div className="mb-8">
          {currentStep === "registration" && (
            <RegistrationForm
              onNext={handleRegistrationNext}
              initialData={registrationData || {}}
            />
          )}

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

          {currentStep === "confirmation" && program && (
            <Card className="bg-white shadow-xl">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-2">
                  Inscription confirmée !
                </h2>
                <p>
                  Félicitations ! Votre inscription au programme «{" "}
                  {program.title} » est confirmée.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;