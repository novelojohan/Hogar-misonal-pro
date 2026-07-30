'use client'
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  isDark?: boolean;
}

export default function StatsCard({ title, value, subtitle, icon, isDark = false }: StatsCardProps) {
  return (
    <div className={`p-4 rounded-3xl flex flex-col justify-between h-32 shadow-sm transition-all ${
      isDark ? 'bg-[#15234b] text-white shadow-[#15234b]/20' : 'bg-white text-[#15234b] border border-slate-100'
    }`}>
      <div className="flex justify-between items-start w-full">
        <span className={`text-[10px] font-bold tracking-wider uppercase ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
          {title}
        </span>
        <div className={`p-1.5 rounded-lg ${isDark ? 'bg-white/10 text-[#d4af37]' : 'bg-slate-100 text-[#15234b]'}`}>
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-serif font-bold mb-0.5">{value}</h3>
        <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{subtitle}</p>
      </div>
    </div>
  )
}