import React from 'react';
import WinLose from './WinLose';
import { useSocketIOGameState } from './SocketIO';

const GamePage = ({ gameId, player }: { gameId: string, player: string }) => {
  const socketUrl = 'http://localhost:3001'; // Your socket.io server URL

  // Use the custom hook to manage game state and socket synchronization
  const { board, currentPlayer, winner, handleMove, resetGame, isConnected } = useSocketIOGameState(socketUrl, gameId);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h1>Tic Tac Toe</h1>
      <p>{isConnected ? 'Connected' : 'Disconnected'}</p>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <div>Current Player: {currentPlayer}</div>
        {winner && <div>{winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`}</div>}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gridTemplateRows: 'repeat(3, 100px)',
          gap: '5px',
        }}
      >
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleMove(index)}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100px',
              height: '100px',
              fontSize: '2rem',
              cursor: 'pointer',
              backgroundColor: '#f0f0f0',
              border: '2px solid #333',
              transition: 'background-color 0.2s',
            }}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && <WinLose winner={winner} onRestart={resetGame} />}
    </div>
  );
};

export default GamePage;
