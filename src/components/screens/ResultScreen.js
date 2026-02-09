export default function ResultScreen({ onNext }) {
  return (
    <div className="bg-white p-10 rounded-[40px] shadow-xl text-center max-w-sm">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Refleksi Diri</h2>
      <div className="w-40 h-40 bg-slate-100 mx-auto mb-6 flex items-center justify-center border-2 border-dashed border-slate-300">
        QR CODE 1
      </div>
      <button onClick={onNext} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">
        Lanjut
      </button>
    </div>
  );
}