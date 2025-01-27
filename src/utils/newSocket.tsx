import { io } from "socket.io-client";

const URL = "http://localhost:5000";

export const createSocket = (token: string, gameId: any) => {
  return io(URL, {
    transports: ["websocket"],
    query: {
      game_id: gameId,
      token,
    },
  });
};
