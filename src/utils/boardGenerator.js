import { BOARD_SIZE, SPECIAL_TILE_COUNT, SNAKE_COUNT, LADDER_COUNT } from './constants';

export const generateBoardConfig = (day = 1) => {
  const config = {
    snakes: {},
    ladders: {},
    truthTiles: [],
    dareTiles: [],
    reflectionTiles: [],
    teleports: {}
  };

  const usedTiles = new Set([1, BOARD_SIZE]);

  const getRandomTile = (exclude = []) => {
    let tile;
    let attempts = 0;
    do {
      tile = Math.floor(Math.random() * (BOARD_SIZE - 2)) + 2;
      attempts++;
    } while ((usedTiles.has(tile) || exclude.includes(tile)) && attempts < 100);
    usedTiles.add(tile);
    return tile;
  };

  // 1. Plot Tangga (Bawah ke Atas)
  let lCount = 0;
  let lAttempts = 0;
  while (lCount < LADDER_COUNT && lAttempts < LADDER_COUNT * 30) {
    lAttempts++;
    let start = getRandomTile();
    // Pastikan tangga naik ke atas (min 5 kotak, max 20 kotak)
    let end = start + Math.floor(Math.random() * 15) + 5;
    
    if (end < BOARD_SIZE && !usedTiles.has(end)) {
      config.ladders[start] = end;
      usedTiles.add(end);
      lCount++;
    } else {
      usedTiles.delete(start); // Kembalikan jika gagal
    }
  }

  // 2. Plot Ular (Atas ke Bawah)
  let sCount = 0;
  let sAttempts = 0;
  while (sCount < SNAKE_COUNT && sAttempts < SNAKE_COUNT * 30) {
    sAttempts++;
    let start = getRandomTile();
    // Pastikan ular turun ke bawah (min 5 kotak)
    let end = start - (Math.floor(Math.random() * 15) + 5);
    
    if (end > 1 && !usedTiles.has(end)) {
      config.snakes[start] = end;
      usedTiles.add(end);
      sCount++;
    } else {
      usedTiles.delete(start);
    }
  }

  // 3. Plot Bintang Spesial (Hanya di kotak yang masih kosong)
  for (let i = 0; i < SPECIAL_TILE_COUNT; i++) config.truthTiles.push(getRandomTile());
  for (let i = 0; i < SPECIAL_TILE_COUNT; i++) config.dareTiles.push(getRandomTile());
  for (let i = 0; i < SPECIAL_TILE_COUNT; i++) config.reflectionTiles.push(getRandomTile());

  // 4. Day 2: Plot Teleport (harus kotak kosong juga)
  if (day === 2) {
    const TELEPORT_COUNT = 3;
    let tCount = 0;
    let tAttempts = 0;

    while (tCount < TELEPORT_COUNT && tAttempts < TELEPORT_COUNT * 30) {
      tAttempts++;
      const start = getRandomTile();
      const end = getRandomTile([start]);

      // Teleport harus ke atas (end > start) dengan jarak minimal 8 kotak
      if (end <= start || end - start < 8) {
        usedTiles.delete(start);
        usedTiles.delete(end);
        continue;
      }

      config.teleports[start] = end;
      tCount++;
    }
  }

  return config;
};