export default function AboutScreen({ onBack }) {
  return (
    <div className="bg-white p-10 rounded-[40px] shadow-xl max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Tentang Game Ini</h2>
      <p className="text-slate-600 mb-8 leading-relaxed text-sm">Tangga Berani adalah media BK untuk melatih keberanian dan kepercayaan diri melalui tantangan reflektif.</p>
      <button onClick={onBack} className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold">KEMBALI</button>
    </div>
  );
}