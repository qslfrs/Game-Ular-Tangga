import React from 'react';

export default function ThanksView({ onPlayAgain }) {
  return (
    <div 
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/Bg-Thanks.png')" }} // Menggunakan background desa pixel art
    >
      {/* Container Utama */}
      <div className="relative w-full max-w-4xl px-6 flex flex-col items-center">
        
        {/* Bintang di Atas */}
        <div className="relative z-30 mb-[-45px] w-48 md:w-64 drop-shadow-lg">
          <img src="/3-Bintang.png" alt="Stars" className="w-full h-auto" />
        </div>

        {/* CARD UTAMA */}
        <div className="relative z-10 w-full bg-[#FAF3E9]/95 backdrop-blur-sm border-[10px] border-[#F2DECF]/40 rounded-[60px] shadow-[0_25px_60px_rgba(0,0,0,0.5)] p-10 md:p-14 flex flex-col items-center">
          
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-[#2D5A8E]">
              Terima kasih sudah berani bermain.
            </h2>
            <p className="text-[#5A5A5A] text-lg md:text-xl font-medium italic">
              Ingat, percaya diri itu dilatih, bukan ditunggu.
            </p>
          </div>

          {/* List Poin Informasi (Sesuai Gambar 1) */}
          <div className="w-full max-w-2xl space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="bg-[#6BA3BE] rounded-full p-1 mt-1 shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-[#4A4A4A] text-lg md:text-xl leading-relaxed">
                <strong className="text-[#2D5A8E]">Dalam game ini</strong>, kamu akan melalui beberapa tantangan ringan berupa pertanyaan dan pilihan reflektif.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#6BA3BE] rounded-full p-1 mt-1 shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-[#4A4A4A] text-lg md:text-xl leading-relaxed">
                <strong className="text-[#2D5A8E]">Game ini</strong> dibuat sebagai media layanan bimbingan dan konseling yang aman, menyenangkan, dan tidak menghakimi.
              </p>
            </div>
          </div>

          {/* TOMBOL MAIN LAGI (Tanpa tombol Keluar) */}
          <button 
            onClick={onPlayAgain}
            className="group relative flex items-center justify-center gap-3 bg-gradient-to-b from-[#A4D44D] via-[#8CC63F] to-[#7AB52E] text-white px-16 py-4 rounded-full font-black text-2xl shadow-[0_8px_0_rgb(58,102,23)] hover:translate-y-[-2px] hover:shadow-[0_10px_0_rgb(58,102,23)] active:translate-y-[6px] active:shadow-none transition-all uppercase tracking-widest"
          >
            <span className="text-2xl">🔄</span>
            Main Lagi
          </button>

        </div>
      </div>
    </div>
  );
}