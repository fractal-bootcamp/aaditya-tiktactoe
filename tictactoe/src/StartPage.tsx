import React, { useState } from 'react';

const StartPage = ({
  onStart,
  onJoinGame,
  isMultiplayer,
}: {
  onStart: (p1: string, p2: string, mode: string) => void;
  onJoinGame: (player: string, gameId: string) => void;
  isMultiplayer: boolean;
}) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [gameId, setGameId] = useState('');
  const [mode, setMode] = useState(isMultiplayer ? 'online' : '1v1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isMultiplayer) {
      if (player1) {
        onStart(player1, 'Opponent', mode);
      }
    } else {
      if (player1 && (mode === '1v1' ? player2 : true)) {
        onStart(player1, player2 || 'Computer', mode);
      }
    }
  };

  const handleJoinGame = () => {
    if (player1 && gameId) {
      onJoinGame(player1, gameId);
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
          placeholder="Your Name"
          style={{
            padding: '10px',
            fontSize: '1rem',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
        {!isMultiplayer && mode === '1v1' && (
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
        {!isMultiplayer && (
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
        )}
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
          {isMultiplayer ? 'Create Game' : 'Start Game'}
        </button>
      </form>

      {isMultiplayer && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <input
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            placeholder="Enter Game ID"
            style={{
              padding: '10px',
              fontSize: '1rem',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={handleJoinGame}
            style={{
              marginTop: '10px',
              padding: '10px',
              fontSize: '1rem',
              cursor: 'pointer',
              width: '100%',
              boxSizing: 'border-box',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Join Game
          </button>
        </div>
      )}
    </div>
  );
};

export default StartPage;
