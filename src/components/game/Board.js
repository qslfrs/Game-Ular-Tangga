"use client";
import React, { useMemo } from 'react';

const Board = ({ config, playerPositions }) => {
  // Membuat urutan angka ular tangga (Z-pattern)
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

  // Fungsi kalkulasi koordinat untuk SVG Garis & Pion
  const getTileCoords = (tileNum) => {
    let r = Math.floor((tileNum - 1) / 10);
    let c = (tileNum - 1) % 10;
    if (r % 2 !== 0) c = 9 - c;
    return { x: (c * 10) + 5, y: ((6 - r) * (14.28)) + 7.14 };
  };

  const getPlayerColor = (id) => ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"][id - 1];

  return (
    <div className="relative w-[340px] h-[280px] md:w-[650px] md:h-[480px] bg-[#FDF8F2]/90 backdrop-blur-sm border-[10px] border-white shadow-2xl rounded-[40px] overflow-hidden p-2">
      
      {/* GRID KOTAK */}
      <div className="absolute inset-2 grid grid-cols-10 grid-rows-7 gap-1">
        {board.flat().map((tile) => (
          <div 
            key={tile} 
            className={`relative flex items-center justify-center rounded-lg shadow-sm transition-all
              ${tile % 2 !== 0 ? 'bg-[#E3B5A4]' : 'bg-[#F3FDCF]'}`}
          >
            {/* Nomor Kotak */}
            <span className="absolute top-0.5 left-1 text-[8px] md:text-[12px] font-black text-[#2D5A8E]/40">
              {tile}
            </span>
            
            {/* Icon Bintang (Jika ada di config) */}
            <div className="w-6 h-6 md:w-10 md:h-10">
              {config.truthTiles.includes(tile) && <img src="/yellow-star.png" className="w-full h-full object-contain" alt="Truth" />}
              {config.dareTiles.includes(tile) && <img src="/purple-star.png" className="w-full h-full object-contain" alt="Dare" />}
              {config.reflectionTiles.includes(tile) && <img src="/green-star.png" className="w-full h-full object-contain" alt="Reflect" />}
            </div>
          </div>
        ))}
      </div>

      {/* SVG LAYER (Ular & Tangga Manual) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#166534" />
          </marker>
        </defs>

        {/* Garis Tangga (Cokelat Kayu) */}
        {Object.entries(config.ladders).map(([s, e]) => {
          const from = getTileCoords(parseInt(s));
          const to = getTileCoords(parseInt(e));
          return (
            <g key={s}>
              <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
              <circle cx={from.x} cy={from.y} r="1" fill="#8B4513" />
              <circle cx={to.x} cy={to.y} r="1" fill="#8B4513" />
            </g>
          );
        })}

        {/* Garis Ular (Garis Putus-putus Hijau Tua dengan Lengkungan) */}
        {Object.entries(config.snakes).map(([s, e]) => {
          const from = getTileCoords(parseInt(s));
          const to = getTileCoords(parseInt(e));
          const midX = (from.x + to.x) / 2 + 5;
          const midY = (from.y + to.y) / 2 - 5;
          return (
            <path 
              key={s} 
              d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`} 
              stroke="#166534" strokeWidth="1.2" fill="none" strokeDasharray="2" opacity="0.7" 
            />
          );
        })}
      </svg>

      {/* PION PEMAIN */}
      {Object.entries(playerPositions).map(([id, pos]) => {
        const coords = getTileCoords(pos);
        return (
          <div key={id} 
            className="absolute w-6 h-6 md:w-9 md:h-9 rounded-full border-2 border-white shadow-lg transition-all duration-500 z-20 flex items-center justify-center text-white font-black text-[10px] md:text-sm"
            style={{ 
              left: `${coords.x}%`, 
              top: `${coords.y}%`, 
              transform: 'translate(-50%, -50%)', 
              backgroundColor: getPlayerColor(id) 
            }}>
            {id}
          </div>
        );
      })}
    </div>
  );
};

export default Board;