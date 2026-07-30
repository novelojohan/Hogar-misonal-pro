'use client'

interface MenuLateralProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuLateral({ isOpen, onClose }: MenuLateralProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-[85%] sm:w-[400px] h-screen bg-white z-50 shadow-2xl flex flex-col p-6 rounded-l-3xl">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-6">
        <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase">
          Menú Principal
        </span>
        <button 
          onClick={onClose}
          className="p-2 rounded-full bg-zinc-50 text-zinc-500 active:bg-zinc-100 active:scale-90 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto flex-1">
        <div className="p-4 bg-[#0f3057] text-white font-medium rounded-2xl">🏠 Inicio</div>
        <div className="p-4 bg-zinc-50 text-zinc-700 font-medium rounded-2xl border border-zinc-100">📅 Pensiones 1</div>
      </div>
    </div>
  );
}