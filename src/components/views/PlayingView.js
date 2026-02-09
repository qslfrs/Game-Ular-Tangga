import GameBoard from "../GameBoard";

export default function PlayingView({ config, playerPositions, turn, diceValue, handleRoll, isRolling, modalOpen }) {
  const getPlayerColor = (id) => ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"][id - 1];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center">
      <GameBoard config={config} playerPositions={playerPositions} />
      <div className="bg-white p-8 rounded-[40px] shadow-xl w-64 text-center">
        <div 
          className="w-full py-3 rounded-xl text-white font-bold mb-4" 
          style={{ backgroundColor: getPlayerColor(turn) }}
        >
          PLAYER {turn}
        </div>
        <div className="text-5xl font-black mb-6">{diceValue || "?"}</div>
        <button 
          onClick={handleRoll} 
          disabled={isRolling || modalOpen} 
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold"
        >
          {isRolling ? "ROLLING..." : "ROLL"}
        </button>
      </div>
    </div>
  );
}