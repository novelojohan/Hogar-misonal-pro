'use client'
import { LayoutGrid, Calendar, UtensilsCrossed, AlertCircle } from 'lucide-react'

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: 'inicio', icon: LayoutGrid, label: 'Inicio' },
    { id: 'agenda', icon: Calendar, label: 'Agenda' },
    { id: 'reservar', icon: UtensilsCrossed, label: 'Reservar' },
    { id: 'restricciones', icon: AlertCircle, label: 'Restricciones' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#1e293b] rounded-3xl p-2 z-50 shadow-2xl flex justify-between items-center px-4">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300 ${
              isActive ? 'bg-[#293548] border border-zinc-600/50' : 'bg-transparent'
            }`}
          >
            <Icon 
              className={`w-6 h-6 mb-1 ${isActive ? 'text-[#d4af37]' : 'text-slate-400'}`} 
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span className={`text-[10px] font-medium ${isActive ? 'text-[#d4af37]' : 'text-slate-400'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}