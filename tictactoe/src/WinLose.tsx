import React from 'react';

const WinLose = ({ winner, onRestart }: { winner: string, onRestart: () => void }) => (
  <div className="modal">
    <h2>{winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`}</h2>
    <button onClick={onRestart}>Restart Game</button>
  </div>
);

export default WinLose;