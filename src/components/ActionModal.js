"use client";

export default function ActionModal({ isOpen, type, content, onClose }) {
  if (!isOpen) return null;

  const isTruth = type === "truth";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <div className={`w-full max-w-md p-10 rounded-[40px] shadow-2xl text-center border-t-8 ${
        isTruth ? "bg-blue-50 border-blue-500" : "bg-red-50 border-red-500"
      }`}>
        <div className={`inline-block px-6 py-2 rounded-full text-white font-black mb-6 uppercase tracking-widest ${
          isTruth ? "bg-blue-500 shadow-blue-200" : "bg-red-500 shadow-red-200"
        }`}>
          {isTruth ? "TRUTH" : "DARE"}
        </div>
        
        <p className="text-slate-800 text-xl md:text-2xl font-bold leading-relaxed mb-10">
          “{content}”
        </p>

        <button
          onClick={onClose}
          className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}