import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

const Lobby = ({ onGameStart }: { onGameStart: (gameId: string, players: string[]) => void }) => {
  const [name, setName] = useState('');
  const [gameId, setGameId] = useState('');
  const [joinError, setJoinError] = useState<string | null>(null);

  const handleCreateGame = () => {
    socket.emit('createGame', name, (response: { gameId: string }) => {
      onGameStart(response.gameId, [name]);
    });
  };

  const handleJoinGame = () => {
    socket.emit('joinGame', { gameId, playerName: name }, (response: { success: boolean; game?: any; message?: string }) => {
      if (response.success) {
        onGameStart(gameId, response.game.players);
      } else {
        setJoinError(response.message || 'Error joining game.');
      }
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Join or Create a Tic Tac Toe Game</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
      <br />
      <button onClick={handleCreateGame}>Create Game</button>
      <br />
      <input value={gameId} onChange={(e) => setGameId(e.target.value)} placeholder="Enter Game ID to Join" />
      <button onClick={handleJoinGame}>Join Game</button>
      {joinError && <p style={{ color: 'red' }}>{joinError}</p>}
    </div>
  );
};

export default Lobby;
