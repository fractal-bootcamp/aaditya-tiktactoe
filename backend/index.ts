import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

let games: { [key: string]: { board: string[]; currentPlayer: string; players: string[] } } = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle a player joining a game
  socket.on('joinGame', ({ gameId }) => {
    if (!games[gameId]) {
      games[gameId] = {
        board: Array(9).fill(null),
        currentPlayer: 'X',
        players: [],
      };
    }

    games[gameId].players.push(socket.id);
    socket.join(gameId);
    io.to(gameId).emit('gameState', games[gameId]);
  });

  // Handle a move made by a player
  socket.on('game_event', (message) => {
    const { gameId, index } = message.data;

    const game = games[gameId];
    if (!game) return;

    if (game.board[index] === null) {
      game.board[index] = game.currentPlayer;
      game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';

      io.to(gameId).emit('gameState', game);
    }
  });

  socket.on('reset', ({ gameId }) => {
    const game = games[gameId];
    if (game) {
      game.board = Array(9).fill(null);
      game.currentPlayer = 'X';

      io.to(gameId).emit('gameState', game);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});
