import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (mode === '1vComputer' && turn === 'O' && !winner) {
      const bestMove = findBestMove(board);
      handleMove(bestMove);
    }
  }, [turn, mode, board, winner]);

  const checkWinner = (newBoard: string[]) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
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

  const minimax = (board: string[], depth: number, isMaximizing: boolean): number => {
    const score = evaluateBoard(board);

    if (score === 10 || score === -10 || isBoardFull(board)) {
      return score;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = 'O';
          bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
          board[i] = null;
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = 'X';
          bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
          board[i] = null;
        }
      }
      return bestScore;
    }
  };

  const evaluateBoard = (board: string[]): number => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        if (board[a] === 'O') return 10;
        if (board[a] === 'X') return -10;
      }
    }

    return 0;
  };

  const isBoardFull = (board: string[]): boolean => {
    return board.every(cell => cell);
  };

  const findBestMove = (board: string[]): number => {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = 'O';
        const moveScore = minimax(board, 0, false);
        board[i] = null;

        if (moveScore > bestScore) {
          bestScore = moveScore;
          bestMove = i;
        }
      }
    }

    return bestMove;
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
      {mode === '1v1' && (
        <div
          style={{
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            width: '300px',
            textAlign: 'center',
          }}
        >
          <div>
            <strong>{players[0]}</strong> (X)
          </div>
          <div>
            <strong>{players[1]}</strong> (O)
          </div>
        </div>
      )}
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
