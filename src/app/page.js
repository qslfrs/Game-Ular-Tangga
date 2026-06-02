"use client";
import { useGameEngine } from "@/hooks/useGameEngine";
import { GAME_STATES } from "@/utils/constants";
import AssetPreloader from "@/components/common/AssetPreloader";

// Import Views
import HomeScreen from "@/components/screens/HomeScreen";
import AboutScreen from "@/components/screens/AboutScreen";
import AgreementScreen from "@/components/screens/AgreementScreen";
import DaySelectScreen from "@/components/screens/DaySelectScreen";
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
    currentDay,
    daysMeta,
    allDaysUnlocked,
    selectDay,
    resetDayProgress,
    goToDaySelect,
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
      <AssetPreloader />

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
          onNext={() => setGameState(GAME_STATES.DAY_SELECT)}
        />
      )}

      {gameState === GAME_STATES.DAY_SELECT && (
        <DaySelectScreen
          daysMeta={daysMeta}
          onSelectDay={selectDay}
          onBack={() => setGameState(GAME_STATES.HOME)}
          allDaysUnlocked={allDaysUnlocked}
          onResetProgress={resetDayProgress}
        />
      )}

      {gameState === GAME_STATES.SETUP && (
        <SetupScreen
          currentDay={currentDay}
          playerCount={playerCount}
          setPlayerCount={setPlayerCount}
          onStart={startGame}
          onBack={goToDaySelect}
        />
      )}

      {gameState === GAME_STATES.PLAYING && config && (
        <GameScreen
          currentDay={currentDay}
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
        <ResultScreen
          currentDay={currentDay}
          onNext={goToDaySelect}
        />
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