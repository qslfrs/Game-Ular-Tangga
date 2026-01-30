import { truthList, dareList } from './content';

export const generateBoardConfig = () => {
  const config = { 
    snakes: {}, 
    ladders: {}, 
    truthPoints: {}, // Format: { kotak: "soal" }
    darePoints: {} 
  };
  const usedTiles = new Set([1, 100]);

  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);
  const randomTruths = shuffle(truthList);
  const randomDares = shuffle(dareList);

  // 1. Plot Truth & Dare (6 titik acak)
  let count = 0;
  while (count < 6) {
    let tTile = Math.floor(Math.random() * 90) + 5;
    if (!usedTiles.has(tTile)) {
      config.truthPoints[tTile] = randomTruths[count];
      usedTiles.add(tTile);
      count++;
    }
  }
  count = 0;
  while (count < 6) {
    let dTile = Math.floor(Math.random() * 90) + 5;
    if (!usedTiles.has(dTile)) {
      config.darePoints[dTile] = randomDares[count];
      usedTiles.add(dTile);
      count++;
    }
  }

  // 2. Plot Tangga (5 buah, jarak pendek-menengah agar rapi)
  let lCount = 0;
  while (lCount < 5) {
    let start = Math.floor(Math.random() * 70) + 2;
    let end = start + Math.floor(Math.random() * 20) + 8;
    if (end < 98 && !usedTiles.has(start) && !usedTiles.has(end)) {
      config.ladders[start] = end;
      usedTiles.add(start); usedTiles.add(end);
      lCount++;
    }
  }

  // 3. Plot Ular (5 buah)
  let sCount = 0;
  while (sCount < 5) {
    let head = Math.floor(Math.random() * 80) + 15;
    let tail = head - (Math.floor(Math.random() * 20) + 8);
    if (tail > 2 && !usedTiles.has(head) && !usedTiles.has(tail)) {
      config.snakes[head] = tail;
      usedTiles.add(head); usedTiles.add(tail);
      sCount++;
    }
  }

  return config;
};