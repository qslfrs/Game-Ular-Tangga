"use client";
export default function ChallengeModal({ isOpen, type, content, onClose }) {
  if (!isOpen) return null;

  // Menggunakan aset gambar bintang agar sesuai dengan tema visual game
  const themes = {
    truth: { 
      title: "PENGUNGKAPAN DIRI", 
      icon: "/yellow-star.png", 
      color: "bg-[#FEDB18]", 
      textColor: "text-[#B8860B]" // Warna teks gelap agar kontras dengan kuning
    },
    dare: { 
      title: "LATIHAN KEBERANIAN", 
      icon: "/purple-star.png", 
      color: "bg-[#D77AFC]", 
      textColor: "text-white" 
    },
    reflection: { 
      title: "PESAN POSITIF", 
      icon: "/green-star.png", 
      color: "bg-[#B0E561]", 
      textColor: "text-[#2D5A8E]" // Biru tua khas game kamu
    }
  };

  const theme = themes[type] || themes.truth;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#FFF9F0] rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-sm w-full border-4 border-white/50 transform animate-in zoom-in duration-300">
        
        {/* Bagian Header Dinamis */}
        <div className={`${theme.color} p-8 text-center flex flex-col items-center`}>
          <img 
            src={theme.icon} 
            alt="Star Icon" 
            className="w-20 h-20 mb-3 drop-shadow-md animate-pulse" 
          />
          <h2 className={`font-black tracking-widest text-lg drop-shadow-sm ${theme.textColor}`}>
            {theme.title}
          </h2>
        </div>

        {/* Bagian Konten */}
        <div className="p-10 text-center">
          <p className="text-xl font-bold text-[#3A3A3A] mb-10 italic leading-relaxed">
            "{content}"
          </p>
          
          <button 
            onClick={onClose} 
            className={`${theme.color} ${theme.textColor} w-full py-4 rounded-2xl font-black text-lg shadow-[0_6px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[6px] transition-all uppercase tracking-wider`}
          >
            SAYA SUDAH LAKUKAN!
          </button>
        </div>
      </div>
    </div>
  );
}