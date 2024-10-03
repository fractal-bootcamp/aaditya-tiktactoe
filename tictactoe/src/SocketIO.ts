import { io, Socket } from "socket.io-client";
import { useGameState } from "./GameState";
import { useEffect, useRef, useState } from "react";

type SocketMessage =
  | { type: "move"; data: { gameId: string; index: number } }
  | { type: "reset"; data: { gameId: string } }
  | { type: "state"; data: { board: (string | null)[] } };

const useSocket = (url: string, gameId: string): [Socket | null, boolean] => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketRef.current = io(url, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on("connect", () => {
      console.log("Socket.IO connection established");
      setIsConnected(true);
      socketRef.current?.emit("joinGame", { gameId });
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log(`Socket.IO disconnected: ${reason}`);
      setIsConnected(false);
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
      setIsConnected(false);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [url, gameId]);

  return [socketRef.current, isConnected];
};

const useSocketIO = (url: string, gameId: string) => {
  const [socket, isConnected] = useSocket(url, gameId);

  const emitMessage = (message: SocketMessage) => {
    if (socket?.connected) {
      socket.emit("game_event", message);
    } else {
      console.warn("Socket not connected. Message not sent:", message);
    }
  };

  const onMessage = (callback: (message: SocketMessage) => void) => {
    if (socket) {
      socket.on("gameState", (game) => {
        console.log("Received game state", game);
        callback({ type: "state", data: { board: game.board } });
      });
      return () => {
        socket.off("gameState", callback);
      };
    }
  };

  return {
    emitMove: (index: number) => emitMessage({ type: "move", data: { gameId, index } }),
    emitReset: () => emitMessage({ type: "reset", data: { gameId } }),
    onMessage,
    isConnected,
  };
};

export const useSocketIOGameState = (url: string, gameId: string) => {
  const { board, currentPlayer, winner, handleMove, resetGame, initializeBoard } = useGameState();
  const { emitMove, emitReset, onMessage, isConnected } = useSocketIO(url, gameId);

  useEffect(() => {
    const cleanup = onMessage(async (message) => {
      switch (message.type) {
        case "move":
          handleMove(message.data.index);
          break;
        case "reset":
          resetGame();
          break;
        case "state":
          initializeBoard(message.data.board);
          break;
        default:
          console.warn("Unknown message type", message);
      }
    });

    return cleanup;
  }, [onMessage, handleMove, resetGame, initializeBoard]);

  const handleSocketMove = (index: number) => {
    emitMove(index);
    handleMove(index); // Update the local board state after making a move
  };

  const handleSocketReset = () => {
    emitReset();
    resetGame(); // Reset the local board state
  };

  return {
    board,
    currentPlayer,
    winner,
    handleMove: handleSocketMove,
    resetGame: handleSocketReset,
    isConnected,
  };
};
