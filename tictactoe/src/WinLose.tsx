import React from 'react';

const WinLose = ({
  winner,
  onRestart,
  onReplay,
}: {
  winner: string;
  onRestart: () => void;
  onReplay: () => void;
}) => (
  <div className="modal" style={modalStyles}>
    <h2>{winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`}</h2>
    <button onClick={onRestart} style={buttonStyles}>
      Restart Game
    </button>
    <button onClick={onReplay} style={buttonStyles}>
      Replay Same Player
    </button>
  </div>
);

const modalStyles = {
  textAlign: 'center',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const buttonStyles = {
  padding: '10px 20px',
  fontSize: '1.2rem',
  marginTop: '10px',
  cursor: 'pointer',
  backgroundColor: '#007BFF',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
};

export default WinLose;
