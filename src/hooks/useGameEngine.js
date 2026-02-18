"use client";
import { useState, useCallback } from 'react';
import { generateBoardConfig } from '@/utils/boardGenerator';
import { truthList, dareList, reflectionList } from '@/utils/challengeData';
import {
    BOARD_SIZE,
    DICE_MAX,
    ANIMATION_SPEED_MOVE,
    ANIMATION_SPEED_JUMP,
    ANIMATION_SPEED_ROLL,
    GAME_STATES,
    PLAYER_COUNT_DEFAULT
} from '@/utils/constants';

export const useGameEngine = () => {
    const [gameState, setGameState] = useState(GAME_STATES.HOME);
    const [playerCount, setPlayerCount] = useState(PLAYER_COUNT_DEFAULT);
    const [agreed, setAgreed] = useState(false);
    const [config, setConfig] = useState(null);
    const [playerPositions, setPlayerPositions] = useState({});
    const [turn, setTurn] = useState(1);
    const [diceValue, setDiceValue] = useState(0);
    const [isRolling, setIsRolling] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const [modal, setModal] = useState({ isOpen: false, type: "", content: "" });
    const [winner, setWinner] = useState(null);

    // 1. Inisialisasi Game
    const startGame = useCallback(() => {
        const newConfig = generateBoardConfig();
        setConfig(newConfig);
        const pos = {};
        for (let i = 1; i <= playerCount; i++) pos[i] = 1;
        setPlayerPositions(pos);
        setTurn(1);
        setGameState(GAME_STATES.PLAYING);
    }, [playerCount]);

    // 2. Helper: Ganti Giliran
    const nextTurn = useCallback(() => {
        setTurn(prev => (prev % playerCount) + 1);
    }, [playerCount]);

    // 3. Helper: Cek Tipe Bintang
    const checkSpecialTile = (position) => {
        if (config.truthTiles.includes(position)) return "truth";
        if (config.dareTiles.includes(position)) return "dare";
        if (config.reflectionTiles.includes(position)) return "reflection";
        return null;
    };

    // 4. Logic Utama Gerakan Ular/Tangga
    const handleSnakeOrLadder = async (playerId, position) => {
        const targetLadder = config.ladders[position];
        const targetSnake = config.snakes[position];
        const target = targetLadder || targetSnake;

        if (target) {
            await new Promise(r => setTimeout(r, ANIMATION_SPEED_JUMP));
            setPlayerPositions(prev => ({ ...prev, [playerId]: target }));
            
            // Setelah pindah karena ular/tangga, cek apakah di tujuan ada bintang?
            const endSpecial = checkSpecialTile(target);
            if (endSpecial) {
                triggerModal(endSpecial);
                return true; // Menandakan proses berhenti karena modal muncul
            }
        }
        return false;
    };

    // 5. Helper: Munculkan Modal
    const triggerModal = (type) => {
        const list = type === "truth" ? truthList : type === "dare" ? dareList : reflectionList;
        setModal({
            isOpen: true,
            type: type,
            content: list[Math.floor(Math.random() * list.length)]
        });
    };

    // 6. Logic Utama Pergerakan Dadu
    const movePlayer = async (playerId, steps) => {
        setIsMoving(true);
        let currentPos = playerPositions[playerId];
        let targetPos = Math.min(currentPos + steps, BOARD_SIZE);

        // Animasi gerak satu per satu kotak
        for (let i = currentPos + 1; i <= targetPos; i++) {
            setPlayerPositions(prev => ({ ...prev, [playerId]: i }));
            await new Promise(r => setTimeout(r, ANIMATION_SPEED_MOVE));
        }

        if (targetPos === BOARD_SIZE) {
            setWinner(playerId);
            setIsMoving(false);
            return;
        }

        // Langkah A: Cek apakah mendarat di Bintang
        const specialType = checkSpecialTile(targetPos);
        if (specialType) {
            triggerModal(specialType);
            // Pengecekan ular/tangga akan dilanjutkan di handleModalClose
        } else {
            // Langkah B: Jika tidak ada bintang, cek ular/tangga
            const modalTriggeredAfterJump = await handleSnakeOrLadder(playerId, targetPos);
            if (!modalTriggeredAfterJump) {
                nextTurn();
            }
        }
        setIsMoving(false);
    };

    // 7. Handler: Tutup Modal (Melanjutkan logic yang tertunda)
    const handleModalClose = useCallback(async () => {
        setModal(prev => ({ ...prev, isOpen: false }));
        
        const currentPos = playerPositions[turn];
        
        // Cek apakah posisi setelah bintang adalah awal tangga/kepala ular
        const targetLadder = config.ladders[currentPos];
        const targetSnake = config.snakes[currentPos];
        
        if (targetLadder || targetSnake) {
            setIsMoving(true);
            await handleSnakeOrLadder(turn, currentPos);
            setIsMoving(false);
            nextTurn();
        } else {
            nextTurn();
        }
    }, [turn, playerPositions, config, nextTurn]);

    // 8. Handler: Roll Dadu
    const handleRoll = async () => {
        if (isRolling || isMoving || modal.isOpen || winner) return;

        setIsRolling(true);
        await new Promise(r => setTimeout(r, ANIMATION_SPEED_ROLL));

        const val = Math.floor(Math.random() * DICE_MAX) + 1;
        setDiceValue(val);
        setIsRolling(false);

        await movePlayer(turn, val);
    };

    const resetGame = () => {
        setGameState(GAME_STATES.HOME);
        setAgreed(false);
        setWinner(null);
        setTurn(1);
        setIsMoving(false);
        setDiceValue(0);
    };

    return {
        gameState,
        setGameState,
        playerCount,
        setPlayerCount,
        agreed,
        setAgreed,
        config,
        playerPositions,
        turn,
        diceValue,
        isRolling,
        isMoving,
        modal,
        setModal,
        winner,
        setWinner,
        startGame,
        handleRoll,
        handleModalClose,
        resetGame
    };
};