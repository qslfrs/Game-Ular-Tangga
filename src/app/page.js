"use client";
import { useGameEngine } from "@/hooks/useGameEngine";
import { GAME_STATES } from "@/utils/constants";

// Import Views
import HomeScreen from "@/components/screens/HomeScreen";
import AboutScreen from "@/components/screens/AboutScreen";
import AgreementScreen from "@/components/screens/AgreementScreen";
import SetupScreen from "@/components/screens/SetupScreen";
import GameScreen from "@/components/screens/GameScreen";
import ResultScreen from "@/components/screens/ResultScreen";
import ThanksScreen from "@/components/screens/ThanksScreen";

// Import Modals
import ChallengeModal from "@/components/modals/ChallengeModal";
import VictoryModal from "@/components/modals/VictoryModal";

export default function Home() {
  const {
    gameState, setGameState,
    playerCount, setPlayerCount,
    agreed, setAgreed,
    config, playerPositions,
    turn, diceValue,
    isRolling, isMoving,
    modal, setModal,
    winner, setWinner,
    startGame, handleRoll, handleModalClose, resetGame
  } = useGameEngine();

  const handleWinContinue = () => {
    setWinner(null);
    setGameState(GAME_STATES.POSTGAME);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">

      {gameState === GAME_STATES.HOME && (
        <HomeScreen
          onStart={() => setGameState(GAME_STATES.AGREEMENT)}
          onAbout={() => setGameState(GAME_STATES.ABOUT)}
        />
      )}

      {gameState === GAME_STATES.ABOUT && (
        <AboutScreen onBack={() => setGameState(GAME_STATES.HOME)} />
      )}

      {gameState === GAME_STATES.AGREEMENT && (
        <AgreementScreen
          agreed={agreed}
          setAgreed={setAgreed}
          onNext={() => setGameState(GAME_STATES.SETUP)}
        />
      )}

      {gameState === GAME_STATES.SETUP && (
        <SetupScreen
          playerCount={playerCount}
          setPlayerCount={setPlayerCount}
          onStart={startGame}
        />
      )}

      {gameState === GAME_STATES.PLAYING && config && (
        <GameScreen
          config={config}
          playerPositions={playerPositions}
          turn={turn}
          diceValue={diceValue}
          handleRoll={handleRoll}
          isRolling={isRolling}
          isMoving={isMoving}
          modalOpen={modal.isOpen}
        />
      )}

      {gameState === GAME_STATES.POSTGAME && (
        <ResultScreen onNext={() => setGameState(GAME_STATES.THANKS)} />
      )}

      {gameState === GAME_STATES.THANKS && (
        <ThanksScreen onPlayAgain={resetGame} />
      )}

      {/* Modals */}
      <ChallengeModal
        {...modal}
        onClose={handleModalClose}
      />

      <VictoryModal
        isOpen={!!winner}
        winnerId={winner}
        onContinue={handleWinContinue}
      />

    </main>
  );
}