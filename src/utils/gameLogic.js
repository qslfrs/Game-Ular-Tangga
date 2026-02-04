import { truthList, dareList } from './content';

export const generateBoardConfig = () => {
  const config = { 
    snakes: {}, 
    ladders: {}, 
    truthTiles: [], 
    dareTiles: []   
  };
  const usedTiles = new Set([1, 100]);

  // 1. Plot Truth & Dare (Masing-masing 6 titik)
  while(config.truthTiles.length < 6) {
    let tile = Math.floor(Math.random() * 90) + 5; // Hindari start/finish
    if(!config.truthTiles.includes(tile) && !usedTiles.has(tile)) {
      config.truthTiles.push(tile);
      usedTiles.add(tile);
    }
  }
  while(config.dareTiles.length < 6) {
    let tile = Math.floor(Math.random() * 90) + 5;
    if(!config.dareTiles.includes(tile) && !usedTiles.has(tile)) {
      config.dareTiles.push(tile);
      usedTiles.add(tile);
    }
  }

  // 2. Plot Tangga (Minimalis)
  let lCount = 0;
  while (lCount < 5) {
    let start = Math.floor(Math.random() * 70) + 2;
    let end = start + Math.floor(Math.random() * 20) + 10;
    if (end < 99 && !usedTiles.has(start) && !usedTiles.has(end)) {
      config.ladders[start] = end;
      usedTiles.add(start); usedTiles.add(end);
      lCount++;
    }
  }

  // 3. Plot Ular
  let sCount = 0;
  while (sCount < 5) {
    let head = Math.floor(Math.random() * 80) + 15;
    let tail = head - (Math.floor(Math.random() * 20) + 10);
    if (tail > 2 && !usedTiles.has(head) && !usedTiles.has(tail)) {
      config.snakes[head] = tail;
      usedTiles.add(head); usedTiles.add(tail);
      sCount++;
    }
  }

  return config;
};