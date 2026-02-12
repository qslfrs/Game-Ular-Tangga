"use client";
import React, { useMemo } from 'react';

const Board = ({ config, playerPositions }) => {
  const board = useMemo(() => {
    const tempBoard = [];
    for (let r = 6; r >= 0; r--) {
      const rowTiles = [];
      for (let c = 0; c < 10; c++) {
        rowTiles.push(r % 2 === 0 ? r * 10 + (c + 1) : r * 10 + (10 - c));
      }
      tempBoard.push(rowTiles);
    }
    return tempBoard;
  }, []);

  const getTileCoords = (tileNum) => {
    let r = Math.floor((tileNum - 1) / 10);
    let c = (tileNum - 1) % 10;
    if (r % 2 !== 0) c = 9 - c;
    return { x: (c * 10) + 5, y: ((6 - r) * (100 / 7)) + (100 / 14) };
  };

  const getPlayerColor = (id) => ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"][id - 1];

  return (
    <div className="relative w-[320px] h-[320px] md:w-[550px] md:h-[550px] bg-white border-4 border-slate-200 shadow-2xl rounded-2xl overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-7">
        {board.flat().map((tile) => (
          <div key={tile} className="border-[0.5px] border-slate-100 flex flex-col items-center justify-center relative">
            <span className="text-[10px] md:text-sm font-bold text-slate-300 absolute top-1 left-1">{tile}</span>
            <div className="text-xs md:text-xl">
              {config.truthTiles.includes(tile) && "⭐"}
              {config.dareTiles.includes(tile) && "🔥"}
              {config.reflectionTiles.includes(tile) && "🌱"}
            </div>
          </div>
        ))}
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60" viewBox="0 0 100 100">
        {Object.entries(config.ladders).map(([s, e]) => {
          const from = getTileCoords(parseInt(s)); const to = getTileCoords(parseInt(e));
          return <line key={s} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" />;
        })}
        {Object.entries(config.snakes).map(([s, e]) => {
          const from = getTileCoords(parseInt(s)); const to = getTileCoords(parseInt(e));
          return <path key={s} d={`M ${from.x} ${from.y} Q ${(from.x + to.x) / 2 + 5} ${(from.y + to.y) / 2 - 5} ${to.x} ${to.y}`} stroke="#166534" strokeWidth="1.5" fill="none" strokeDasharray="2" />;
        })}
      </svg>

      {Object.entries(playerPositions).map(([id, pos]) => {
        const coords = getTileCoords(pos);
        return (
          <div key={id} className="absolute w-4 h-4 md:w-7 md:h-7 rounded-full border-2 border-white shadow-lg transition-all duration-500"
            style={{ left: `${coords.x}%`, top: `${coords.y}%`, transform: 'translate(-50%, -50%)', backgroundColor: getPlayerColor(id), zIndex: 50 }} />
        );
      })}
    </div>
  );
};

export default Board;