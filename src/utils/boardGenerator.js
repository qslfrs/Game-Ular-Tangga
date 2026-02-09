import { BOARD_SIZE, SPECIAL_TILE_COUNT, SNAKE_COUNT, LADDER_COUNT } from './constants';

export const generateBoardConfig = () => {
  const config = {
    snakes: {},
    ladders: {},
    truthTiles: [],      // Bintang
    dareTiles: [],       // Api
    reflectionTiles: []  // Bibit
  };

  const usedTiles = new Set([1, BOARD_SIZE]);

  const getRandomTile = () => {
    let tile;
    do {
      // Range: 5 to BOARD_SIZE - 10 roughly
      tile = Math.floor(Math.random() * (BOARD_SIZE - 10)) + 5;
    } while (usedTiles.has(tile));
    usedTiles.add(tile);
    return tile;
  };

  // Plot masing-masing 5 titik simbol
  for (let i = 0; i < SPECIAL_TILE_COUNT; i++) config.truthTiles.push(getRandomTile());
  for (let i = 0; i < SPECIAL_TILE_COUNT; i++) config.dareTiles.push(getRandomTile());
  for (let i = 0; i < SPECIAL_TILE_COUNT; i++) config.reflectionTiles.push(getRandomTile());

  // Plot Tangga
  let lCount = 0;
  while (lCount < LADDER_COUNT) {
    let start = Math.floor(Math.random() * BOARD_SIZE) + 2;
    let end = start + Math.floor(Math.random() * 20) + 10;

    // Ensure end is not beyond the second to last tile (BOARD_SIZE - 1)
    if (end < (BOARD_SIZE - 1) && !usedTiles.has(start) && !usedTiles.has(end)) {
      config.ladders[start] = end;
      usedTiles.add(start); usedTiles.add(end);
      lCount++;
    }
  }

  // Plot Ular
  let sCount = 0;
  while (sCount < SNAKE_COUNT) {
    let head = Math.floor(Math.random() * (BOARD_SIZE - 20)) + 15;
    let tail = head - (Math.floor(Math.random() * 20) + 10);

    // Ensure tail is not below start tile (1) + buffer
    if (tail > 2 && !usedTiles.has(head) && !usedTiles.has(tail)) {
      config.snakes[head] = tail;
      usedTiles.add(head); usedTiles.add(tail);
      sCount++;
    }
  }

  return config;
};