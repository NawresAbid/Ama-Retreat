"use client";
import { useEffect, useState } from "react";
import { getReservationsByProgram, getAllReservations, Reservation } from "@/utils/réservation";
import { fetchAllPrograms } from "@/utils/program";

interface Props {
  programId?: string;
}

const Reservations = ({ programId }: Props) => {
  const [reservations, setReservations] = useState<Reservation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [programMap, setProgramMap] = useState<Record<string, string>>({});

  useEffect(() => {
    // load programs map for id -> title
    const loadProgramsMap = async () => {
      try {
        const progs = await fetchAllPrograms();
        const map: Record<string, string> = {};
        (progs || []).forEach((p: any) => {
          if (p?.id) map[p.id] = p.title ?? p.id;
        });
        setProgramMap(map);
      } catch (e) {
        // ignore program map errors silently
      }
    };
    loadProgramsMap();

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        if (programId) {
          const { reservations, error } = await getReservationsByProgram(programId);
          if (error) throw error;
          setReservations(reservations ?? []);
        } else {
          // If no programId, fetch all reservations
          const { reservations, error } = await getAllReservations();
          if (error) throw error;
          setReservations(reservations ?? []);
        }
      } catch (err: any) {
        setError(err?.message ?? String(err));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [programId]);

  if (loading) return <div>Chargement des réservations...</div>;
  if (error) return <div className="text-red-600">Erreur: {error}</div>;

  // Render table of reservations (either filtered by programId or all)
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Réservations</h2>
      {reservations && reservations.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded shadow-sm max-w-4xl mx-auto">
          <table className="w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Nom</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Téléphone</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Demande spéciale</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Statut paiement</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Programme</th>
               
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{r.first_name} {r.last_name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{r.email}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{r.phone ?? '—'}</td>
                  <td className="px-4 py-2 max-w-xs truncate text-sm text-gray-700">{r.special_requests ?? '—'}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{r.payment_status}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{programMap[r.program_id] ?? r.program_id}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Aucune réservation trouvée.</div>
      )}
    </div>
  );
};

export default Reservations;
