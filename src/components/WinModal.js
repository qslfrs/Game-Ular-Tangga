"use client";
import React from 'react';

export default function WinModal({ isOpen, winnerId, onReset }) {
  if (!isOpen) return null;

  const playerColor = ["#EF4444", "#3B82F6", "#10B981", "#F59E0B"][winnerId - 1];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-indigo-950/90 backdrop-blur-xl">
      <div className="relative w-full max-w-lg bg-white rounded-[50px] p-12 text-center shadow-[0_0_100px_rgba(255,255,255,0.2)] overflow-hidden">
        
        {/* Efek Cahaya Belakang */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-yellow-400/20 blur-[80px] -z-10 animate-pulse" />
        
        {/* Ikon Piala / Perayaan */}
        <div className="text-8xl mb-6 animate-bounce">🏆</div>
        
        <h2 className="text-slate-400 uppercase tracking-[0.3em] font-black text-sm mb-2">Selamat!</h2>
        <h1 className="text-5xl font-black text-slate-900 mb-6 italic">
          LUAR BIASA!
        </h1>
        
        <div 
          className="inline-block px-10 py-4 rounded-3xl text-white font-black text-2xl shadow-2xl mb-10"
          style={{ backgroundColor: playerColor }}
        >
          PEMAIN {winnerId} MENANG
        </div>

        <p className="text-slate-500 mb-10 font-medium leading-relaxed px-6">
          Kamu telah menunjukkan kepercayaan diri yang hebat dalam menghadapi setiap tantangan!
        </p>

        <button
          onClick={onReset}
          className="w-full bg-slate-900 text-white py-6 rounded-[30px] font-black text-xl hover:scale-[1.03] active:scale-95 transition-all shadow-2xl"
        >
          MAIN LAGI
        </button>
      </div>
    </div>
  );
}