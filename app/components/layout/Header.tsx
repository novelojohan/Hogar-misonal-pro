'use client'
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface HeaderProps {
  onAdminOpen: () => void;
}

export default function Header({ onAdminOpen }: HeaderProps) {
  
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full pt-8 pb-4 relative z-10"
    >
      <div className="max-w-7xl mx-auto flex items-center px-6 justify-between">
        
        {/* LOGO CON RECARGA */}
        <button 
          onClick={handleReload}
          className="text-2xl font-mogra tracking-tight active:scale-95 transition-transform text-left"
        >
          <span className="text-[#0f3057]">Hogar</span>
          <span className="text-[#d4af37]">Misional</span>
        </button>

        {/* BOTÓN SECRETO DE ADMINISTRADOR (Candado discreto) */}
        <button 
          onClick={onAdminOpen}
          className="p-2 flex items-center justify-center text-slate-300 hover:text-[#0f3057] active:scale-90 transition-all opacity-30 hover:opacity-100"
          title="Modo Administrador"
        >
          <Lock size={16} />
        </button>

      </div>
    </motion.header>
  );
}