"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, Calendar, MapPin, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import RegistrationForm from '@/components/RegistrationForm';
import PaymentForm from '@/components/PaymentForm';
import { fetchPrograms, Program as ProgramFromAPI } from '@/utils/program';

const colors = {
  beige50: '#FDF8F0',
  beige100: '#F9ECD9',
  brown600: '#7A5230',
  brown800: '#5C3A1F',
  gold600: '#B58C58',
  gold700: '#A37E4C',
  white: '#FFFFFF',
  green500: '#10B981',
  green100: '#D1FAE5',
};

interface ProgramForRegistration {
  id: string;
  title: string;
  description: string;
  duration: string;
  capacity: number;
  price: number;
  location: {
    address: string;
    city: string;
    postalCode: string;
  };
  instructor: string;
  schedule: string[];
}

interface RegistrationData {
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
}

interface PaymentData {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  cardholderName: string;
  billingAddress: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
}

type Step = 'registration' | 'payment' | 'confirmation';

const RegisterPage = () => {
  const router = useRouter();
  const params = useParams();
  const [currentStep, setCurrentStep] = useState<Step>('registration');
  const [program, setProgram] = useState<ProgramForRegistration | null>(null);
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  //const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    const loadProgram = async () => {
      try {
        setLoading(true);
        const apiPrograms: ProgramFromAPI[] = await fetchPrograms();
        
        const foundProgram = apiPrograms.find(p => (p.id || p.title) === params.id);
        
        if (foundProgram) {
          const formattedProgram: ProgramForRegistration = {
            id: foundProgram.id || foundProgram.title,
            title: foundProgram.title,
            description: foundProgram.description,
            duration: foundProgram.duration,
            capacity: foundProgram.capacity,
            price: foundProgram.price,
            instructor: foundProgram.instructor,
            schedule: foundProgram.schedule,
            location: {
              address: foundProgram.address,
              city: foundProgram.city,
              postalCode: foundProgram.postal_code,
            },
          };
          setProgram(formattedProgram);
        } else {
          setError("Programme non trouvé");
        }
      } catch (err) {
        console.error("Erreur de chargement du programme:", err);
        setError("Impossible de charger le programme. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadProgram();
    }
  }, [params.id]);

  const handleRegistrationNext = (data: RegistrationData) => {
    setRegistrationData(data);
    setCurrentStep('payment');
  };

  const handlePaymentBack = () => {
    setCurrentStep('registration');
  };

  const handlePayment = async (data: PaymentData) => {
    setIsProcessingPayment(true);
    //setPaymentData(data);

    // Simulation du traitement du paiement
    try {
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Ici, vous intégreriez normalement avec votre API de paiement
      console.log('Données d\'inscription:', registrationData);
      console.log('Données de paiement:', data);
      console.log('Programme:', program);
      
      // Simuler un succès
      setCurrentStep('confirmation');
    } catch (err) {
      console.error('Erreur de paiement:', err);
      setError('Erreur lors du traitement du paiement. Veuillez réessayer.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const getStepProgress = (): number => {
    switch (currentStep) {
      case 'registration': return 33;
      case 'payment': return 66;
      case 'confirmation': return 100;
      default: return 0;
    }
  };

  const getStepTitle = (): string => {
    switch (currentStep) {
      case 'registration': return 'Informations personnelles';
      case 'payment': return 'Paiement';
      case 'confirmation': return 'Confirmation';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: colors.beige50 }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center" style={{ color: colors.brown600 }}>
            <p className="text-xl">Chargement du programme...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: colors.beige50 }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="text-red-600 bg-red-100 p-6 rounded-lg max-w-md mx-auto">
              <h3 className="font-bold text-lg mb-2">Erreur</h3>
              <p>{error}</p>
            </div>
            <Button 
              onClick={() => router.back()} 
              className="mt-6"
              style={{ backgroundColor: colors.gold600, color: colors.white }}
            >
              <ArrowLeft className="mr-2" size={16} />
              Retour
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.beige50 }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête avec bouton retour */}
        <div className="mb-8">
          <Button 
            onClick={() => router.back()} 
            variant="outline"
            className="mb-6 border-2 hover:bg-opacity-10"
            style={{ 
              borderColor: colors.brown600, 
              color: colors.brown600,
              backgroundColor: 'transparent'
            }}
          >
            <ArrowLeft className="mr-2" size={16} />
            Retour aux programmes
          </Button>

          {/* Informations du programme */}
          <Card className="bg-white shadow-lg border-0 mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h1 className="text-2xl font-serif font-bold mb-2" style={{ color: colors.brown800 }}>
                    {program.title}
                  </h1>
                  <p className="text-sm" style={{ color: colors.brown600 }}>
                    {program.description}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm" style={{ color: colors.brown600 }}>
                    <User size={16} />
                    <span>Instructeur : {program.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: colors.brown600 }}>
                    <Calendar size={16} />
                    <span>Durée : {program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: colors.brown600 }}>
                    <MapPin size={16} />
                    <span>{program.location.city}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold" style={{ color: colors.gold600 }}>
                    {program.price}€
                  </div>
                  <p className="text-sm" style={{ color: colors.brown600 }}>
                    TVA incluse
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Indicateur de progression */}
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold" style={{ color: colors.brown800 }}>
                    {getStepTitle()}
                  </h2>
                  <span className="text-sm" style={{ color: colors.brown600 }}>
                    Étape {currentStep === 'registration' ? '1' : currentStep === 'payment' ? '2' : '3'} sur 3
                  </span>
                </div>
                <Progress value={getStepProgress()} className="h-2" />
              </div>
              
              <div className="flex justify-between text-xs" style={{ color: colors.brown600 }}>
                <span className={currentStep === 'registration' ? 'font-semibold' : ''}>
                  Informations
                </span>
                <span className={currentStep === 'payment' ? 'font-semibold' : ''}>
                  Paiement
                </span>
                <span className={currentStep === 'confirmation' ? 'font-semibold' : ''}>
                  Confirmation
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal selon l'étape */}
        <div className="mb-8">
          {currentStep === 'registration' && (
            <RegistrationForm 
              onNext={handleRegistrationNext}
              initialData={registrationData || {}}
            />
          )}

          {currentStep === 'payment' && (
            <PaymentForm
              program={{
                id: program.id,
                title: program.title,
                price: program.price,
                duration: program.duration,
                instructor: program.instructor,
              }}
              onPayment={handlePayment}
              onBack={handlePaymentBack}
              isProcessing={isProcessingPayment}
            />
          )}

          {currentStep === 'confirmation' && (
            <Card className="bg-white shadow-xl border-0">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" 
                       style={{ backgroundColor: colors.green100 }}>
                    <CheckCircle size={32} style={{ color: colors.green500 }} />
                  </div>
                  <h2 className="text-2xl font-serif font-bold mb-2" style={{ color: colors.brown800 }}>
                    Inscription confirmée !
                  </h2>
                  <p className="text-lg mb-6" style={{ color: colors.brown600 }}>
                    Félicitations ! Votre inscription au programme &quot;{program.title}&quot; a été confirmée.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
                  <h3 className="font-semibold mb-4" style={{ color: colors.brown800 }}>
                    Récapitulatif de votre inscription
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: colors.brown600 }}>Participant :</span>
                      <span style={{ color: colors.brown800 }}>
                        {registrationData?.firstName} {registrationData?.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.brown600 }}>Email :</span>
                      <span style={{ color: colors.brown800 }}>{registrationData?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.brown600 }}>Programme :</span>
                      <span style={{ color: colors.brown800 }}>{program.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.brown600 }}>Instructeur :</span>
                      <span style={{ color: colors.brown800 }}>{program.instructor}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span style={{ color: colors.brown800 }}>Total payé :</span>
                      <span style={{ color: colors.gold600 }}>{program.price + Math.round(program.price * 0.2 * 100) / 100}€</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm" style={{ color: colors.brown600 }}>
                    Un email de confirmation avec tous les détails vous a été envoyé à l&apos;adresse {registrationData?.email}.
                  </p>
                  
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => router.push('/')}
                      variant="outline"
                      style={{ borderColor: colors.brown600, color: colors.brown600 }}
                    >
                      Retour à l&apos;accueil
                    </Button>
                    <Button
                      onClick={() => router.push(`/programs/${program.id}`)}
                      style={{ backgroundColor: colors.gold600, color: colors.white }}
                    >
                      Voir le programme
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
