'use client'
import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, CalendarDays, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import * as htmlToImage from 'html-to-image'

const getWeeklyAgenda = (offset: number) => {
  const now = new Date();
  const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay(); 
  
  const currentMonday = new Date(now);
  currentMonday.setDate(now.getDate() - dayOfWeek + 1);
  
  const targetMonday = new Date(currentMonday);
  targetMonday.setDate(targetMonday.getDate() + (offset * 7));

  const daysList = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return daysList.map((dayName, index) => {
    const dayDate = new Date(targetMonday);
    dayDate.setDate(targetMonday.getDate() + index);

    let family = 'Disponible';
    let phone = '-';
    let status = 'disponible';

    if (index === 0) { family = 'Familia Novelo'; phone = '9995069580'; status = 'confirmado'; }
    if (index === 1) { family = 'Hna. Mary Ponce'; phone = '9991234567'; status = 'confirmado'; }
    if (index === 2) { family = 'Día de capacitación'; phone = '-'; status = 'capacitacion'; }
    if (index === 4) { family = 'Familia Pérez'; phone = '9999876543'; status = 'confirmado'; }
    if (index === 5) { family = 'Familia Kantún'; phone = '9995554433'; status = 'confirmado'; }

    return {
      id: index + 1,
      day: dayName,
      date: dayDate.getDate().toString(),
      family,
      phone,
      status
    };
  });
};

const getWeekDateRange = (offset: number) => {
  const now = new Date();
  const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay(); 
  const currentMonday = new Date(now);
  currentMonday.setDate(now.getDate() - dayOfWeek + 1);
  
  const targetMonday = new Date(currentMonday);
  targetMonday.setDate(targetMonday.getDate() + (offset * 7));
  
  const targetSunday = new Date(targetMonday);
  targetSunday.setDate(targetMonday.getDate() + 6);
  
  const formatMonth = (date: Date) => {
    const m = date.toLocaleDateString('es-MX', { month: 'long' });
    return m.charAt(0).toUpperCase() + m.slice(1);
  };

  const month1 = formatMonth(targetMonday);
  const month2 = formatMonth(targetSunday);
  const year = targetSunday.getFullYear();

  if (month1 === month2) {
    return `${targetMonday.getDate()} - ${targetSunday.getDate()} ${month1}, ${year}`;
  } else {
    return `${targetMonday.getDate()} ${month1} - ${targetSunday.getDate()} ${month2}, ${year}`;
  }
};

export default function AgendaView() {
  const [weekOffset, setWeekOffset] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const agendaRef = useRef<HTMLDivElement>(null)

  const dateRangeText = useMemo(() => getWeekDateRange(weekOffset), [weekOffset])
  const currentWeekAgenda = useMemo(() => getWeeklyAgenda(weekOffset), [weekOffset])

  const handleDownload = async () => {
    if (agendaRef.current) {
      try {
        setIsDownloading(true);
        await new Promise(resolve => setTimeout(resolve, 50));

        const dataUrl = await htmlToImage.toPng(agendaRef.current, {
          quality: 1.0,
          backgroundColor: '#ffffff',
          pixelRatio: 2,
        })
        const link = document.createElement('a')
        link.download = `agenda-misioneras-semana-${weekOffset}.png`
        link.href = dataUrl
        link.click()
      } catch (err) {
        console.error('Error al generar la imagen', err)
      } finally {
        setIsDownloading(false);
      }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }} 
      className="flex flex-col items-center pb-32 px-4 pt-6"
    >
      
      <div className="flex items-center justify-between w-full max-w-sm bg-slate-200/60 p-2 rounded-2xl mb-6">
        <button 
          onClick={() => setWeekOffset(prev => prev - 1)}
          disabled={weekOffset === 0}
          className={`p-2 rounded-xl transition-all ${
            weekOffset === 0 
              ? 'text-slate-400 opacity-50 cursor-not-allowed' 
              : 'text-[#0f3057] bg-white shadow-sm hover:bg-slate-50'
          }`}
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 text-[#0f3057]">
            <CalendarDays size={14} className="text-[#d4af37]" />
            <span className="text-sm font-bold tracking-wide">
              {dateRangeText}
            </span>
          </div>
          {weekOffset === 0 && (
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">
              Semana Actual
            </span>
          )}
        </div>

        <button 
          onClick={() => setWeekOffset(prev => prev + 1)}
          className="p-2 rounded-xl text-[#0f3057] bg-white shadow-sm hover:bg-slate-50 transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div 
        ref={agendaRef} 
        id="agenda-exportable" 
        className={`w-full max-w-sm bg-white border border-slate-100 flex flex-col gap-4 ${
          isDownloading ? 'rounded-none p-4' : 'rounded-[2rem] shadow-xl shadow-slate-200/50 p-0 overflow-hidden'
        }`}
      >
        {/* Título reducido a text-xl para que no luzca gigante */}
        <div className="w-full p-5 bg-gradient-to-br from-[#0f3057] to-[#25528a] text-white shadow-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <h3 className="text-white text-xl font-serif font-bold relative z-10 text-center">Agenda Semanal</h3>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <AnimatePresence mode="wait">
            <motion.div 
              key={weekOffset} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 10 }} 
              transition={{ duration: 0.2 }} 
              className="flex flex-col gap-3"
            >
              {currentWeekAgenda.map((item) => (
                <div 
                  key={item.id} 
                  className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center w-10 text-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{item.day}</span>
                      <span className={`text-xl font-serif font-bold ${item.status === 'capacitacion' ? 'text-slate-300' : 'text-[#0f3057]'}`}>
                        {item.date}
                      </span>
                    </div>

                    <div className="w-px h-8 bg-slate-200"></div>

                    <div className="flex flex-col justify-center">
                      <span className={`font-bold ${
                        item.status === 'disponible' ? 'text-emerald-500 text-sm' : 
                        item.status === 'capacitacion' ? 'text-amber-500 text-xs uppercase tracking-wide' : 'text-slate-700 text-sm'
                      }`}>
                        {item.family}
                      </span>
                    </div>
                  </div>

                  {item.status === 'confirmado' && item.phone && item.phone !== '-' && (
                    <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100">
                      <Phone size={10} className="text-slate-400" />
                      <span className="text-[11px] font-medium text-slate-600">{item.phone}</span>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button 
        onClick={handleDownload}
        className="mt-8 flex items-center gap-2 bg-[#d4af37] text-white px-6 py-3.5 rounded-2xl font-semibold shadow-lg shadow-[#d4af37]/30 active:scale-95 transition-all"
      >
        <Download size={18} strokeWidth={2.5} />
        Descargar Agenda
      </button>
    </motion.div>
  )
}