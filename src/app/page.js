"use client";
import { useState } from "react";
import { generateBoardConfig } from "@/utils/gameLogic";
import { truthList, dareList, reflectionList } from "@/utils/content";

// Import Semua View
import HomeView from "@/components/views/HomeView";
import AboutView from "@/components/views/AboutView";
import AgreementView from "@/components/views/AgreementView";
import SetupView from "@/components/views/SetupView";
import PlayingView from "@/components/views/PlayingView";
import PostGameView from "@/components/views/PostGameView";
import ThanksView from "@/components/views/ThanksView";

// Import Modals
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

  // --- LOGIKA GAME ---
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
    <main className="min-h-screen bg-slate-50 flex items-center justify-center font-sans text-slate-800">
      
      {gameState === "HOME" && <HomeView onStart={() => setGameState("AGREEMENT")} onAbout={() => setGameState("ABOUT")} />}
      {gameState === "ABOUT" && <AboutView onBack={() => setGameState("HOME")} />}
      {gameState === "AGREEMENT" && <AgreementView agreed={agreed} setAgreed={setAgreed} onNext={() => setGameState("SETUP")} />}
      {gameState === "SETUP" && <SetupView playerCount={playerCount} setPlayerCount={setPlayerCount} onStart={startGame} />}
      
      {gameState === "PLAYING" && config && (
        <PlayingView 
          config={config} 
          playerPositions={playerPositions} 
          turn={turn} 
          diceValue={diceValue} 
          handleRoll={handleRoll} 
          isRolling={isRolling} 
          modalOpen={modal.isOpen} 
        />
      )}

      {gameState === "POSTGAME" && <PostGameView onNext={() => setGameState("THANKS")} />}
      
      {gameState === "THANKS" && (
        <ThanksView onPlayAgain={() => {
          setGameState("HOME"); 
          setAgreed(false); 
          setWinner(null);
        }} />
      )}

      <ActionModal {...modal} onClose={() => {setModal({...modal, isOpen: false}); setTurn(t => t >= playerCount ? 1 : t + 1);}} />
      <WinModal isOpen={!!winner} winnerId={winner} onContinue={() => {setWinner(null); setGameState("POSTGAME");}} />

    </main>
  );
}