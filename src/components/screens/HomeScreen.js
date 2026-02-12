export default function HomeScreen({ onStart, onAbout }) {
  return (
    <div 
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-between py-10 px-4 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/Bg-Home.png')" }}
    >
      {/* Overlay Gelap Tipis agar teks lebih terbaca (Opsional) */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Bagian Atas: Judul & Sub-judul */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] tracking-wide">
          TANGGA BERANI
        </h1>
        <div className="mt-2 inline-block bg-blue-500/80 backdrop-blur-sm px-6 py-2 rounded-full border-2 border-white/50">
          <p className="text-white font-bold text-sm md:text-lg">
            Game Digital Melatih Kepercayaan Diri Siswa
          </p>
        </div>
      </div>

      {/* Bagian Tengah: Gambar Hero (Board Game) */}
      <div className="relative z-10 w-full max-w-2xl transform hover:scale-105 transition-transform duration-500">
        <img 
          src="/Gambar-Home.png" // Ganti dengan path gambar board tengahmu
          alt="Tangga Berani Illustration"
          className="w-full h-auto drop-shadow-2xl"
        />
      </div>

      {/* Bagian Bawah: Tombol-tombol */}
      <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-xs">
        <button 
          onClick={onStart}
          className="group relative w-full bg-gradient-to-b from-orange-400 to-orange-600 text-white py-4 rounded-2xl font-black text-xl shadow-[0_6px_0_rgb(194,65,12)] active:shadow-none active:translate-y-[6px] transition-all flex items-center justify-center gap-2"
        >
          <span className="text-2xl">▶</span> MULAI BERMAIN
        </button>

        <button 
          onClick={onAbout}
          className="w-full bg-white/90 hover:bg-white text-slate-700 py-3 rounded-2xl font-bold text-sm shadow-lg transition-all"
        >
          Tentang Game
        </button>
      </div>
    </div>
  );
}