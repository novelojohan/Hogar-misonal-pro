'use client'
import { useState } from 'react'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import { HeartHandshake, Calendar, Phone, User, Users, X, CheckCircle2 } from 'lucide-react'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
}

// Tipo de dato para las reservaciones
interface Reservacion {
  id: string | number;
  familia: string;
  responsable: string;
  telefono: string;
  fecha: string;
}

export default function ReservarView() {
  // Estados para el formulario
  const [familia, setFamilia] = useState('')
  const [responsable, setResponsable] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fecha, setFecha] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  // Estado para la lista de reservaciones (iniciamos con una de prueba)
  const [reservaciones, setReservaciones] = useState<Reservacion[]>([
    {
      id: 1,
      familia: "Familia Novelo",
      responsable: "Hermano Novelo",
      telefono: "999 506 9580",
      fecha: "2026-07-20"
    }
  ])

  // Estado para ver los detalles
  const [selectedRes, setSelectedRes] = useState<Reservacion | null>(null)

  const handleReservar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!familia || !responsable || !telefono || !fecha) return;

    const nuevaRes: Reservacion = {
      id: Date.now(),
      familia,
      responsable,
      telefono,
      fecha
    }

    setReservaciones([nuevaRes, ...reservaciones])
    
    // Limpiar formulario
    setFamilia('')
    setResponsable('')
    setTelefono('')
    setFecha('')
    
    // Mostrar mensaje de éxito temporalmente
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="flex-1 flex flex-col items-center pb-32 px-6 relative z-10 pt-4"
    >
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="w-full max-w-sm flex flex-col gap-6">
        
        {/* Título */}
        <div className="text-center mt-2 mb-2">
          <h2 className="text-3xl font-serif font-bold text-[#0f3057]">Reservar</h2>
          <p className="text-sm text-slate-500 mt-2 font-light px-4">
            Agenda un día para compartir los alimentos.
          </p>
        </div>

        {/* CONTENEDOR DEL FORMULARIO */}
        <div className="w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-50 overflow-hidden relative p-6">
          <div className="flex items-center gap-2 text-[#0f3057] mb-6 justify-center">
            <HeartHandshake size={20} className="text-[#d4af37]" />
            <h3 className="text-lg font-serif font-bold">Nuevo Registro</h3>
          </div>

          <form onSubmit={handleReservar} className="flex flex-col gap-4">
            {/* Input Familia */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Users size={16} />
              </div>
              <input 
                type="text" required placeholder="Nombre de la familia" 
                value={familia} onChange={(e) => setFamilia(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#0f3057] focus:ring-1 focus:ring-[#0f3057] transition-all"
              />
            </div>

            {/* Input Responsable */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User size={16} />
              </div>
              <input 
                type="text" required placeholder="Responsable del registro" 
                value={responsable} onChange={(e) => setResponsable(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#0f3057] transition-all"
              />
            </div>

            {/* Input Teléfono */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone size={16} />
              </div>
              <input 
                type="tel" required placeholder="Número telefónico" 
                value={telefono} onChange={(e) => setTelefono(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#0f3057] transition-all"
              />
            </div>

            {/* Input Fecha */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Calendar size={16} />
              </div>
              <input 
                type="date" required 
                value={fecha} onChange={(e) => setFecha(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-600 focus:outline-none focus:border-[#0f3057] transition-all"
              />
            </div>

            <button 
              type="submit"
              className="w-full mt-2 bg-gradient-to-br from-[#0f3057] to-[#25528a] text-white py-3.5 rounded-2xl font-semibold shadow-lg shadow-[#0f3057]/30 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {showSuccess ? <CheckCircle2 size={18} className="text-[#d4af37]" /> : <HeartHandshake size={18} />}
              {showSuccess ? '¡Registro Exitoso!' : 'Confirmar Reservación'}
            </button>
          </form>
        </div>

        {/* LISTA DE RESERVACIONES ACTIVAS */}
        {reservaciones.length > 0 && (
          <div className="w-full flex flex-col gap-3 mt-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest px-2">Próximas</h3>
            {reservaciones.map((res) => (
              <button 
                key={res.id}
                onClick={() => setSelectedRes(res)}
                className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between active:scale-95 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex flex-col items-center justify-center border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{new Date(res.fecha).toLocaleString('es-MX', { month: 'short' })}</span>
                    <span className="text-sm font-serif font-bold text-[#0f3057] leading-none">{new Date(res.fecha).getDate() + 1}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[#0f3057] text-sm">{res.familia}</span>
                    <span className="text-xs text-slate-400">Toca para ver detalles</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* MODAL DE DETALLES */}
      <AnimatePresence>
        {selectedRes && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl border border-slate-100 relative"
            >
              <button 
                onClick={() => setSelectedRes(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-500 rounded-full active:scale-90 transition-all"
              >
                <X size={16} />
              </button>
              
              <div className="flex flex-col items-center text-center mt-2 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0f3057]">{selectedRes.familia}</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Detalles del registro</p>
              </div>

              <div className="flex flex-col gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fecha</span>
                  <span className="text-sm font-medium text-slate-700">{selectedRes.fecha}</span>
                </div>
                <div className="w-full h-px bg-slate-200"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Responsable</span>
                  <span className="text-sm font-medium text-slate-700">{selectedRes.responsable}</span>
                </div>
                <div className="w-full h-px bg-slate-200"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Teléfono</span>
                  <span className="text-sm font-medium text-slate-700">{selectedRes.telefono}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}