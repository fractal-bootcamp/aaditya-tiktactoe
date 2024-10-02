import React, { useState } from 'react';
import WinLose from './WinLose';

const initialBoard = Array(9).fill(null);

const GamePage = ({ players, mode }: { players: string[], mode: string }) => {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState<string | null>(null);

  const handleMove = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    checkWinner(newBoard);
    setTurn(turn === 'X' ? 'O' : 'X');
  };

  const checkWinner = (newBoard: string[]) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6],            // diagonals
    ];
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        return;
      }
    }
    if (newBoard.every(cell => cell)) {
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setTurn('X');
  };

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
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
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
