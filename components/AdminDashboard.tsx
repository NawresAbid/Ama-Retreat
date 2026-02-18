"use client"; // Ce composant est un composant client car il utilise des hooks React comme useState.

import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react'; // Only import icons still used directly
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ProgramForm from '@/components/ProgramForm';
import Reservations from '@/components/Reservations';
import Sidebar from '@/components/Sidebar';
import { deleteProgram, fetchPrograms, Program } from '@/utils/program';

// Define colors and shadows directly within the component, matching the desired aesthetic
const colors = {
  beige50: '#FDF8F0', // Light background for the page
  brown800: '#5C3A1F', // Dark brown for headings
  brown600: '#7A5230', // Medium brown for text and descriptions
  brown700: '#6B4728', // Darker brown for table headers and main text
  brown500: '#8B4513', // Slightly lighter brown for small text (e.g., "3 actifs")
  gold600: '#B58C58', // Gold for primary buttons and icons
  gold700: '#A37E4C', // Darker gold for button hover
  gold400: '#E6C772', // Gold for stats card icons (matches image)
  white: '#FFFFFF', // White for cards and button text
  green100: '#D4EDDA', // Light green for active status background
  green800: '#155724', // Dark green for active status text
  red100: '#F8D7DA', // Light red for inactive status background
  red800: '#721C24', // Dark red for inactive status text
  blue600: '#2563EB', // Blue for edit button
  blue700: '#1D4ED8', // Darker blue for edit button hover
  red600: '#DC2626', // Red for delete button
  red700: '#B91C1C', // Darker red for delete button hover
};

// Custom shadow definition to match the image's card shadows
const customShadows = {
  ama: '0px 4px 10px rgba(0, 0, 0, 0.05)', // Subtle shadow
};

// Custom SVG for Calendar icon (matching image style)
const CustomCalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

// Custom SVG for Users icon (matching image style)
const CustomUsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

// Custom SVG for Location/Money icon (matching image style, similar to MapPin but for money context)
const CustomMapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
    <circle cx="12" cy="9" r="3"></circle>
  </svg>
);

// Interface pour l'affichage des programmes (compatible avec l'interface existante)
interface ProgramData {
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
  schedule: string;
  status: 'active' | 'inactive';
}

