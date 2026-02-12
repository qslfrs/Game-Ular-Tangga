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

    const startGame = useCallback(() => {
        const newConfig = generateBoardConfig();
        setConfig(newConfig);
        const pos = {};
        for (let i = 1; i <= playerCount; i++) pos[i] = 1;
        setPlayerPositions(pos);
        setGameState(GAME_STATES.PLAYING);
        setTurn(1);
        setIsMoving(false);
        setWinner(null);
    }, [playerCount]);

    const nextTurn = useCallback(() => {
        setTurn(t => t >= playerCount ? 1 : t + 1);
    }, [playerCount]);

    const handleModalClose = useCallback(() => {
        setModal(prev => ({ ...prev, isOpen: false }));
        nextTurn();
    }, [nextTurn]);

    const movePlayer = async (id, steps) => {
        let curr = playerPositions[id];

        // Animate movement tile by tile
        for (let i = 1; i <= steps; i++) {
            curr++;
            if (curr >= BOARD_SIZE) {
                curr = BOARD_SIZE;
                break;
            }
            setPlayerPositions(p => ({ ...p, [id]: curr }));
            await new Promise(r => setTimeout(r, ANIMATION_SPEED_MOVE));
        }

        let final = curr;

        // Check for Ladders
        if (config.ladders[final]) {
            await new Promise(r => setTimeout(r, ANIMATION_SPEED_JUMP));
            final = config.ladders[final];
            setPlayerPositions(p => ({ ...p, [id]: final }));
        }
        // Check for Snakes
        else if (config.snakes[final]) {
            await new Promise(r => setTimeout(r, ANIMATION_SPEED_JUMP));
            final = config.snakes[final];
            setPlayerPositions(p => ({ ...p, [id]: final }));
        }

        // Check Win Condition or Special Tiles
        if (final === BOARD_SIZE) {
            setWinner(id);
        } else if (config.truthTiles.includes(final)) {
            setModal({ isOpen: true, type: "truth", content: truthList[Math.floor(Math.random() * truthList.length)] });
        } else if (config.dareTiles.includes(final)) {
            setModal({ isOpen: true, type: "dare", content: dareList[Math.floor(Math.random() * dareList.length)] });
        } else if (config.reflectionTiles.includes(final)) {
            setModal({ isOpen: true, type: "reflection", content: reflectionList[Math.floor(Math.random() * reflectionList.length)] });
        } else {
            nextTurn();
        }
    };

    const handleRoll = async () => {
        if (isRolling || isMoving || modal.isOpen || winner) return;

        setIsRolling(true);
        // Roll animation delay
        await new Promise(r => setTimeout(r, ANIMATION_SPEED_ROLL));

        const val = Math.floor(Math.random() * DICE_MAX) + 1;
        setDiceValue(val);
        setIsRolling(false);

        setIsMoving(true);
        await movePlayer(turn, val);
        setIsMoving(false);
    };

    const resetGame = () => {
        setGameState(GAME_STATES.HOME);
        setAgreed(false);
        setWinner(null);
        setTurn(1);
        setIsMoving(false);
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
