import { useState } from "react";

export type Player = "X" | "O";
export type BoardState = (Player | null)[];

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const initialBoardState: BoardState = Array(9).fill(null);

const checkWinner = (boardState: BoardState): Player | "Draw" | null => {
  for (const [a, b, c] of winConditions) {
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a] as Player;
    }
  }
  return boardState.every(cell => cell !== null) ? "Draw" : null;
};

export const useGameState = () => {
  const [board, setBoard] = useState<BoardState>(initialBoardState);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "Draw" | null>(null);

  const handleMove = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }

    return newBoard;
  };

  const resetGame = () => {
    setBoard(initialBoardState);
    setCurrentPlayer("X");
    setWinner(null);
  };

  const initializeBoard = (board: BoardState) => {
    setBoard(board);
  };

  return { board, currentPlayer, winner, handleMove, resetGame, initializeBoard };
};
