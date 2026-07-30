'use client'
import { motion, Variants } from 'framer-motion'
import { Check } from 'lucide-react'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
}

export default function RestriccionesView() {
  const hermanas = [
    {
      id: 1,
      nombre: "Hna. Jones",
      pais: "Estados Unidos",
      codigoPais: "us", // Usamos el código para cargar la bandera real
      restricciones: "Sin restricciones registradas.",
    },
    {
      id: 2,
      nombre: "Hna. Nuñez",
      pais: "Argentina",
      codigoPais: "ar", // Usamos el código para cargar la bandera real
      restricciones: "Sin restricciones registradas.",
    }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="flex-1 flex flex-col items-center pb-32 px-6 relative z-10 pt-4"
    >
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="w-full max-w-sm flex flex-col gap-6">
        
        {/* Título Principal */}
        <div className="text-center mt-2 mb-2">
          <h2 className="text-3xl font-serif font-bold text-[#0f3057]">Restricciones</h2>
          <p className="text-sm text-slate-500 mt-2 font-light px-4">
            Alimentos que las hermanas no pueden consumir.
          </p>
        </div>

        {/* CONTENEDOR UNIFICADO ELEGANTE */}
        <div className="w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-50 overflow-hidden relative">
          
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-50 to-transparent rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

          {/* Lista de Hermanas (Sin el encabezado extra) */}
          <div className="p-2 pt-4 relative z-10">
            {hermanas.map((hermana, index) => (
              <div key={hermana.id}>
                <div className="p-5 flex flex-col gap-3 transition-colors hover:bg-slate-50/50 rounded-3xl">
                  
                  {/* Cabecera: Nombre y País */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-serif font-bold text-[#0f3057] tracking-tight">
                      {hermana.nombre}
                    </h4>
                    
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        {hermana.pais}
                      </span>
                      {/* Aquí cargamos la imagen de la bandera real */}
                      <img 
                        src={`https://flagcdn.com/w20/${hermana.codigoPais}.png`} 
                        alt={`Bandera de ${hermana.pais}`}
                        className="w-4 rounded-[2px]"
                      />
                    </div>
                  </div>

                  {/* Restricciones */}
                  <div className="flex items-start gap-3 mt-1 bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100/50">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Check size={14} className="text-emerald-600" strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-emerald-700/60 uppercase tracking-widest mb-1">
                        Restricciones
                      </span>
                      <span className="text-sm text-emerald-800 font-medium">
                        {hermana.restricciones}
                      </span>
                    </div>
                  </div>
                  
                </div>

                {/* Divisor */}
                {index < hermanas.length - 1 && (
                  <div className="px-5 my-1">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </motion.div>
  )
}