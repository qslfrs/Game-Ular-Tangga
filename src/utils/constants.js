
export const BOARD_SIZE = 70;
export const BOARD_ROWS = 7;
export const BOARD_COLS = 10;
export const DICE_MAX = 6;

export const ANIMATION_SPEED_MOVE = 200;
export const ANIMATION_SPEED_JUMP = 400;
export const ANIMATION_SPEED_ROLL = 600;

export const SPECIAL_TILE_COUNT = 5;
export const SNAKE_COUNT = 5;
export const LADDER_COUNT = 5;

export const PLAYER_COUNT_DEFAULT = 2;
export const PLAYER_COUNT_MIN = 2;
export const PLAYER_COUNT_MAX = 6;
export const PLAYER_COUNTS_ALLOWED = [2, 4, 6];

// Set ke true saat development agar semua day langsung terbuka
export const DEV_UNLOCK_ALL_DAYS = true;

export const TOTAL_DAYS = 6;
export const DAY_UNLOCK_DELAY_HOURS = 18;
export const DAY_UNLOCK_DELAY_MS = DAY_UNLOCK_DELAY_HOURS * 60 * 60 * 1000;

export const GAME_STATES = {
    HOME: 'HOME',
    ABOUT: 'ABOUT',
    AGREEMENT: 'AGREEMENT',
    DAY_SELECT: 'DAY_SELECT',
    SETUP: 'SETUP',
    PLAYING: 'PLAYING',
    POSTGAME: 'POSTGAME',
    THANKS: 'THANKS'
};
