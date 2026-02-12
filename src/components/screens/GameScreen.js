import Board from "@/components/game/Board";

export default function GameScreen({ config, playerPositions, turn, diceValue, handleRoll, isRolling, isMoving, modalOpen }) {
  const getPlayerColor = (id) => ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"][id - 1];

  return (
    <div 
      className="fixed inset-0 w-full h-full flex flex-col lg:flex-row gap-6 items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/Bg-Board.png')" }} 
    >
      {/* Container Papan */}
      <div className="relative order-2 lg:order-1">
        <Board config={config} playerPositions={playerPositions} />
      </div>

      {/* Panel Kontrol Dadu */}
      <div className="relative z-10 bg-[#FDF8F2]/95 backdrop-blur-sm p-6 rounded-[40px] border-[6px] border-white shadow-xl w-full max-w-[260px] text-center order-1 lg:order-2">
        <h3 className="text-[#2D5A8E] font-black mb-3 uppercase tracking-widest text-xs">Giliran</h3>
        
        <div
          className="w-full py-3 rounded-2xl text-white font-black text-lg mb-5 shadow-sm"
          style={{ backgroundColor: getPlayerColor(turn) }}
        >
          PEMAIN {turn}
        </div>

        {/* Angka Dadu */}
        <div className="bg-white w-20 h-20 mx-auto rounded-3xl shadow-inner flex items-center justify-center mb-6 border-4 border-[#EADCCB]">
          <span className={`text-5xl font-black text-[#2D5A8E] ${isRolling ? 'animate-bounce' : ''}`}>
            {diceValue || "?"}
          </span>
        </div>

        <button
          onClick={handleRoll}
          disabled={isRolling || isMoving || modalOpen}
          className="w-full bg-gradient-to-b from-[#FFB347] via-[#FF8C00] to-[#E65C00] text-white py-4 rounded-2xl font-black text-lg shadow-[0_5px_0_rgb(139,69,19)] active:translate-y-[5px] active:shadow-none transition-all disabled:opacity-50 disabled:grayscale uppercase"
        >
          {isRolling ? "MEMUTAR..." : "KOCOK DADU"}
        </button>
      </div>
    </div>
  );
}