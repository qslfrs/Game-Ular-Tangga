export default function AgreementView({ agreed, setAgreed, onNext }) {
  return (
    <div className="bg-white p-10 rounded-[40px] shadow-xl max-w-sm">
      <h2 className="text-2xl font-bold mb-6">Kesepakatan</h2>
      <div className="space-y-3 mb-8 text-sm">
         <p>✅ Bermain dengan jujur.</p>
         <p>✅ Tidak ada jawaban salah.</p>
         <p>✅ Boleh melewati pertanyaan.</p>
      </div>
      <label className="flex items-center gap-3 mb-8 p-4 bg-blue-50 rounded-2xl cursor-pointer">
        <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="w-5 h-5" />
        <span className="font-bold text-blue-700">Saya siap bermain</span>
      </label>
      <button disabled={!agreed} onClick={onNext} className={`w-full py-5 rounded-3xl font-bold ${agreed ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>Masuk ke Game</button>
    </div>
  );
}