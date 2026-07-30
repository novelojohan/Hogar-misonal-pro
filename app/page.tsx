'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Lock, ShieldCheck, KeyRound, AlertCircle } from 'lucide-react'

import Header from './components/layout/Header'
import BottomNav from './components/layout/BottomNav'
import InicioView from './components/views/InicioView'
import AgendaView from './components/views/AgendaView'
import RestriccionesView from './components/views/RestriccionesView' // <--- Importamos la nueva vista
import ReservarView from './components/views/ReservarView'

export default function Home() {
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('inicio')
  
  const [pin, setPin] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errorPin, setErrorPin] = useState(false)

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === '2036') {
      setIsAuthenticated(true)
      setErrorPin(false)
    } else {
      setErrorPin(true)
      setIsAuthenticated(false)
    }
  }

  const handleCloseModal = () => {
    setIsAdminOpen(false)
    setPin('')
    setIsAuthenticated(false)
    setErrorPin(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-amber-50/20 flex flex-col relative overflow-x-hidden">
      
      <Header onAdminOpen={() => setIsAdminOpen(true)} />

      <main className="flex-1 w-full max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'inicio' && <InicioView key="inicio" setActiveTab={setActiveTab} />}
          {activeTab === 'agenda' && <AgendaView key="agenda" />}
          {activeTab === 'reservar' && <ReservarView key="reservar" />}
          {activeTab === 'restricciones' && <RestriccionesView key="restricciones" />}
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modal de Administrador con PIN */}
      {isAdminOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl border border-slate-100 flex flex-col items-center">
            
            <div className="w-12 h-12 rounded-2xl bg-[#0f3057]/10 flex items-center justify-center text-[#0f3057] mb-4">
              <Lock size={22} />
            </div>

            <h2 className="text-xl font-serif font-bold text-[#0f3057] mb-1 text-center">Modo Administrador</h2>
            
            {!isAuthenticated ? (
              <form onSubmit={handleVerifyPin} className="w-full mt-4 flex flex-col gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound size={16} />
                  </div>
                  <input 
                    type="password" 
                    maxLength={4}
                    placeholder="Ingresa el PIN de acceso" 
                    value={pin}
                    onChange={(e) => { setPin(e.target.value); setErrorPin(false); }}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-center tracking-widest text-lg font-bold focus:outline-none focus:border-[#0f3057] transition-all"
                    autoFocus
                  />
                </div>

                {errorPin && (
                  <div className="flex items-center justify-center gap-1.5 text-rose-500 text-xs font-medium">
                    <AlertCircle size={14} />
                    <span>PIN incorrecto. Intenta de nuevo.</span>
                  </div>
                )}

                <div className="flex gap-2 mt-2">
                  <button 
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-2xl font-semibold text-sm active:scale-95 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-[#0f3057] text-white py-3 rounded-2xl font-semibold text-sm shadow-lg shadow-[#0f3057]/20 active:scale-95 transition-all"
                  >
                    Verificar
                  </button>
                </div>
              </form>
            ) : (
              <div className="w-full mt-4 flex flex-col gap-4">
                <div className="flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 py-2.5 px-4 rounded-2xl text-xs font-semibold">
                  <ShieldCheck size={16} />
                  <span>Acceso autorizado correctamente</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-2 text-left">
                  <span className="text-xs font-bold text-[#0f3057] uppercase tracking-wider">Herramientas</span>
                  <p className="text-xs text-slate-500">Próximamente aquí podrás gestionar restricciones, nombres y registros de la base de datos.</p>
                </div>

                <button 
                  onClick={handleCloseModal}
                  className="w-full bg-[#0f3057] text-white py-3 rounded-2xl font-semibold text-sm active:scale-95 transition-all mt-2"
                >
                  Cerrar Panel
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  )
}