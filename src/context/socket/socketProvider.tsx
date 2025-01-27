/* eslint-disable react/prop-types */
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

const URL = `${import.meta.env.VITE_SOCKET_URL}`;

// Interface for query parameters
interface QueryParams {
  id?: string;
  game_id?: string;
}

interface UserInfoData {
  urId: string;
  urNm: string;
  bl: string;
  avIn: any;
  operatorId: string;
}

// Interface for Socket Context Provider Props
interface SocketContextProviderProps {
  children: ReactNode;
}

// Interface for Socket Context
interface SocketContextValue {
  socket: Socket | null;
  userInfo: UserInfoData | null;
  isLoading: boolean;
  multiplierArray: string[];
  increaseBalance: (amount: number) => void;
  decreaseBalance: (amount: number) => void;
  token: string;
}

export const SocketContext = createContext<SocketContextValue | undefined>(
  undefined
);

// Function to create a socket instance
export const createSocket = (id: string, gameId?: string): Socket => {
  return io(URL, {
    transports: ["websocket"],
    query: {
      game_id: gameId,
      token: id,
    },
  });
};

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [multiplierArray, setMultiplierArray] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfoData>({
    urId: "",
    urNm: "",
    bl: "0",
    avIn: null,
    operatorId: "",
  });
  const [token, setToken] = useState("");

  useEffect(() => {
    const rawQuery = window.location.search.substring(1);
    const decodedQuery = decodeURIComponent(rawQuery);
    let queryParams: QueryParams = {};
    setIsLoading(true);

    try {
      queryParams = JSON.parse(
        '{"' + decodedQuery.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        (key, value) => (key === "" ? value : decodeURIComponent(value))
      ) as QueryParams;

      // console.log("Parsed query parameters:", queryParams);
    } catch (error) {
      console.error("Error parsing query parameters:", error);
    }
    // console.log(queryParams);

    if (queryParams.id) {
      const socketInstance = createSocket(queryParams.id, queryParams.game_id);
      setSocket(socketInstance);
      setToken(queryParams?.id);

      if (socketInstance) {
        socketInstance.emit("action", "io");

        socketInstance.on("infoResponse", (data) => {
          if (data) {
            // console.log(data.info.urId)
            setUserInfo(data.info);
            setMultiplierArray(data.betArray);

            console.log(data);
          }
        });
      }

      console.log("Socket instance created:", socketInstance);
      setIsLoading(false);

      return () => {
        socketInstance.disconnect();
        console.log("Socket instance disconnected");
      };
    }
  }, []); // Run only once on component mount

  const increaseBalance = (amount: number) => {
    setUserInfo((prev) => ({
      ...prev,
      bl: (parseFloat(prev.bl) + amount).toFixed(2),
    }));
  };

  const decreaseBalance = (amount: number) => {
    setUserInfo((prev) => ({
      ...prev,
      bl: Math.max(0, parseFloat(prev.bl) - amount).toFixed(2),
    }));
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        userInfo,
        increaseBalance,
        decreaseBalance,
        multiplierArray,
        isLoading,
        token,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useBackground must be used within a BackgroundClassProvider"
    );
  }
  return context;
};