const AdminDashboard = () => {
  // État pour gérer la liste des programmes
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // État pour gérer le formulaire de programme (modale d'ajout/édition)
  const [isFormOpen, setIsFormOpen] = useState(false);
  // État pour gérer le programme en cours d'édition
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  // État pour afficher les réservations
  const [showReservations, setShowReservations] = useState(false);

  // Fonction pour convertir Program (Supabase) vers ProgramData (affichage)
  const convertProgramToDisplayFormat = (program: Program): ProgramData => ({
    id: program.id || '',
    title: program.title ?? '',
    description: program.description,
    duration: program.duration,
    capacity: program.capacity,
    price: program.price,
    location: {
      address: program.address,
      city: program.city,
      postalCode: program.postal_code,
    },
    instructor: program.instructor,
    schedule: program.schedule,
    status: program.status,
  });

  // Fonction pour convertir ProgramData vers Program (pour l'édition)
  const convertDisplayFormatToProgram = (programData: ProgramData): Program => ({
    id: programData.id,
    title: programData.title,
    description: programData.description,
    duration: programData.duration,
    capacity: programData.capacity,
    price: programData.price,
    address: programData.location.address,
    city: programData.location.city,
    postal_code: programData.location.postalCode,
    instructor: programData.instructor,
    schedule: programData.schedule,
    status: programData.status,
  });

  // Charger les programmes depuis la base de données
  const loadPrograms = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchPrograms();
      const displayPrograms = data.map(convertProgramToDisplayFormat);
      setPrograms(displayPrograms);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des programmes');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Charger les programmes au montage du composant
  useEffect(() => {
    loadPrograms();
  }, [loadPrograms]);

  // Gestionnaires pour les opérations CRUD
  const handleAddProgram = () => {
    setEditingProgram(null); // Efface les données de programme existantes
    setIsFormOpen(true); // Ouvre le formulaire
  };

  const handleEditProgram = (programData: ProgramData) => {
    const program = convertDisplayFormatToProgram(programData);
    setEditingProgram(program); // Définit le programme à éditer
    setIsFormOpen(true); // Ouvre le formulaire
  };

  const handleDeleteProgram = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) {
      return;
    }

    try {
      setError(null);
      await deleteProgram(id);
      // Recharger la liste des programmes après suppression
      await loadPrograms();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression du programme');
    }
  };

  // Gestionnaire pour sauvegarder un programme (appelé par ProgramForm)
  const handleSaveProgram = async () => {
    try {
      setError(null);
      // Le ProgramForm gère déjà l'ajout/modification via les fonctions Supabase
      // On recharge simplement la liste des programmes
      await loadPrograms();
      setIsFormOpen(false);
      setEditingProgram(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde du programme');
    }
  };

  // Calcule les statistiques du tableau de bord
  const totalPrograms = programs.length;
  const activePrograms = programs.filter(p => p.status === 'active').length;
  const totalCapacity = programs.reduce((sum, p) => sum + p.capacity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 flex items-center justify-center" style={{ backgroundColor: colors.beige50 }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-b-2 mx-auto mb-4" style={{ borderColor: colors.gold600 }}></div>
          <p style={{ color: colors.brown600 }}>Chargement des programmes...</p>
        </div>
      </div>
    );
  }

  return (
    // Conteneur principal du tableau de bord d'administration avec sidebar
    <div className="min-h-screen p-2 sm:p-4 md:p-6" style={{ backgroundColor: colors.beige50 }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <Sidebar
          onRefresh={loadPrograms}
          onAddProgram={handleAddProgram}
          onShowReservations={() => setShowReservations(true)}
          totalPrograms={totalPrograms}
          activePrograms={activePrograms}
          colors={colors}
          customShadows={customShadows}
        />

        <main className="space-y-6">
        {/* Affichage des erreurs */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span>{error}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setError(null)}
                style={{ color: colors.red600 }}
              >
                ×
              </Button>
            </div>
          </div>
        )}

        {/* Section d'en-tête du tableau de bord */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: colors.brown800 }}>
              Dashboard Administrateur
            </h1>
            <p className="mt-2 text-base sm:text-lg" style={{ color: colors.brown600 }}>
              Gérez vos programmes AMA Retreat
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              onClick={loadPrograms}
              variant="outline"
              style={{ borderColor: colors.gold600, color: colors.gold600 }}
              className="hover:bg-gold-50 w-full sm:w-auto"
            >
              Actualiser
            </Button>
            <Button
              onClick={handleAddProgram}
              style={{ backgroundColor: colors.gold600, color: colors.white }}
              className="hover:bg-gold-700 w-full sm:w-auto"
            >
              <Plus size={20} className="mr-2" />
              Nouveau Programme
            </Button>
          </div>
        </div>

        {/* Section des cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <Card style={{ backgroundColor: colors.white, boxShadow: customShadows.ama }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium" style={{ color: colors.brown600 }}>
                Total Programmes
              </CardTitle>
              <CustomCalendarIcon style={{ color: colors.gold400 }} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: colors.brown800 }}>{totalPrograms}</div>
              <p className="text-xs" style={{ color: colors.brown500 }}>
                {activePrograms} actifs
              </p>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: colors.white, boxShadow: customShadows.ama }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium" style={{ color: colors.brown600 }}>
                Capacité Totale
              </CardTitle>
              <CustomUsersIcon style={{ color: colors.gold400 }} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: colors.brown800 }}>{totalCapacity}</div>
              <p className="text-xs" style={{ color: colors.brown500 }}>
                places disponibles
              </p>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: colors.white, boxShadow: customShadows.ama }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium" style={{ color: colors.brown600 }}>
                Revenus Potentiels
              </CardTitle>
              <CustomMapPinIcon style={{ color: colors.gold400 }} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: colors.brown800 }}>
                {programs.reduce((sum, p) => sum + (p.price * p.capacity), 0)}chf
              </div>
              <p className="text-xs" style={{ color: colors.brown500 }}>
                si complet
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contacts & Réservations panel (visible in main content) */}
        <Card style={{ backgroundColor: colors.white, boxShadow: customShadows.ama }}>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <div>
                <CardTitle style={{ color: colors.brown800 }}>Contacts & Réservations</CardTitle>
                <CardDescription style={{ color: colors.brown600 }}>Liste des réservations</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Reservations />
          </CardContent>
        </Card>

        {/* Mobile drawer for Reservations */}
        {showReservations && (
          <div className="sm:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowReservations(false)} />
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg overflow-auto" style={{ boxShadow: customShadows.ama }}>
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-medium" style={{ color: colors.brown800 }}>Contacts & Réservations</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowReservations(false)} style={{ color: colors.brown700 }}>Fermer</Button>
              </div>
              <div className="p-4">
                <Reservations />
              </div>
            </div>
          </div>
        )}

        {/* Section du tableau des programmes */}
        <Card style={{ backgroundColor: colors.white, boxShadow: customShadows.ama }}>
          <CardHeader>
            <CardTitle style={{ color: colors.brown800 }}>Liste des Programmes</CardTitle>
            <CardDescription style={{ color: colors.brown600 }}>
              Gérez et modifiez vos programmes
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0 sm:p-6">
            {programs.length === 0 ? (
              <div className="text-center py-8">
                <p style={{ color: colors.brown600 }}>Aucun programme trouvé.</p>
                <Button
                  onClick={handleAddProgram}
                  style={{ backgroundColor: colors.gold600, color: colors.white }}
                  className="mt-4"
                >
                  <Plus size={16} className="mr-2" />
                  Créer votre premier programme
                </Button>
              </div>
            ) : (
              <div className="w-full min-w-150 sm:min-w-0">
                <Table className="text-xs sm:text-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ color: colors.brown700 }}>Programme</TableHead>
                      <TableHead style={{ color: colors.brown700 }}>Instructeur</TableHead>
                      <TableHead style={{ color: colors.brown700 }}>Durée</TableHead>
                      <TableHead style={{ color: colors.brown700 }}>Capacité</TableHead>
                      <TableHead style={{ color: colors.brown700 }}>Prix</TableHead>
                      <TableHead style={{ color: colors.brown700 }}>Statut</TableHead>
                      <TableHead style={{ color: colors.brown700 }}>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programs.map((programData) => (
                      <TableRow key={programData.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium" style={{ color: colors.brown800 }}>{programData.title}</div>
                            <div className="text-xs sm:text-sm" style={{ color: colors.brown600 }}>{programData.location.city}</div>
                          </div>
                        </TableCell>
                        <TableCell style={{ color: colors.brown700 }}>{programData.instructor}</TableCell>
                        <TableCell style={{ color: colors.brown700 }}>{programData.duration}</TableCell>
                        <TableCell style={{ color: colors.brown700 }}>{programData.capacity}</TableCell>
                        <TableCell style={{ color: colors.brown700 }}>{programData.price}chf</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium`}
                            style={{
                              backgroundColor: programData.status === 'active' ? colors.green100 : colors.red100,
                              color: programData.status === 'active' ? colors.green800 : colors.red800,
                            }}
                          >
                            {programData.status === 'active' ? 'Actif' : 'Inactif'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(`/programme/${programData.id}`, '_blank')}
                              style={{ color: colors.gold600 }}
                              className="hover:text-gold-700"
                              title="Voir le programme"
                            >
                              <Eye size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditProgram(programData)}
                              style={{ color: colors.blue600 }}
                              className="hover:text-blue-700"
                              title="Modifier le programme"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteProgram(programData.id)}
                              style={{ color: colors.red600 }}
                              className="hover:text-red-700"
                              title="Supprimer le programme"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modale du formulaire de programme */}
        {isFormOpen && (
          <ProgramForm
            program={editingProgram}
            onSave={handleSaveProgram}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingProgram(null);
            }}
          />
        )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;