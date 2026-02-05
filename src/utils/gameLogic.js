export const generateBoardConfig = () => {
  const config = { 
    snakes: {}, 
    ladders: {}, 
    truthTiles: [],      // Bintang
    dareTiles: [],       // Api
    reflectionTiles: []  // Bibit
  };
  
  const usedTiles = new Set([1, 100]);

  const getRandomTile = () => {
    let tile;
    do {
      tile = Math.floor(Math.random() * 90) + 5;
    } while (usedTiles.has(tile));
    usedTiles.add(tile);
    return tile;
  };

  // Plot masing-masing 5 titik simbol
  for (let i = 0; i < 5; i++) config.truthTiles.push(getRandomTile());
  for (let i = 0; i < 5; i++) config.dareTiles.push(getRandomTile());
  for (let i = 0; i < 5; i++) config.reflectionTiles.push(getRandomTile());

  // Plot Tangga (5 buah)
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

  // Plot Ular (5 buah)
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