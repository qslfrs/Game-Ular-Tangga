"use client";
import React from 'react';

export default function VictoryModal({ isOpen, winnerId, onContinue }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Dekorasi Bintang Melayang di Luar Modal */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 animate-bounce text-4xl">✨</div>
        <div className="absolute top-1/3 right-1/4 animate-bounce delay-75 text-4xl">✨</div>
        <div className="absolute bottom-1/4 left-1/3 animate-bounce delay-150 text-4xl">✨</div>
      </div>

      {/* CARD UTAMA (Tema Kertas Perkamen) */}
      <div className="relative bg-[#FFF9F0] border-[10px] border-[#FEDB18] rounded-[50px] p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-sm w-full transform animate-in zoom-in duration-300">

        {/* Ikon Piala Emas Besar */}
        <div className="relative mt-4 mb-6 flex justify-center">
          <div className="absolute inset-0 bg-[#FEDB18]/20 blur-3xl rounded-full scale-150" />
          <span className="text-8xl drop-shadow-2xl relative z-10">🏆</span>
        </div>

        {/* Teks Kemenangan */}
        <h1 className="text-5xl font-black text-[#2D5A8E] mb-2 tracking-tight drop-shadow-sm">
          YEAY!
        </h1>
        
        <div className="bg-[#FEDB18]/10 rounded-2xl py-3 px-4 mb-8 border border-[#FEDB18]/20">
          <p className="text-2xl font-black text-[#2D5A8E] uppercase">
            PEMAIN <span className="text-[#FF8C00]">{winnerId}</span> MENANG!
          </p>
        </div>

        {/* Tombol Lanjutkan (Gaya 3D Oranye) */}
        <button 
          onClick={onContinue} 
          className="w-full bg-gradient-to-b from-[#FFB347] via-[#FF8C00] to-[#E65C00] text-white py-4 rounded-3xl font-black text-2xl shadow-[0_8px_0_rgb(139,69,19)] hover:translate-y-[-2px] hover:shadow-[0_10px_0_rgb(139,69,19)] active:translate-y-[6px] active:shadow-none transition-all uppercase tracking-widest"
        >
          LANJUTKAN
        </button>

        {/* Partikel kecil dekorasi di bawah */}
        <p className="mt-6 text-[#2D5A8E]/60 font-bold italic text-sm">
          "Langkah kecil yang hebat!"
        </p>
      </div>
    </div>
  );
}