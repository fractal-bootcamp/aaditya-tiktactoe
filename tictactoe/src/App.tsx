import React, { useState } from 'react';
import StartPage from './StartPage';
import GamePage from './GamePage';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState<string[]>([]);
  const [mode, setMode] = useState('');

  const startGame = (p1: string, p2: string, selectedMode: string) => {
    setPlayers([p1, p2]);
    setMode(selectedMode);
    setGameStarted(true);
  };

  return (
    <div>
      {gameStarted ? (
        <GamePage players={players} mode={mode} />
      ) : (
        <StartPage onStart={startGame} />
      )}
    </div>
  );
};

export default App;
