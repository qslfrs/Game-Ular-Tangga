"use client";
export default function WinModal({ isOpen, winnerId, onContinue }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white rounded-[40px] p-10 text-center shadow-2xl max-w-sm w-full">
        <div className="text-7xl mb-4">🏆</div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">YEAY!</h1>
        <p className="text-xl font-bold text-indigo-600 mb-8">PEMAIN {winnerId} MENANG!</p>
        <button onClick={onContinue} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg">LANJUTKAN</button>
      </div>
    </div>
  );
}