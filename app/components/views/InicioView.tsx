'use client'
import { motion, Variants } from 'framer-motion'
import StatsCard from '../ui/StatsCard'
import { Calendar, Clock, ChevronRight, Sparkles } from 'lucide-react'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
}

// 1. Definimos la interfaz para recibir setActiveTab como propiedad
interface InicioViewProps {
  setActiveTab: (tab: string) => void;
}

export default function InicioView({ setActiveTab }: InicioViewProps) {
  const renderDashboard = (title: string, reservacionesMes: number, diasDelMes: number = 31) => {
    const pendientes = diasDelMes - reservacionesMes;

    return (
      // 2. Aumentamos a mt-28 para dar todavía más espacio entre la frase y el resumen
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full mt-28">
        <h2 className="text-xl font-serif font-bold text-[#0f3057] mb-4 px-2">{title}</h2>

        {/* 3. Agregamos el evento onClick para cambiar a la pestaña 'reservar' */}
        <button 
          onClick={() => setActiveTab('reservar')}
          className="w-full mb-3 p-5 rounded-[2rem] bg-gradient-to-br from-[#0f3057] to-[#25528a] text-left flex justify-between items-center shadow-xl shadow-[#0f3057]/20 active:scale-[0.98] transition-transform"
        >
          <div>
            <div className="flex items-center gap-1.5 text-[#d4af37] mb-2">
              <Sparkles size={14} />
              <span className="text-[10px] font-bold tracking-widest uppercase">Acción Rápida</span>
            </div>
            <h3 className="text-white text-xl font-serif font-bold mb-1">Nueva Reservación</h3>
            <p className="text-blue-100/80 text-xs font-light">"Manos que sirven, corazones que nutren."</p>
          </div>
          <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
            <ChevronRight size={24} className="text-[#d4af37]" />
          </div>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <StatsCard title="Reservaciones" value={reservacionesMes} subtitle="Este mes" icon={<Calendar size={16} />} isDark={false} />
          <StatsCard title="Pendientes" value={pendientes} subtitle="De asignar" icon={<Clock size={16} />} isDark={false} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center pb-32 px-6 relative z-10">
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="w-full flex flex-col items-center">
        <img 
          src="/img/cristo.png" alt="Jesucristo" 
          className="w-full max-w-sm object-contain opacity-90 mix-blend-multiply [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] mt-4 mb-6"
        />
        <div className="w-full max-w-md text-center">
          <p className="text-slate-700 text-3xl font-manuscrita leading-relaxed">
            "Cuando os halláis al servicio de vuestros semejantes, solo estáis al servicio de vuestro Dios."
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-8 bg-[#d4af37]"></div>
            <span className="text-[#0f3057] font-sans font-bold text-[10px] tracking-[0.2em] uppercase">Mosíah 2:17</span>
            <div className="h-px w-8 bg-[#d4af37]"></div>
          </div>
        </div>
      </motion.div>

      {/* 4. Cambiamos el título a "Resumen del mes" */}
      {renderDashboard("Resumen del mes", 26, 31)}
    </motion.div>
  )
}