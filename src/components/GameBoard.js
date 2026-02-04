"use client";
import React, { useMemo } from 'react';

const GameBoard = ({ config, playerPositions }) => {
  const board = useMemo(() => {
    const tempBoard = [];
    for (let r = 9; r >= 0; r--) {
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
    return { x: (c * 10) + 5, y: ((9 - r) * 10) + 5 };
  };

  return (
    <div className="relative w-[320px] h-[320px] md:w-[600px] md:h-[600px] bg-white border-2 border-slate-300 shadow-2xl overflow-hidden rounded-xl">
      
      {/* LAPISAN 1: BACKGROUND GRID & DIAMOND (Soft) */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
        {board.flat().map((tile) => (
          <div key={tile} className="border-[0.5px] border-slate-100 flex items-center justify-center">
            {config.truthTiles?.includes(tile) && <div className="w-4 h-4 md:w-8 md:h-8 bg-blue-50/50 rotate-45 rounded-md" />}
            {config.dareTiles?.includes(tile) && <div className="w-4 h-4 md:w-8 md:h-8 bg-red-50/50 rotate-45 rounded-md" />}
          </div>
        ))}
      </div>

      {/* LAPISAN 2: SVG ULAR & TANGGA (Dibuat Tipis & Rapi) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" viewBox="0 0 100 100">
        {Object.entries(config.ladders).map(([s, e]) => {
          const from = getTileCoords(parseInt(s)); const to = getTileCoords(parseInt(e));
          return (
            <g key={`lad-${s}`} stroke="#8B4513" strokeWidth="0.8">
              <line x1={from.x-1.2} y1={from.y} x2={to.x-1.2} y2={to.y} />
              <line x1={from.x+1.2} y1={from.y} x2={to.x+1.2} y2={to.y} />
              {[...Array(4)].map((_, i) => {
                 const t = (i + 1) / 5;
                 return <line key={i} x1={from.x-1.2+(to.x-from.x)*t} y1={from.y+(to.y-from.y)*t} x2={from.x+1.2+(to.x-from.x)*t} y2={from.y+(to.y-from.y)*t} strokeWidth="0.4" />
              })}
            </g>
          );
        })}
        {Object.entries(config.snakes).map(([s, e]) => {
          const from = getTileCoords(parseInt(s)); const to = getTileCoords(parseInt(e));
          return <path key={`snk-${s}`} d={`M ${from.x} ${from.y} Q ${(from.x+to.x)/2 + 5} ${(from.y+to.y)/2 - 5} ${to.x} ${to.y}`} 
                  stroke="#166534" strokeWidth="1.2" fill="none" strokeDasharray="1.5,1" strokeLinecap="round" />;
        })}
      </svg>

      {/* LAPISAN 3: ANGKA & DIAMOND ICON (Dibuat Sangat Jelas) */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none">
        {board.flat().map((tile) => (
          <div key={tile} className="flex flex-col items-center justify-center p-1">
             <span className="text-[11px] md:text-base font-black text-slate-700">{tile}</span>
             <div className="flex gap-0.5 mt-0.5">
                {config.truthTiles?.includes(tile) && <div className="w-2 h-2 md:w-4 md:h-4 bg-blue-500 rotate-45 shadow-sm border-2 border-white" title="Truth" />}
                {config.dareTiles?.includes(tile) && <div className="w-2 h-2 md:w-4 md:h-4 bg-red-500 rotate-45 shadow-sm border-2 border-white" title="Dare" />}
             </div>
          </div>
        ))}
      </div>

      {/* LAPISAN 4: PION PEMAIN */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none">
        {board.flat().map((tile) => (
          <div key={`pawn-container-${tile}`} className="flex items-center justify-center relative">
            {Object.entries(playerPositions).map(([id, pos]) => (
              pos === tile && (
                <div key={id} className="w-4 h-4 md:w-8 md:h-8 rounded-full border-2 border-white shadow-2xl absolute transition-all duration-300 animate-bounce-short"
                     style={{ backgroundColor: getPlayerColor(id), zIndex: 100 }} />
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const getPlayerColor = (id) => ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"][id - 1] || "#000";

export default GameBoard;