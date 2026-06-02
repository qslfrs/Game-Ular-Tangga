"use client";
import React, { useRef } from 'react';

const FACE_TRANSFORMS = {
  1: 'rotateX(0deg) rotateY(0deg)',
  2: 'rotateX(0deg) rotateY(90deg)',
  3: 'rotateX(-90deg) rotateY(0deg)',
  4: 'rotateX(90deg) rotateY(0deg)',
  5: 'rotateX(0deg) rotateY(-90deg)',
  6: 'rotateX(180deg) rotateY(0deg)',
};

const PIPS = {
  1: [false,false,false, false,true,false, false,false,false],
  2: [true,false,false,  false,false,false, false,false,true],
  3: [true,false,false,  false,true,false,  false,false,true],
  4: [true,false,true,   false,false,false,  true,false,true],
  5: [true,false,true,   false,true,false,  true,false,true],
  6: [true,false,true,   true,false,true,   true,false,true],
};

const Face = ({ num }) => (
  <div style={{
    position: 'absolute', width: 72, height: 72,
    background: 'white', border: '2px solid #EADCCB',
    borderRadius: 12, display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'repeat(3,1fr)',
    padding: 8, boxSizing: 'border-box', gap: 2,
    transform: {
      1: 'translateZ(36px)', 6: 'rotateY(180deg) translateZ(36px)',
      2: 'rotateY(-90deg) translateZ(36px)', 5: 'rotateY(90deg) translateZ(36px)',
      3: 'rotateX(90deg) translateZ(36px)', 4: 'rotateX(-90deg) translateZ(36px)',
    }[num]
  }}>
    {PIPS[num].map((on, i) => (
      <div key={i} style={{
        borderRadius: '50%',
        background: on ? '#2D5A8E' : 'transparent',
      }} />
    ))}
  </div>
);

const DiceRoller = ({ diceValue, isRolling }) => {
  const transform = diceValue && !isRolling
    ? FACE_TRANSFORMS[diceValue]
    : undefined;

  return (
    <div style={{ perspective: 200, width: 72, height: 72, margin: '0 auto' }}>
      <div style={{
        width: 72, height: 72,
        position: 'relative', transformStyle: 'preserve-3d',
        transition: isRolling ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: transform,
        animation: isRolling ? 'diceRoll 0.7s linear infinite' : 'none',
      }}>
        {[1,2,3,4,5,6].map(n => <Face key={n} num={n} />)}
      </div>
      <style>{`
        @keyframes diceRoll {
          0%   { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          33%  { transform: rotateX(180deg) rotateY(90deg) rotateZ(45deg); }
          66%  { transform: rotateX(90deg) rotateY(270deg) rotateZ(180deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DiceRoller;