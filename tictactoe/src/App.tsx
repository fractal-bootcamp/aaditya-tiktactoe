import React, { useState } from 'react';
import StartPage from './StartPage';
import GamePage from './GamePage';
import LobbyPage from './Lobby';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

const App = () => {
  const [view, setView] = useState<'home' | 'lobby' | 'game'>('home');
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState<string[]>([]);
  const [mode, setMode] = useState('');

  const startLocalGame = (p1: string, p2: string, selectedMode: string) => {
    setPlayers([p1, p2]);
    setMode(selectedMode);
    setGameStarted(true);
    setView('game');
  };

  const joinOnlineGame = (player: string, gameId: string) => {
    socket.emit('joinGame', { player, gameId });
    socket.on('startGame', ({ players }) => {
      setPlayers(players);
      setMode('online');
      setGameStarted(true);
      setView('game');
    });
  };

  const createOnlineGame = (player: string) => {
    socket.emit('createGame', player);
    socket.on('gameCreated', ({ gameId }) => {
      setPlayers([player, '']);
      setMode('online');
      setGameStarted(true);
      setView('game');
    });
  };

  return (
    <div>
      {view === 'home' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
          }}
        >
          <h1>Tic Tac Toe</h1>
          <button
            onClick={() => setView('start')}
            style={{
              padding: '10px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              marginBottom: '20px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Local Game
          </button>
          <button
            onClick={() => setView('lobby')}
            style={{
              padding: '10px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Online Multiplayer
          </button>
        </div>
      )}

      {view === 'start' && (
        <StartPage
          onStart={startLocalGame}
          onJoinGame={joinOnlineGame}
          isMultiplayer={false}
        />
      )}

      {view === 'lobby' && (
        <LobbyPage onCreateGame={createOnlineGame} onJoinGame={joinOnlineGame} />
      )}

      {view === 'game' && gameStarted && <GamePage players={players} mode={mode} />}
    </div>
  );
};

export default App;
