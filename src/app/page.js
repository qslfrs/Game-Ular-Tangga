"use client";
import { useState } from "react";
import { generateBoardConfig } from "@/utils/gameLogic";
import { truthList, dareList, reflectionList } from "@/utils/content";
import GameBoard from "@/components/GameBoard";
import ActionModal from "@/components/ActionModal";
import WinModal from "@/components/WinModal";

export default function Home() {
  const [gameState, setGameState] = useState("HOME");
  const [playerCount, setPlayerCount] = useState(2);
  const [agreed, setAgreed] = useState(false);
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
    for (let i = 1; i <= steps; i++) {
      curr++;
      if (curr >= 70) { curr = 70; break; }
      setPlayerPositions(p => ({ ...p, [id]: curr }));
      await new Promise(r => setTimeout(r, 200));
    }

    let final = curr;
    if (config.ladders[final]) {
      await new Promise(r => setTimeout(r, 400));
      final = config.ladders[final];
    } else if (config.snakes[final]) {
      await new Promise(r => setTimeout(r, 400));
      final = config.snakes[final];
    }
    setPlayerPositions(p => ({ ...p, [id]: final }));

    if (final === 70) {
      setWinner(id);
    } else if (config.truthTiles.includes(final)) {
      setModal({ isOpen: true, type: "truth", content: truthList[Math.floor(Math.random() * truthList.length)] });
    } else if (config.dareTiles.includes(final)) {
      setModal({ isOpen: true, type: "dare", content: dareList[Math.floor(Math.random() * dareList.length)] });
    } else if (config.reflectionTiles.includes(final)) {
      setModal({ isOpen: true, type: "reflection", content: reflectionList[Math.floor(Math.random() * reflectionList.length)] });
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

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
      
      {gameState === "HOME" && (
        <div className="bg-white p-12 rounded-[40px] shadow-xl text-center max-w-sm w-full border-b-8 border-blue-500">
          <h1 className="text-4xl font-black text-blue-600 mb-2">TANGGA BERANI</h1>
          <p className="text-slate-400 mb-10 font-medium">Game Digital Melatih Kepercayaan Diri</p>
          <button onClick={() => setGameState("AGREEMENT")} className="w-full bg-blue-600 text-white py-5 rounded-3xl font-bold mb-4">Mulai Bermain</button>
          <button onClick={() => setGameState("ABOUT")} className="w-full bg-slate-100 text-slate-600 py-5 rounded-3xl font-bold">Tentang Game</button>
        </div>
      )}

      {gameState === "ABOUT" && (
        <div className="bg-white p-10 rounded-[40px] shadow-xl max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Tentang Game Ini</h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-sm">Tangga Berani adalah media BK untuk melatih keberanian dan kepercayaan diri melalui tantangan reflektif.</p>
          <button onClick={() => setGameState("HOME")} className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold">KEMBALI</button>
        </div>
      )}

      {gameState === "AGREEMENT" && (
        <div className="bg-white p-10 rounded-[40px] shadow-xl max-w-sm">
          <h2 className="text-2xl font-bold mb-6">Kesepakatan</h2>
          <div className="space-y-3 mb-8 text-sm">
             <p>✅ Bermain dengan jujur.</p>
             <p>✅ Tidak ada jawaban salah.</p>
             <p>✅ Boleh melewati pertanyaan.</p>
          </div>
          <label className="flex items-center gap-3 mb-8 p-4 bg-blue-50 rounded-2xl cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="w-5 h-5" />
            <span className="font-bold text-blue-700">Saya siap bermain</span>
          </label>
          <button disabled={!agreed} onClick={() => setGameState("SETUP")} className={`w-full py-5 rounded-3xl font-bold ${agreed ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>Masuk ke Game</button>
        </div>
      )}

      {gameState === "SETUP" && (
        <div className="bg-white p-10 rounded-[40px] shadow-xl text-center">
          <h2 className="text-xl font-bold mb-8 text-slate-400 uppercase tracking-widest">Pilih Jumlah Pemain</h2>
          <div className="flex gap-4 mb-10">
            {[2, 4, 6].map(n => (
              <button key={n} onClick={() => setPlayerCount(n)} className={`w-16 h-16 rounded-2xl text-xl font-black transition-all ${playerCount === n ? 'bg-blue-600 text-white scale-110' : 'bg-slate-100 text-slate-400'}`}>{n}</button>
            ))}
          </div>
          <button onClick={startGame} className="w-full bg-green-500 text-white py-5 rounded-3xl font-bold shadow-lg">MULAI SEKARANG</button>
        </div>
      )}

      {gameState === "PLAYING" && config && (
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <GameBoard config={config} playerPositions={playerPositions} />
          <div className="bg-white p-8 rounded-[40px] shadow-xl w-64 text-center">
            <div className="w-full py-3 rounded-xl text-white font-bold mb-4" style={{ backgroundColor: ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"][turn-1] }}>PLAYER {turn}</div>
            <div className="text-5xl font-black mb-6">{diceValue || "?"}</div>
            <button onClick={handleRoll} disabled={isRolling || modal.isOpen} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold">{isRolling ? "..." : "ROLL"}</button>
          </div>
        </div>
      )}

      {gameState === "REFLECTION_QR" && (
        <div className="bg-white p-10 rounded-[40px] shadow-xl text-center max-w-sm">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Refleksi Diri</h2>
          <div className="w-40 h-40 bg-slate-100 mx-auto mb-6 flex items-center justify-center border-2 border-dashed border-slate-300">QR CODE 1</div>
          <button onClick={() => setGameState("THANKS")} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">Lanjut</button>
        </div>
      )}

      {gameState === "THANKS" && (
        <div className="bg-white p-10 rounded-[40px] shadow-xl text-center">
          <h1 className="text-5xl mb-4">🌟</h1>
          <h2 className="text-2xl font-bold mb-8">Terima Kasih!</h2>
          <button onClick={() => {setGameState("HOME"); setAgreed(false); setWinner(null);}} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold">Main Lagi</button>
        </div>
      )}

      <ActionModal {...modal} onClose={() => {setModal({...modal, isOpen: false}); setTurn(t => t >= playerCount ? 1 : t + 1);}} />
      <WinModal isOpen={!!winner} winnerId={winner} onContinue={() => {setWinner(null); setGameState("REFLECTION_QR");}} />

    </main>
  );
}