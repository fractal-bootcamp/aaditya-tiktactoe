import React, { useState } from 'react';

const StartPage = ({ onStart }: { onStart: (p1: string, p2: string, mode: string) => void }) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [mode, setMode] = useState('1v1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (player1 && (mode === '1v1' ? player2 : true)) {
      onStart(player1, player2 || 'Computer', mode);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          width: '300px',
        }}
      >
        <input
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          placeholder="Player 1 Name"
          style={{
            padding: '10px',
            fontSize: '1rem',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
        {mode === '1v1' && (
          <input
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            placeholder="Player 2 Name"
            style={{
              padding: '10px',
              fontSize: '1rem',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
        )}
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <option value="1v1">1v1</option>
          <option value="1vComputer">1vComputer</option>
        </select>
        <button
          type="submit"
          style={{
            padding: '10px',
            fontSize: '1rem',
            cursor: 'pointer',
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default StartPage;
