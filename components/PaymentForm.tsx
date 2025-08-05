
"use client";

import { useState } from 'react';
import { CreditCard, Lock, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const colors = {
  beige50: '#FDF8F0',
  beige100: '#F9ECD9',
  brown600: '#7A5230',
  brown800: '#5C3A1F',
  gold100: '#E0B87A',
  gold600: '#B58C58',
  gold700: '#A37E4C',
  white: '#FFFFFF',
  red500: '#EF4444',
  green500: '#10B981',
  gray100: '#F3F4F6',
  gray600: '#6B7280',
};

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

interface ProgramInfo {
  id: string;
  title: string;
  price: number;
  duration: string;
  instructor: string;
}

interface PaymentFormProps {
  program: ProgramInfo;
  onPayment: (paymentData: PaymentData) => void;
  onBack: () => void;
  isProcessing?: boolean;
}

const PaymentForm = ({ program, onPayment, onBack, isProcessing = false }: PaymentFormProps) => {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    cardholderName: '',
    billingAddress: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: 'FR',
  });

  const [errors, setErrors] = useState<Partial<PaymentData>>({});

  const handleInputChange = (field: keyof PaymentData, value: string) => {
    let formattedValue = value;

    // Formatage spécial pour le numéro de carte
    if (field === 'cardNumber') {
      // Supprimer tous les caractères non numériques
      formattedValue = value.replace(/\D/g, '');
      // Limiter à 16 chiffres
      formattedValue = formattedValue.substring(0, 16);
      // Ajouter des espaces tous les 4 chiffres
      formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    // Formatage pour le CVC
    if (field === 'cvc') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setPaymentData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentData> = {};

    // Validation du numéro de carte
    const cardNumberClean = paymentData.cardNumber.replace(/\s/g, '');
    if (!cardNumberClean) {
      newErrors.cardNumber = 'Le numéro de carte est requis';
    } else if (cardNumberClean.length !== 16) {
      newErrors.cardNumber = 'Le numéro de carte doit contenir 16 chiffres';
    }

    // Validation de la date d'expiration
    if (!paymentData.expiryMonth) {
      newErrors.expiryMonth = 'Le mois d\'expiration est requis';
    }
    if (!paymentData.expiryYear) {
      newErrors.expiryYear = 'L\'année d\'expiration est requise';
    }

    // Validation du CVC
    if (!paymentData.cvc) {
      newErrors.cvc = 'Le code CVC est requis';
    } else if (paymentData.cvc.length < 3) {
      newErrors.cvc = 'Le code CVC doit contenir au moins 3 chiffres';
    }

    // Validation du nom du titulaire
    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = 'Le nom du titulaire est requis';
    }

    // Validation de l'adresse de facturation
    if (!paymentData.billingAddress.trim()) {
      newErrors.billingAddress = 'L\'adresse de facturation est requise';
    }
    if (!paymentData.billingCity.trim()) {
      newErrors.billingCity = 'La ville est requise';
    }
    if (!paymentData.billingPostalCode.trim()) {
      newErrors.billingPostalCode = 'Le code postal est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onPayment(paymentData);
    }
  };

  // Générer les options pour les mois
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0');
    return { value: month, label: month };
  });

  // Générer les options pour les années (10 prochaines années)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => {
    const year = (currentYear + i).toString();
    return { value: year, label: year };
  });

  const taxAmount = Math.round(program.price * 0.2 * 100) / 100; // TVA 20%
  const totalAmount = program.price + taxAmount;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Récapitulatif de la commande */}
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
              <span style={{ color: colors.brown600 }}>Prix du programme :</span>
              <span style={{ color: colors.brown800 }}>{program.price}€</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: colors.brown600 }}>TVA (20%) :</span>
              <span style={{ color: colors.brown800 }}>{taxAmount}€</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span style={{ color: colors.brown800 }}>Total :</span>
              <span style={{ color: colors.gold600 }}>{totalAmount}€</span>
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

      {/* Formulaire de paiement */}
      <Card className="bg-white shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-xl font-serif flex items-center gap-2" style={{ color: colors.brown800 }}>
            <CreditCard size={24} />
            Informations de paiement
          </CardTitle>
          <p className="text-sm mt-2" style={{ color: colors.brown600 }}>
            Vos informations sont sécurisées et cryptées
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Numéro de carte */}
            <div>
              <Label htmlFor="cardNumber" className="text-sm font-medium flex items-center gap-1" style={{ color: colors.brown800 }}>
                <CreditCard size={16} />
                Numéro de carte *
              </Label>
              <Input
                id="cardNumber"
                type="text"
                value={paymentData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                className={`mt-1 ${errors.cardNumber ? 'border-red-500' : ''}`}
                placeholder="1234 5678 9012 3456"
                maxLength={19} // 16 chiffres + 3 espaces
              />
              {errors.cardNumber && (
                <p className="text-xs mt-1" style={{ color: colors.red500 }}>{errors.cardNumber}</p>
              )}
            </div>

            {/* Date d'expiration et CVC */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="expiryMonth" className="text-sm font-medium" style={{ color: colors.brown800 }}>
                  Mois *
                </Label>
                <Select value={paymentData.expiryMonth} onValueChange={(value) => handleInputChange('expiryMonth', value)}>
                  <SelectTrigger className={`mt-1 ${errors.expiryMonth ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(month => (
                      <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.expiryMonth && (
                  <p className="text-xs mt-1" style={{ color: colors.red500 }}>{errors.expiryMonth}</p>
                )}
              </div>

              <div>
                <Label htmlFor="expiryYear" className="text-sm font-medium" style={{ color: colors.brown800 }}>
                  Année *
                </Label>
                <Select value={paymentData.expiryYear} onValueChange={(value) => handleInputChange('expiryYear', value)}>
                  <SelectTrigger className={`mt-1 ${errors.expiryYear ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="AAAA" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.expiryYear && (
                  <p className="text-xs mt-1" style={{ color: colors.red500 }}>{errors.expiryYear}</p>
                )}
              </div>

              <div>
                <Label htmlFor="cvc" className="text-sm font-medium" style={{ color: colors.brown800 }}>
                  CVC *
                </Label>
                <Input
                  id="cvc"
                  type="text"
                  value={paymentData.cvc}
                  onChange={(e) => handleInputChange('cvc', e.target.value)}
                  className={`mt-1 ${errors.cvc ? 'border-red-500' : ''}`}
                  placeholder="123"
                  maxLength={4}
                />
                {errors.cvc && (
                  <p className="text-xs mt-1" style={{ color: colors.red500 }}>{errors.cvc}</p>
                )}
              </div>
            </div>

            {/* Nom du titulaire */}
            <div>
              <Label htmlFor="cardholderName" className="text-sm font-medium" style={{ color: colors.brown800 }}>
                Nom du titulaire *
              </Label>
              <Input
                id="cardholderName"
                type="text"
                value={paymentData.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                className={`mt-1 ${errors.cardholderName ? 'border-red-500' : ''}`}
                placeholder="Nom tel qu'il apparaît sur la carte"
              />
              {errors.cardholderName && (
                <p className="text-xs mt-1" style={{ color: colors.red500 }}>{errors.cardholderName}</p>
              )}
            </div>

            <Separator />

            {/* Adresse de facturation */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.brown800 }}>
                Adresse de facturation
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="billingAddress" className="text-sm font-medium" style={{ color: colors.brown800 }}>
                    Adresse *
                  </Label>
                  <Input
                    id="billingAddress"
                    type="text"
                    value={paymentData.billingAddress}
                    onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                    className={`mt-1 ${errors.billingAddress ? 'border-red-500' : ''}`}
                    placeholder="123 Rue de la Paix"
                  />
                  {errors.billingAddress && (
                    <p className="text-xs mt-1" style={{ color: colors.red500 }}>{errors.billingAddress}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="billingCity" className="text-sm font-medium" style={{ color: colors.brown800 }}>
                      Ville *
                    </Label>
                    <Input
                      id="billingCity"
                      type="text"
                      value={paymentData.billingCity}
                      onChange={(e) => handleInputChange('billingCity', e.target.value)}
                      className={`mt-1 ${errors.billingCity ? 'border-red-500' : ''}`}
                      placeholder="Paris"
                    />
                    {errors.billingCity && (
                      <p className="text-xs mt-1" style={{ color: colors.red500 }}>{errors.billingCity}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="billingPostalCode" className="text-sm font-medium" style={{ color: colors.brown800 }}>
                      Code postal *
                    </Label>
                    <Input
                      id="billingPostalCode"
                      type="text"
                      value={paymentData.billingPostalCode}
                      onChange={(e) => handleInputChange('billingPostalCode', e.target.value)}
                      className={`mt-1 ${errors.billingPostalCode ? 'border-red-500' : ''}`}
                      placeholder="75001"
                    />
                    {errors.billingPostalCode && (
                      <p className="text-xs mt-1" style={{ color: colors.red500 }}>{errors.billingPostalCode}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="billingCountry" className="text-sm font-medium" style={{ color: colors.brown800 }}>
                    Pays *
                  </Label>
                  <Select value={paymentData.billingCountry} onValueChange={(value) => handleInputChange('billingCountry', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FR">France</SelectItem>
                      <SelectItem value="BE">Belgique</SelectItem>
                      <SelectItem value="CH">Suisse</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="US">États-Unis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1"
                disabled={isProcessing}
                style={{ borderColor: colors.brown600, color: colors.brown600 }}
              >
                Retour
              </Button>
              <Button
                type="submit"
                className="flex-1 py-3 text-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.gold600, color: colors.white }}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Traitement...
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Payer {totalAmount}€
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentForm;
