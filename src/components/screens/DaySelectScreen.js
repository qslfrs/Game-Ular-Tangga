import React from 'react';

const formatRemaining = (ms) => {
  if (ms === null || ms === undefined) return 'Selesaikan hari sebelumnya dulu';
  if (ms <= 0) return 'Sudah terbuka';

  const totalSeconds = Math.ceil(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}j ${minutes}m ${seconds}d`;
};

export default function DaySelectScreen({
  daysMeta,
  onSelectDay,
  onBack,
  allDaysUnlocked,
  onResetProgress
}) {
  return (
    <div
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/Bg-Setup.webp')" }}
    >
      <div className="relative w-full max-w-5xl px-6 flex flex-col items-center">
        <div className="relative z-30 mb-[-45px] w-48 md:w-64 drop-shadow-lg">
          <img src="/3-Bintang.png" alt="Stars" className="w-full h-auto" />
        </div>

        <div className="relative z-10 w-full bg-[#F3E5D8]/95 backdrop-blur-sm border-[10px] border-white/40 rounded-[60px] shadow-[0_25px_60px_rgba(0,0,0,0.5)] p-8 md:p-12">
          <h2 className="text-3xl md:text-5xl font-black text-[#2D5A8E] text-center tracking-tight mb-2">
            Pilih Hari Bermain
          </h2>
          <p className="text-center text-[#5A5A5A] font-bold mb-8">
            Hari berikutnya terbuka 18 jam setelah hari sebelumnya selesai.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10">
            {daysMeta.map((day) => (
              <button
                key={day.day}
                disabled={!day.unlocked}
                onClick={() => onSelectDay(day.day)}
                className={`rounded-3xl p-5 min-h-[130px] text-left transition-all border-4 ${
                  day.unlocked
                    ? 'bg-white/80 border-[#2D5A8E] hover:scale-[1.02]'
                    : 'bg-slate-200/90 border-slate-300 cursor-not-allowed opacity-90'
                }`}
              >
                <p className="font-black text-2xl text-[#2D5A8E]">D-{day.day}</p>
                <p className={`mt-2 text-sm font-bold ${day.unlocked ? 'text-green-700' : 'text-slate-600'}`}>
                  {day.unlocked ? 'Terbuka' : 'Terkunci'}
                </p>
                {day.completed && (
                  <p className="text-xs mt-1 font-bold text-[#8CC63F]">Selesai ✅</p>
                )}
                {!day.unlocked && (
                  <p className="text-xs mt-2 text-slate-600 font-semibold leading-snug">
                    {formatRemaining(day.remainingMs)}
                  </p>
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={onBack}
              className="bg-gradient-to-b from-[#FFB347] via-[#FF8C00] to-[#E65C00] text-white px-10 py-3 rounded-full font-black text-lg shadow-[0_6px_0_rgb(139,69,19)] active:translate-y-[6px] active:shadow-none transition-all uppercase"
            >
              Kembali
            </button>

            {allDaysUnlocked && (
              <button
                onClick={onResetProgress}
                className="bg-gradient-to-b from-[#F87171] via-[#EF4444] to-[#DC2626] text-white px-10 py-3 rounded-full font-black text-lg shadow-[0_6px_0_rgb(127,29,29)] active:translate-y-[6px] active:shadow-none transition-all uppercase"
              >
                Reset Semua Progress
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
