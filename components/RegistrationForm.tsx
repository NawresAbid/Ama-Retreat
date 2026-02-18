// components/RegistrationForm.tsx

"use client";

import { useState } from 'react';
import { User, Mail, Phone, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const colors = {
  beige50: '#FDF8F0',
  beige100: '#F9ECD9',
  brown600: '#7A5230',
  brown800: '#5C3A1F',
  gold600: '#B58C58',
  gold700: '#A37E4C',
  white: '#FFFFFF',
  red500: '#EF4444',
};

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  experience?: string;
  specialRequests: string;
}

interface RegistrationFormProps {
  onNext: (data: RegistrationData) => void | Promise<void>;
  initialData?: Partial<RegistrationData>;
}

const RegistrationForm = ({ onNext, initialData = {} }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    dateOfBirth: initialData.dateOfBirth || '',
    emergencyContact: initialData.emergencyContact || '',
    emergencyPhone: initialData.emergencyPhone || '',
    experience: initialData.experience || '',
    specialRequests: initialData.specialRequests || '',
  });

  const [errors, setErrors] = useState<Partial<RegistrationData>>({});

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'La date de naissance est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateForm()) return;
    try {
      setSubmitting(true);
      await onNext(formData);
    } catch (err: any) {
      setSubmitError(err?.message ?? 'Erreur lors de la soumission');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="bg-white shadow-xl border-0">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-serif flex items-center justify-center gap-2" style={{ color: colors.brown800 }}>
          <User size={24} />
          Informations personnelles
        </CardTitle>
        <p className="text-sm mt-2" style={{ color: colors.brown600 }}>
          Veuillez remplir tous les champs obligatoires pour votre inscription
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium" style={{ color: colors.brown800 }}>
                Prénom *
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={`mt-1 ${errors.firstName ? 'border-red-500' : ''}`}
                placeholder="Votre prénom"
              />
              {errors.firstName && (
                <p className="text-xs mt-1" style={{ color: colors.red500 }}>{errors.firstName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="lastName" className="text-sm font-medium" style={{ color: colors.brown800 }}>
                Nom *
              </Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={`mt-1 ${errors.lastName ? 'border-red-500' : ''}`}
                placeholder="Votre nom"
              />
              {errors.lastName && (
                <p className="text-xs mt-1" style={{ color: colors.red500 }}>{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1" style={{ color: colors.brown800 }}>
                <Mail size={16} />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="votre.email@exemple.com"
              />
              {errors.email && (
                <p className="text-xs mt-1" style={{ color: colors.red500 }}>{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-1" style={{ color: colors.brown800 }}>
                <Phone size={16} />
                Téléphone *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                placeholder="06 12 34 56 78"
              />
              {errors.phone && (
                <p className="text-xs mt-1" style={{ color: colors.red500 }}>{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Date de naissance */}
          <div>
            <Label htmlFor="dateOfBirth" className="text-sm font-medium flex items-center gap-1" style={{ color: colors.brown800 }}>
              <Calendar size={16} />
              Date de naissance *
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className={`mt-1 ${errors.dateOfBirth ? 'border-red-500' : ''}`}
            />
            {errors.dateOfBirth && (
              <p className="text-xs mt-1" style={{ color: colors.red500 }}>{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Contact d'urgence (optional) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyContact" className="text-sm font-medium" style={{ color: colors.brown800 }}>
                Contact d&#39;urgence(optionnel)
              </Label>
              <Input
                id="emergencyContact"
                type="text"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                className="mt-1"
                placeholder="Nom du contact d&#39;urgence"
              />
            </div>

            <div>
              <Label htmlFor="emergencyPhone" className="text-sm font-medium" style={{ color: colors.brown800 }}>
                Téléphone d&#39;urgence (optionnel)
              </Label>
              <Input
                id="emergencyPhone"
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                className="mt-1"
                placeholder="06 12 34 56 78"
              />
            </div>
          </div>

          {/* Niveau d'expérience (optional) */}
          <div>
            <Label htmlFor="experience" className="text-sm font-medium" style={{ color: colors.brown800 }}>
              Niveau d&rsquo;expérience (optionnel)
            </Label>
            <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Sélectionnez votre niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="debutant">Débutant</SelectItem>
                <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                <SelectItem value="avance">Avancé</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Demandes spéciales */}
          <div>
            <Label htmlFor="specialRequests" className="text-sm font-medium" style={{ color: colors.brown800 }}>
              Demandes spéciales(optionnel)
            </Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              className="mt-1"
              placeholder="Avez-vous des demandes particulières ou des besoins spéciaux pour ce programme ?"
              rows={3}
            />
          </div>

          {/* Bouton de soumission */}
          {submitError && (
            <p className="text-sm text-red-600">{submitError}</p>
          )}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={submitting}
              className="w-full py-3 text-lg font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: colors.gold600, color: colors.white }}
            >
              {submitting ? 'Soumission...' : 'Continuer vers le paiement'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;