"use client";
import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { generateBoardConfig } from '@/utils/boardGenerator';
import { getChallengeListByDay } from '@/utils/challengeData';
import {
    BOARD_SIZE,
    DICE_MAX,
    ANIMATION_SPEED_MOVE,
    ANIMATION_SPEED_JUMP,
    ANIMATION_SPEED_ROLL,
    GAME_STATES,
    PLAYER_COUNT_DEFAULT,
    TOTAL_DAYS,
    DAY_UNLOCK_DELAY_MS
} from '@/utils/constants';

const STORAGE_KEY = 'tangga-berani-progress-v1';

const buildDayMeta = (day, now, completedAtByDay) => {
    if (day === 1) {
        return {
            day,
            unlocked: true,
            completed: !!completedAtByDay[1],
            unlockAt: null,
            remainingMs: 0
        };
    }

    const prevCompletedAt = completedAtByDay[day - 1];
    if (!prevCompletedAt) {
        return {
            day,
            unlocked: false,
            completed: !!completedAtByDay[day],
            unlockAt: null,
            remainingMs: null
        };
    }

    const unlockAt = prevCompletedAt + DAY_UNLOCK_DELAY_MS;
    const remainingMs = Math.max(0, unlockAt - now);

    return {
        day,
        unlocked: remainingMs === 0,
        completed: !!completedAtByDay[day],
        unlockAt,
        remainingMs
    };
};

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
    const [currentDay, setCurrentDay] = useState(1);
    const [completedAtByDay, setCompletedAtByDay] = useState({});
    const [now, setNow] = useState(Date.now());

    // Ref: mencegah save effect nulis ke localStorage sebelum load effect selesai baca
    const hasLoaded = useRef(false);

    // Timer hanya aktif saat di layar DAY_SELECT (menghitung countdown unlock hari)
    useEffect(() => {
        if (gameState !== GAME_STATES.DAY_SELECT) return;
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, [gameState]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return;

            const parsed = JSON.parse(saved);
            if (parsed?.completedAtByDay && typeof parsed.completedAtByDay === 'object') {
                setCompletedAtByDay(parsed.completedAtByDay);
            }
            if (parsed?.currentDay && Number.isInteger(parsed.currentDay)) {
                const day = Math.min(Math.max(parsed.currentDay, 1), TOTAL_DAYS);
                setCurrentDay(day);
            }
        } catch {
            // no-op
        }
        // Tandai bahwa load sudah selesai; save effect boleh mulai menulis
        hasLoaded.current = true;
    }, []);

    useEffect(() => {
        // Tunggu sampai load effect selesai agar tidak overwrite data tersimpan
        if (!hasLoaded.current || typeof window === 'undefined') return;

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                currentDay,
                completedAtByDay
            })
        );
    }, [currentDay, completedAtByDay]);

    const daysMeta = useMemo(() => {
        const list = [];
        for (let day = 1; day <= TOTAL_DAYS; day++) {
            list.push(buildDayMeta(day, now, completedAtByDay));
        }
        return list;
    }, [now, completedAtByDay]);

    const isDayUnlocked = useCallback((day) => {
        const meta = daysMeta.find(d => d.day === day);
        return !!meta?.unlocked;
    }, [daysMeta]);

    const allDaysUnlocked = useMemo(() => daysMeta.every(d => d.unlocked), [daysMeta]);

    const selectDay = useCallback((day) => {
        const safeDay = Math.min(Math.max(day, 1), TOTAL_DAYS);
        if (!isDayUnlocked(safeDay)) return false;

        setCurrentDay(safeDay);
        setGameState(GAME_STATES.SETUP);
        return true;
    }, [isDayUnlocked]);

    // 1. Inisialisasi Game
    const startGame = useCallback(() => {
        const newConfig = generateBoardConfig();
        setConfig(newConfig);
        const pos = {};
        for (let i = 1; i <= playerCount; i++) pos[i] = 1;
        setPlayerPositions(pos);
        setTurn(1);
        setDiceValue(0);
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
        const list = getChallengeListByDay(currentDay, type);
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
            setCompletedAtByDay(prev => {
                if (prev[currentDay]) return prev;
                return { ...prev, [currentDay]: Date.now() };
            });
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

    const resetDayProgress = useCallback(() => {
        setCompletedAtByDay({});
        setCurrentDay(1);
        setWinner(null);
        setModal({ isOpen: false, type: "", content: "" });
        setGameState(GAME_STATES.DAY_SELECT);
    }, []);

    const goToDaySelect = useCallback(() => {
        setWinner(null);
        setModal({ isOpen: false, type: "", content: "" });
        setGameState(GAME_STATES.DAY_SELECT);
    }, []);

    return {
        gameState,
        setGameState,
        currentDay,
        setCurrentDay,
        daysMeta,
        allDaysUnlocked,
        selectDay,
        resetDayProgress,
        goToDaySelect,
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