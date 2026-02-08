"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addProgram, updateProgram, Program } from '@/utils/program';
import { uploadImage } from '@/utils/storage';
import { createClient } from '@/utils/supabase/client';

interface ProgramFormProps {
  program?: Program | null;
  onSave: (program: Program) => void;
  onCancel: () => void;
}

const ProgramForm = ({ program, onSave, onCancel }: ProgramFormProps) => {
  const colors = {
    blackOpacity50: 'rgba(0, 0, 0, 0.5)',
    white: '#FFFFFF',
    brown800: '#5C3A1F',
    brown600: '#7A5230',
    brown700: '#6B4728',
    beige300: '#D7C8AA',
    gold500: '#D4AF37',
    gold600: '#B58C58',
    gold700: '#A37E4C',
    red600: '#DC2626',
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    capacity: 0,
    price: 0,
    address: '',
    city: '',
    postal_code: '',
    instructor: '',
    // Change: schedule is now an array of objects
    schedule: [{ dayTitle: "Jour 1: L'accueil & la douceur de l'île", activities: '' }], 
    status: 'active' as 'active' | 'inactive',
    images: [] as string[], // Storage paths or URLs
  });

  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Preview URLs for display
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabaseClient = createClient();
    
    if (program && program.schedule) {
      // Split the schedule string by a separator (e.g., '---') to get day blocks
      const dayBlocks = program.schedule.split('---').map(block => block.trim()).filter(Boolean);
      const scheduleData = dayBlocks.map((block, index) => {
        const lines = block.split('\n').map(line => line.trim()).filter(Boolean);
        const dayTitle = lines[0] || `Jour ${index + 1}`;
        const activities = lines.slice(1).join('\n');
        return { dayTitle, activities };
      });

      const images = program.images ?? [];
      // Convert storage paths to public URLs for preview
      const previewUrls = images.map((img: string) => {
        // If it's already a URL (starts with http), use it
        if (img.startsWith('http')) {
          return img;
        }
        // Otherwise, it's a storage path, convert to public URL
        const { data } = supabaseClient.storage.from('programs').getPublicUrl(img);
        return data.publicUrl;
      });

      setFormData({
        title: program.title ?? '',
        description: program.description ?? '',
        duration: program.duration ?? '',
        capacity: program.capacity ?? 0,
        price: program.price ?? 0,
        address: program.address ?? '',
        city: program.city ?? '',
        postal_code: program.postal_code ?? '',
        instructor: program.instructor ?? '',
        schedule: scheduleData.length > 0 ? scheduleData : [{ dayTitle: 'Jour 1', activities: '' }],
        status: program.status ?? 'active',
        images: images, // Keep storage paths or URLs as-is
      });
      setImagePreviews(previewUrls);
      setFilesToUpload([]);
    } else {
      setFormData({
        title: '',
        description: '',
        duration: '',
        capacity: 0,
        price: 0,
        address: '',
        city: '',
        postal_code: '',
        instructor: '',
        schedule: [{ dayTitle: "Jour 1: L'accueil & la douceur de l'île", activities: '' }],
        status: 'active',
        images: [],
      });
      setImagePreviews([]);
      setFilesToUpload([]);
    }
  }, [program]);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const urls = value.split(',').map((url) => url.trim()).filter(Boolean);
    // Only update URLs (not storage paths)
    const storagePaths = formData.images.filter(img => !img.startsWith('http'));
    setFormData({ ...formData, images: [...storagePaths, ...urls] });
    
    // Update previews: storage paths -> public URLs, then URLs, then existing file previews
    const supabaseClient = createClient();
    const storagePreviews = storagePaths.map(path => {
      const { data } = supabaseClient.storage.from('programs').getPublicUrl(path);
      return data.publicUrl;
    });
    // Get existing file previews (blob URLs) from current imagePreviews
    const existingFilePreviews = imagePreviews.filter(preview => preview.startsWith('blob:'));
    setImagePreviews([...storagePreviews, ...urls, ...existingFilePreviews]);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    
    // Store files for upload on submit
    setFilesToUpload(prev => [...prev, ...fileArray]);
    
    // Create preview URLs
    const newPreviews = fileArray.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
    
    // Clear the input
    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    // Determine if it's a file preview or an existing image
    const totalExisting = formData.images.length;
    
    if (index >= totalExisting) {
      // It's a file preview
      const fileIndex = index - totalExisting;
      const newFiles = [...filesToUpload];
      newFiles.splice(fileIndex, 1);
      setFilesToUpload(newFiles);
      
      const newPreviews = [...imagePreviews];
      // Revoke the blob URL before removing
      if (newPreviews[index]?.startsWith('blob:')) {
        URL.revokeObjectURL(newPreviews[index]);
      }
      newPreviews.splice(index, 1);
      setImagePreviews(newPreviews);
    } else {
      // It's an existing image (URL or storage path)
      const newImages = [...formData.images];
      newImages.splice(index, 1);
      setFormData({ ...formData, images: newImages });
      
      const newPreviews = [...imagePreviews];
      // Revoke blob URL if it's a blob URL
      if (newPreviews[index]?.startsWith('blob:')) {
        URL.revokeObjectURL(newPreviews[index]);
      }
      newPreviews.splice(index, 1);
      setImagePreviews(newPreviews);
    }
  };

  const imagesInputValue = formData.images.filter(url => url.startsWith('http')).join(', ');

  const handleAddDay = () => {
    setFormData(prev => ({
      ...prev,
      schedule: [
        ...prev.schedule,
        { dayTitle: `Jour ${prev.schedule.length + 1}`, activities: '' },
      ],
    }));
  };

  const handleRemoveDay = (index: number) => {
    setFormData(prev => {
      const newSchedule = [...prev.schedule];
      newSchedule.splice(index, 1);
      return { ...prev, schedule: newSchedule };
    });
  };

  const handleScheduleChange = (index: number, field: 'dayTitle' | 'activities', value: string) => {
    setFormData(prev => {
      const newSchedule = [...prev.schedule];
      newSchedule[index] = { ...newSchedule[index], [field]: value };
      return { ...prev, schedule: newSchedule };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!formData.title.trim() || !formData.description.trim() || !formData.duration.trim() || !formData.instructor.trim() || !formData.address.trim() || !formData.city.trim() || !formData.postal_code.trim()) {
      setError('Veuillez remplir tous les champs obligatoires.');
      setIsLoading(false);
      return;
    }

    try {
      // Upload files first
      const uploadedPaths: string[] = [];
      for (const file of filesToUpload) {
        try {
          // Validate file before upload
          if (!file || file.size === 0) {
            setError(`Le fichier ${file.name} est vide ou invalide.`);
            setIsLoading(false);
            return;
          }
          
          // Check file size (e.g., max 10MB)
          const maxSize = 10 * 1024 * 1024; // 10MB
          if (file.size > maxSize) {
            setError(`Le fichier ${file.name} est trop volumineux (max 10MB).`);
            setIsLoading(false);
            return;
          }

          const path = await uploadImage(file);
          uploadedPaths.push(path);
        } catch (uploadError) {
          const errorMessage = uploadError instanceof Error 
            ? uploadError.message 
            : `Erreur lors de l'upload de l'image: ${file.name}`;
          console.error('Error uploading image:', uploadError);
          setError(errorMessage);
          setIsLoading(false);
          return;
        }
      }

      // Combine existing images (storage paths and URLs) with newly uploaded paths
      // Filter out URLs that are not storage paths (keep only storage paths and new uploads)
      const existingStoragePaths = formData.images.filter(img => !img.startsWith('http'));
      const allImagePaths = [...existingStoragePaths, ...uploadedPaths];

      // Combine schedule data back into a single string with a unique separator '---'
      const scheduleString = formData.schedule.map(day => `${day.dayTitle}\n${day.activities}`).join('\n---\n');

      const programData = {
        ...formData,
        schedule: scheduleString,
        images: allImagePaths, // Save storage paths to database
      };
      
      let savedProgram: Program | null = null;

      if (program && program.id) {
        savedProgram = await updateProgram(program.id, programData);
      } else {
        savedProgram = await addProgram(programData);
      }

      if (!savedProgram || !savedProgram.id) {
        setError('La sauvegarde du programme a échoué.');
      } else {
        // Clean up preview URLs
        imagePreviews.forEach(preview => {
          if (preview.startsWith('blob:')) {
            URL.revokeObjectURL(preview);
          }
        });
        setFilesToUpload([]);
        onSave(savedProgram);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: colors.blackOpacity50 }}>
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: colors.white }}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle style={{ color: colors.brown800 }}>
            {program ? 'Modifier le Programme' : 'Nouveau Programme'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel} style={{ color: colors.brown600 }} disabled={isLoading}>
            <X size={20} />
          </Button>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Images */}
              <div className="md:col-span-2">
                <Label htmlFor="images" style={{ color: colors.brown700 }}>Images</Label>
                <div className="space-y-2">
                  <Input
                    id="images"
                    value={imagesInputValue}
                    onChange={handleImagesChange}
                    placeholder="URLs séparées par des virgules (optionnel)"
                    disabled={isLoading}
                    style={{ borderColor: colors.beige300, outlineColor: colors.gold500 }}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                  />
                  <div className="flex items-center gap-2">
                    <Label htmlFor="file-upload" className="cursor-pointer" style={{ color: colors.brown700 }}>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isLoading}
                        style={{ borderColor: colors.beige300, color: colors.brown700 }}
                        className="cursor-pointer"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <Plus size={16} className="mr-2" /> Télécharger depuis PC
                      </Button>
                    </Label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageFileUpload}
                      disabled={isLoading}
                      className="hidden"
                    />
                  </div>
                  {imagePreviews.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {imagePreviews.map((preview, idx) => (
                        <div key={idx} className="relative group">
                          <Image
                            src={preview}
                            alt={`Aperçu ${idx + 1}`}
                            width={80}
                            height={80}
                            style={{ objectFit: 'cover', borderRadius: 6, border: `1px solid ${colors.beige300}` }}
                            className="rounded"
                          />
                          <Button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            variant="ghost"
                            size="sm"
                            disabled={isLoading}
                            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                            style={{ width: 24, height: 24, padding: 0 }}
                          >
                            <X size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  {(filesToUpload.length > 0 || formData.images.length > 0) && (
                    <p className="text-sm" style={{ color: colors.brown600 }}>
                      {filesToUpload.length > 0 && `${filesToUpload.length} fichier(s) à télécharger. `}
                      {formData.images.length > 0 && `${formData.images.length} image(s) existante(s).`}
                    </p>
                  )}
                </div>
              </div>

              {/* Other form fields */}
              <div>
                <Label htmlFor="title" style={{ color: colors.brown700 }}>Titre</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required disabled={isLoading} style={{ borderColor: colors.beige300, outlineColor: colors.gold500 }} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2" />
              </div>
              <div>
                <Label htmlFor="instructor" style={{ color: colors.brown700 }}>Instructeur</Label>
                <Input id="instructor" value={formData.instructor} onChange={(e) => setFormData({ ...formData, instructor: e.target.value })} required disabled={isLoading} style={{ borderColor: colors.beige300, outlineColor: colors.gold500 }} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2" />
              </div>
            </div>

            <div>
              <Label htmlFor="description" style={{ color: colors.brown700 }}>Description</Label>
              <textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required disabled={isLoading} rows={3} style={{ borderColor: colors.beige300, outlineColor: colors.gold500 }} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="duration" style={{ color: colors.brown700 }}>Durée</Label>
                <Input id="duration" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="ex: 90 min" required disabled={isLoading} style={{ borderColor: colors.beige300, outlineColor: colors.gold500 }} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2" />
              </div>
              <div>
                <Label htmlFor="capacity" style={{ color: colors.brown700 }}>Capacité</Label>
                <Input id="capacity" type="number" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })} required disabled={isLoading} style={{ borderColor: colors.beige300, outlineColor: colors.gold500 }} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2" />
              </div>
              <div>
                   <Label htmlFor="price" style={{ color: colors.brown700 }}>Prix (CHF)</Label>

                <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })} required disabled={isLoading} style={{ borderColor: colors.beige300, outlineColor: colors.gold500 }} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="address" style={{ color: colors.brown700 }}>Adresse</Label>
                <Input id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required disabled={isLoading} style={{ borderColor: colors.beige300, outlineColor: colors.gold500 }} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2" />
              </div>
              <div>
                <Label htmlFor="city" style={{ color: colors.brown700 }}>Ville</Label>
                <Input id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required disabled={isLoading} style={{ borderColor: colors.beige300, outlineColor: colors.gold500 }} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2" />
              </div>
              <div>
                <Label htmlFor="postal_code" style={{ color: colors.brown700 }}>Code Postal</Label>
                <Input id="postal_code" value={formData.postal_code} onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })} required disabled={isLoading} style={{ borderColor: colors.beige300, outlineColor: colors.gold500 }} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2" />
              </div>
            </div>

            {/* Dynamic Schedule section */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold" style={{ color: colors.brown800 }}>Horaires du programme</h3>
                <Button type="button" onClick={handleAddDay} size="sm" style={{ backgroundColor: colors.gold600, color: colors.white }} disabled={isLoading}>
                  <Plus size={16} className="mr-2" /> Ajouter un jour
                </Button>
              </div>

              {formData.schedule.map((day, index) => (
                <div key={index} className="space-y-2 p-4 rounded-lg" style={{ backgroundColor: colors.beige300, border: `1px solid ${colors.beige300}` }}>
                  <div className="flex justify-between items-center">
                    <Label htmlFor={`day-title-${index}`} style={{ color: colors.brown700 }}>Titre du Jour {index + 1}</Label>
                    {index > 0 && (
                      <Button type="button" onClick={() => handleRemoveDay(index)} variant="ghost" size="sm" style={{ color: colors.red600 }} disabled={isLoading}>
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                  <Input
                    id={`day-title-${index}`}
                    placeholder="ex: L'accueil & la douceur de l'île"
                    value={day.dayTitle}
                    onChange={(e) => handleScheduleChange(index, 'dayTitle', e.target.value)}
                    disabled={isLoading}
                    style={{ borderColor: colors.beige300, outlineColor: colors.gold500 }}
                    className="w-full"
                  />
                  <Label htmlFor={`day-activities-${index}`} style={{ color: colors.brown700 }}>Activités du Jour {index + 1}</Label>
                  <textarea
                    id={`day-activities-${index}`}
                    placeholder="Liste des activités, une par ligne."
                    value={day.activities}
                    onChange={(e) => handleScheduleChange(index, 'activities', e.target.value)}
                    required
                    disabled={isLoading}
                    rows={4}
                    style={{ borderColor: colors.beige300, outlineColor: colors.gold500 }}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                  />
                </div>
              ))}
            </div>

            <div>
              <Label htmlFor="status" style={{ color: colors.brown700 }}>Statut</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                disabled={isLoading}
                style={{ borderColor: colors.beige300, outlineColor: colors.gold500 }}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                style={{ backgroundColor: colors.gold600, color: colors.white }}
                className="flex-1 hover:bg-gold-700 disabled:opacity-50"
              >
                {isLoading ? 'Sauvegarde...' : (program ? 'Modifier' : 'Créer')}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                style={{ borderColor: colors.beige300, color: colors.brown700 }}
                className="flex-1"
              >
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramForm;