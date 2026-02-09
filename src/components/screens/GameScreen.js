import Board from "@/components/game/Board";

export default function GameScreen({ config, playerPositions, turn, diceValue, handleRoll, isRolling, isMoving, modalOpen }) {
  const getPlayerColor = (id) => ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"][id - 1];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center">
      <Board config={config} playerPositions={playerPositions} />
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
          disabled={isRolling || isMoving || modalOpen}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRolling ? "ROLLING..." : isMoving ? "MOVING..." : "ROLL"}
        </button>
      </div>
    </div>
  );
}