import React from 'react';

export default function PostGameView({ onNext }) {
  return (
    <div 
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/Bg-PostGame.png')" }} 
    >
      {/* Container Utama */}
      <div className="relative w-full max-w-4xl px-6 flex flex-col items-center">
        
        {/* Bintang di Atas */}
        <div className="relative z-30 mb-[-45px] w-48 md:w-64 drop-shadow-lg">
          <img src="/3-Bintang.png" alt="Stars" className="w-full h-auto" />
        </div>

        {/* CARD UTAMA (Kertas Janji Kecil) */}
        <div className="relative z-10 w-full bg-[#FAF3E9]/95 backdrop-blur-sm border-[10px] border-[#F2DECF]/40 rounded-[60px] shadow-[0_25px_60px_rgba(0,0,0,0.5)] p-10 md:p-14 flex flex-col items-center">
          
          <h2 className="text-3xl md:text-5xl font-black text-[#2D5A8E] mb-10 text-center tracking-tight">
            Janji Kecil Untuk Diriku
          </h2>

          {/* QR CODE AREA */}
          <div className="bg-white p-6 rounded-3xl shadow-inner mb-10 border-2 border-[#EADCCB]">
            <img 
              src="/QR-Code.png" 
              alt="QR Code Refleksi" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
            />
          </div>

          {/* TOMBOL LANJUT */}
          <button 
            onClick={onNext}
            className="group relative bg-[#8CC63F] hover:bg-[#7AB52E] text-white px-20 py-4 rounded-full font-black text-2xl shadow-[0_6px_0_rgb(58,102,23)] active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center min-w-[240px]"
          >
            Lanjut
          </button>

        </div>
      </div>
    </div>
  );
}