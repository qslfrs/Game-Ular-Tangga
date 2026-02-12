import React from 'react';

export default function SetupView({ playerCount, setPlayerCount, onStart }) {
  return (
    <div 
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/Bg-Setup.png')" }}
    >
      {/* Container Utama */}
      <div className="relative w-full max-w-4xl px-6 flex flex-col items-center">
        
         {/* Bintang di Atas */}
        <div className="relative z-30 mb-[-45px] w-48 md:w-64 drop-shadow-lg">
          <img src="/3-Bintang.png" alt="Stars" className="w-full h-auto" />
        </div>

        {/* CARD SETUP (Efek Kertas Perkamen) */}
        <div className="relative z-10 w-full bg-[#F3E5D8]/95 backdrop-blur-sm border-[10px] border-white/40 rounded-[60px] shadow-[0_25px_60px_rgba(0,0,0,0.5)] p-10 md:p-16 flex flex-col items-center">
          
          <h2 className="text-3xl md:text-5xl font-black text-[#2D5A8E] mb-12 text-center tracking-tight">
            Pilih Jumlah Pemain
          </h2>

          {/* Opsi Jumlah Pemain */}
          <div className="flex gap-6 md:gap-10 mb-14">
            {[2, 4, 6].map((n) => (
              <button 
                key={n} 
                onClick={() => setPlayerCount(n)} 
                className={`
                  w-24 h-24 md:w-32 md:h-32 rounded-[30px] text-4xl md:text-5xl font-black transition-all duration-300
                  flex items-center justify-center shadow-lg transform
                  ${playerCount === n 
                    ? 'bg-[#D9C5B2] text-[#2D5A8E] scale-110 border-4 border-[#2D5A8E]' 
                    : 'bg-[#EBDCCB] text-[#8B7E74] hover:bg-[#D9C5B2] hover:scale-105'}
                `}
              >
                {n}
              </button>
            ))}
          </div>

          {/* Tombol Mulai Bermain */}
          <button 
            onClick={onStart}
            className="group relative flex items-center gap-3 bg-gradient-to-b from-[#FFB347] via-[#FF8C00] to-[#E65C00] text-white px-12 py-4 rounded-full font-black text-2xl md:text-3xl shadow-[0_8px_0_rgb(139,69,19)] hover:translate-y-[-2px] hover:shadow-[0_10px_0_rgb(139,69,19)] active:translate-y-[6px] active:shadow-none transition-all uppercase tracking-wider"
          >
            {/* Icon Play kecil seperti di gambar */}
            <span className="text-2xl">▶</span>
            Mulai Bermain
          </button>

        </div>
      </div>
    </div>
  );
}