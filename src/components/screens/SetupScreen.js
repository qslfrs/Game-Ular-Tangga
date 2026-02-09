import { PLAYER_COUNTS_ALLOWED } from "@/utils/constants";

export default function SetupScreen({ playerCount, setPlayerCount, onStart }) {
  return (
    <div className="bg-white p-10 rounded-[40px] shadow-xl text-center">
      <h2 className="text-xl font-bold mb-8 text-slate-400 uppercase tracking-widest">Pilih Jumlah Pemain</h2>
      <div className="flex gap-4 mb-10 justify-center">
        {PLAYER_COUNTS_ALLOWED.map(n => (
          <button
            key={n}
            onClick={() => setPlayerCount(n)}
            className={`w-16 h-16 rounded-2xl text-xl font-black transition-all ${playerCount === n ? 'bg-blue-600 text-white scale-110' : 'bg-slate-100 text-slate-400'}`}
          >
            {n}
          </button>
        ))}
      </div>
      <button onClick={onStart} className="w-full bg-green-500 text-white py-5 rounded-3xl font-bold shadow-lg uppercase tracking-widest">MULAI SEKARANG</button>
    </div>
  );
}