import React from 'react';

export default function AgreementView({ agreed, setAgreed, onNext }) {
  return (
    <div 
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/Bg-Kesepakatan.png')" }} 
    >
      {/* Container Utama */}
      <div className="relative w-full max-w-4xl px-6 flex flex-col items-center">
        
        {/* Bintang di Atas */}
        <div className="relative z-30 mb-[-45px] w-48 md:w-64 drop-shadow-lg">
          <img src="/3-Bintang.png" alt="Stars" className="w-full h-auto" />
        </div>

        {/* Card Putih */}
        <div className="relative z-10 w-full bg-[#FAF3E9]/95 backdrop-blur-sm border-[8px] border-[#F2DECF]/50 rounded-[50px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-8 md:p-12 flex flex-col items-center">
          
          <h2 className="text-4xl md:text-5xl font-black text-[#2D5A8E] mb-4 text-center">
            Kesepakatan Bermain
          </h2>

          <p className="text-[#4A4A4A] text-lg md:text-xl text-center mb-8 max-w-2xl font-medium leading-relaxed">
            Sebelum bermain Tangga Berani, yuk kita sepakati dulu hal berikut:
          </p>

          {/* List Poin Kesepakatan */}
          <div className="w-full max-w-2xl space-y-4 mb-10">
            {[
              "Saya bermain dengan jujur sesuai perasaan saya.",
              "Tidak ada jawaban benar atau salah dalam game ini.",
              "Saya boleh melewati pertanyaan jika belum siap menjawab.",
              "Ini untuk belajar tentang diri sendiri."
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-4 group">
                <div className="bg-[#8CC63F] rounded-full p-1 shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[#3A3A3A] text-lg md:text-xl font-bold leading-snug">
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Checkbox "Saya Siap" */}
          <label className="flex items-center gap-4 mb-10 cursor-pointer group hover:scale-105 transition-transform">
            <div className="relative flex items-center">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={e => setAgreed(e.target.checked)} 
                className="peer appearance-none w-8 h-8 border-4 border-[#2D5A8E] rounded-lg bg-white checked:bg-[#2D5A8E] transition-all cursor-pointer"
              />
              <svg className="absolute w-6 h-6 text-white pointer-events-none hidden peer-checked:block left-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-[#2D5A8E] font-black text-xl md:text-2xl tracking-wide">
              Saya siap bermain
            </span>
          </label>

          {/* Tombol Masuk */}
          <button 
            disabled={!agreed} 
            onClick={onNext} 
            className={`
              relative group overflow-hidden px-16 py-4 rounded-full font-black text-2xl tracking-widest uppercase transition-all duration-300
              ${agreed 
                ? 'bg-gradient-to-b from-[#FFB347] via-[#FF8C00] to-[#E65C00] text-white shadow-[0_8px_0_rgb(139,69,19)] hover:translate-y-[-2px] hover:shadow-[0_10px_0_rgb(139,69,19)] active:translate-y-[6px] active:shadow-none' 
                : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-70'}
            `}
          >
            Masuk ke Game
          </button>

        </div>
      </div>
    </div>
  );
}