"use client";
import React from "react";
import { Button } from "@/components/ui/button";

interface Colors {
  beige50?: string;
  brown800?: string;
  brown600?: string;
  brown700?: string;
  gold600?: string;
}

interface Props {
  onRefresh: () => void;
  onAddProgram: () => void;
  onShowReservations: () => void;
  totalPrograms?: number;
  activePrograms?: number;
  colors?: Colors;
  customShadows?: { [k: string]: string };
}

const Sidebar = ({ onRefresh, onAddProgram, onShowReservations, totalPrograms = 0, activePrograms = 0, colors = {}, customShadows = {} }: Props) => {
  return (
    <aside className="hidden md:block bg-white rounded-lg p-4" style={{ boxShadow: customShadows.ama ?? '0 1px 2px rgba(0,0,0,0.04)' }}>
      <div className="mb-6">
        <h2 className="text-lg font-medium" style={{ color: colors.brown800 ?? undefined }}>Admin</h2>
        <p className="text-xs mt-1" style={{ color: colors.brown600 ?? '#6b7280' }}>AMA Retreat</p>
      </div>

      <nav className="flex flex-col space-y-2">
        <button onClick={onRefresh} className="text-left px-3 py-2 rounded hover:bg-[#F7F3EE]" style={{ color: colors.brown700 ?? undefined }}>Tableau de bord</button>
        <button onClick={onAddProgram} className="text-left px-3 py-2 rounded hover:bg-[#F7F3EE]" style={{ color: colors.brown700 ?? undefined }}>+ Nouveau programme</button>
        <button onClick={onShowReservations} className="text-left px-3 py-2 rounded hover:bg-[#F7F3EE]" style={{ color: colors.brown700 ?? undefined }}>Contacts & Réservations</button>
      </nav>

      <div className="mt-6 border-t pt-4">
        <div className="text-xs" style={{ color: colors.brown600 ?? '#6b7280' }}>Statistiques</div>
        <div className="mt-2">
          <div className="flex items-center justify-between text-sm" style={{ color: colors.brown700 ?? undefined }}>
            <span>Total programmes</span>
            <span className="font-semibold">{totalPrograms}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1" style={{ color: colors.brown700 ?? undefined }}>
            <span>Actifs</span>
            <span className="font-semibold">{activePrograms}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
