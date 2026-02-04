"use client";
import { useState } from "react";
import { generateBoardConfig } from "@/utils/gameLogic";
import GameBoard from "@/components/GameBoard";
import ActionModal from "@/components/ActionModal";
import WinModal from "@/components/WinModal"; 
import { truthList, dareList } from '@/utils/content';

export default function Home() {
  const [gameState, setGameState] = useState("HOME");
  const [playerCount, setPlayerCount] = useState(2);
  const [config, setConfig] = useState(null);
  const [playerPositions, setPlayerPositions] = useState({});
  const [turn, setTurn] = useState(1);
  const [diceValue, setDiceValue] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: "", content: "" });
  const [winner, setWinner] = useState(null);

  const startGame = () => {
    const newConfig = generateBoardConfig();
    setConfig(newConfig);
    const pos = {};
    for (let i = 1; i <= playerCount; i++) pos[i] = 1;
    setPlayerPositions(pos);
    setGameState("PLAYING");
  };

  const movePlayer = async (id, steps) => {

    let curr = playerPositions[id];
    
    // Jalankan animasi gerak satu per satu
    for (let i = 1; i <= steps; i++) {
      curr++;
      if (curr >= 100) { curr = 100; break; }
      setPlayerPositions(p => ({ ...p, [id]: curr }));
      await new Promise(r => setTimeout(r, 200));
    }

    let final = curr;
    
    // Cek Ular atau Tangga
    if (config.ladders[final]) {
      await new Promise(r => setTimeout(r, 400));
      final = config.ladders[final];
    } else if (config.snakes[final]) {
      await new Promise(r => setTimeout(r, 400));
      final = config.snakes[final];
    }
    
    setPlayerPositions(p => ({ ...p, [id]: final }));

    // LOGIKA DIAMOND: Ambil soal acak SETIAP KALI mendarat (mengatasi concern-mu)
    if (final === 100) {
      setWinner(id);
    } else if (config.truthTiles.includes(final)) {
      const randomTruth = truthList[Math.floor(Math.random() * truthList.length)];
      setModal({ isOpen: true, type: "truth", content: randomTruth });
    } else if (config.dareTiles.includes(final)) {
      const randomDare = dareList[Math.floor(Math.random() * dareList.length)];
      setModal({ isOpen: true, type: "dare", content: randomDare });
    } else {
      setTurn(t => t >= playerCount ? 1 : t + 1);
    }
  };

  const handleRoll = async () => {
    if (isRolling || modal.isOpen) return;
    setIsRolling(true);
    await new Promise(r => setTimeout(r, 600));
    const val = Math.floor(Math.random() * 6) + 1;
    setDiceValue(val);
    setIsRolling(false);
    movePlayer(turn, val);
  };

  const resetGame = () => {
    if (confirm("Apakah Anda yakin ingin mengulang permainan?")) {
      setGameState("HOME");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      {gameState === "HOME" && (
        <div className="bg-white p-12 rounded-[40px] shadow-2xl text-center max-w-sm w-full">
           <h1 className="text-4xl font-black text-indigo-600 mb-2">CONFIDENCE</h1>
           <p className="text-slate-400 mb-10 font-medium tracking-widest">SNAKES & LADDERS</p>
           <button onClick={() => setGameState("SETUP")} className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black text-xl shadow-xl hover:bg-indigo-700 transition-all">START</button>
        </div>
      )}
      
      {gameState === "SETUP" && (
        <div className="bg-white p-10 rounded-[40px] shadow-2xl text-center">
          <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest mb-8">Jumlah Pemain</h2>
          <div className="flex gap-4 mb-10">
            {[2, 3, 4].map(n => (
              <button key={n} onClick={() => setPlayerCount(n)} 
                className={`w-16 h-16 rounded-2xl text-xl font-black transition-all ${playerCount === n ? 'bg-indigo-600 text-white scale-110 shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                {n}
              </button>
            ))}
          </div>
          <button onClick={startGame} className="w-full bg-green-500 text-white py-5 rounded-3xl font-black text-lg shadow-lg">START GAME</button>
        </div>
      )}

      {gameState === "PLAYING" && config && (
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start max-w-6xl">
          <div className="bg-white p-2 rounded-2xl shadow-2xl">
             <GameBoard config={config} playerPositions={playerPositions} />
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-2xl w-full lg:w-80 text-center flex flex-col items-center">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Giliran</span>
             <div className="w-full py-4 rounded-2xl text-white font-black text-xl mb-6 shadow-md" 
                  style={{ backgroundColor: ["#EF4444", "#3B82F6", "#10B981", "#F59E0B"][turn-1] }}>
               PLAYER {turn}
             </div>

             <div className="w-24 h-24 bg-slate-50 border-4 border-slate-100 rounded-[30px] flex items-center justify-center mb-8">
                <span className="text-5xl font-black text-slate-800">{diceValue || "?"}</span>
             </div>

             <button onClick={handleRoll} disabled={isRolling || modal.isOpen} 
               className={`w-full py-5 rounded-3xl font-black text-xl shadow-lg transition-all mb-4 ${isRolling ? 'bg-slate-200 text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
               {isRolling ? "ROLLING..." : "ROLL DICE"}
             </button>

             <button onClick={resetGame} className="text-slate-300 font-bold hover:text-red-500 transition-colors py-2 px-4 uppercase text-sm tracking-widest mt-4">
                &times; RESET GAME
             </button>
          </div>
        </div>
      )}

      <ActionModal 
        isOpen={modal.isOpen} 
        type={modal.type} 
        content={modal.content} 
        onClose={() => { setModal({ ...modal, isOpen: false }); setTurn(t => t >= playerCount ? 1 : t + 1); }} 
      />
      <WinModal 
        isOpen={!!winner} 
        winnerId={winner} 
        onReset={() => {
          setWinner(null);
          setGameState("HOME");
        }} 
      />
    </main>
  );
}