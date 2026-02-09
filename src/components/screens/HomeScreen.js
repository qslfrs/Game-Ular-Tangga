export default function HomeScreen({ onStart, onAbout }) {
  return (
    <div className="bg-white p-12 rounded-[40px] shadow-xl text-center max-w-sm w-full border-b-8 border-blue-500">
      <h1 className="text-4xl font-black text-blue-600 mb-2">TANGGA BERANI</h1>
      <p className="text-slate-400 mb-10 font-medium">Game Digital Melatih Kepercayaan Diri</p>
      <button onClick={onStart} className="w-full bg-blue-600 text-white py-5 rounded-3xl font-bold mb-4">Mulai Bermain</button>
      <button onClick={onAbout} className="w-full bg-slate-100 text-slate-600 py-5 rounded-3xl font-bold">Tentang Game</button>
    </div>
  );
}