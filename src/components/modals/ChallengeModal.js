"use client";
export default function ChallengeModal({ isOpen, type, content, onClose }) {
  if (!isOpen) return null;
  const themes = {
    truth: { title: "PENGUNGKAPAN DIRI", icon: "⭐", color: "bg-[#FEDB18]-600" },
    dare: { title: "LATIHAN KEBERANIAN", icon: "🔥", color: "bg-[#D77AFC]-500" },
    reflection: { title: "PESAN POSITIF", icon: "🌱", color: "bg-[#B0E561]-500" }
  };
  const theme = themes[type] || themes.truth;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[30px] overflow-hidden shadow-2xl max-w-sm w-full">
        <div className={`${theme.color} p-6 text-center text-white font-black`}>
          <div className="text-4xl mb-2">{theme.icon}</div>
          <h2 className="tracking-widest">{theme.title}</h2>
        </div>
        <div className="p-8 text-center">
          <p className="text-xl font-bold text-slate-700 mb-8 italic">"{content}"</p>
          <button onClick={onClose} className={`${theme.color} w-full text-white py-4 rounded-2xl font-bold shadow-lg`}>SAYA SUDAH LAKUKAN!</button>
        </div>
      </div>
    </div>
  );
}