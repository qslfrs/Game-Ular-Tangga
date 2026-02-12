export default function AboutView({ onBack }) {
  return (
    <div 
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/Bg-About.png')" }}
    >
      {/* Container Utama */}
      <div className="relative w-full max-w-5xl px-6 flex flex-col items-center">
        
        {/* Bintang di Atas */}
        <div className="relative z-30 mb-[-45px] w-48 md:w-64 drop-shadow-lg">
          <img src="/3-Bintang.png" alt="Stars" className="w-full h-auto" />
        </div>

        {/* CARD UTAMA */}
        <div className="relative z-10 w-full bg-[#FAF3E9] border-[10px] border-[#F2DECF] rounded-[50px] shadow-2xl overflow-hidden">
          
          <div className="relative z-20 p-8 md:p-12">
            
            {/* Judul Center */}
            <h2 className="text-4xl md:text-5xl font-black text-[#2D5A8E] mb-8 text-center tracking-tight">
              Tentang Game Ini
            </h2>

            {/* AREA KONTEN DENGAN FLOAT */}
            <div className="block w-full text-[#3A3A3A]">
              
              {/* GAMBAR DISISI KANAN (MENGGUNAKAN FLOAT) */}
              <div className="float-right ml-4 mb-2 w-[220px] md:w-[350px] transform translate-y-10">
                <img 
                  src="/Gambar-About.png" 
                  alt="Illustration" 
                  className="w-full h-auto drop-shadow-xl" 
                />
              </div>

              {/* TEKS YANG AKAN MENGALIR DI SEKITAR GAMBAR */}
              <div className="text-left">
                <p className="text-lg md:text-xl leading-relaxed mb-6">
                  <strong className="text-[#2D5A8E]">Tangga Berani</strong> adalah game reflektif berbasis permainan ular tangga yang dirancang untuk membantu siswa <strong className="text-[#2D5A8E]">mengenal diri</strong>, melatih keberanian, dan menumbuhkan kepercayaan diri secara bertahap.
                </p>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <span className="text-[#6BA3BE] font-bold mt-1">✔</span>
                    <div className="flex-1">
                      <p className="text-lg md:text-xl">
                        <strong className="text-[#2D5A8E]">Dalam game ini</strong>, kamu akan melalui beberapa tantangan ringan berupa pertanyaan dan pilihan reflektif.
                      </p>
                      <p className="text-sm md:text-base italic opacity-70">Tidak ada jawaban benar atau salah.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-[#6BA3BE] font-bold mt-1">✔</span>
                    <p className="text-lg md:text-xl flex-1">
                      <strong className="text-[#2D5A8E]">Game ini</strong> dibuat sebagai media layanan bimbingan dan konseling yang aman, menyenangkan, dan tidak menghakimi.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-[#6BA3BE] font-bold mt-1">✔</span>
                    <p className="text-lg md:text-xl flex-1">
                      Di akhir permainan, kamu akan membuat <strong className="text-[#2D5A8E]">Janji Kecil untuk Dirimu</strong> sebagai komitmen sederhana yang bisa kamu jalani setelah bermain. Proses ini membantu guru BK melihat.
                    </p>
                  </div>
                </div>

                {/* Quote Penutup */}
                <div className="mt-8 flex items-center gap-2 text-[#2D5A8E] font-bold italic">
                  <span>✨</span>
                  <p className="text-lg md:text-xl">
                    Ingat, <span className="underline decoration-[#6BA3BE]">keberanian tidak harus besar.</span> Kadang, satu langkah kecil sudah cukup.
                  </p>
                </div>
              </div>
            </div>

            {/* Tombol Kembali di Bawah */}
            <div className="mt-12 flex justify-center">
              <button 
                onClick={onBack}
                className="bg-[#FF8C00] hover:bg-[#E65C00] text-white px-14 py-3 rounded-full font-black text-xl shadow-[0_6px_0_rgb(139,69,19)] active:shadow-none active:translate-y-[6px] transition-all uppercase"
              >
                KEMBALI
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}