import React, { createContext, useContext, useEffect, useState } from "react";
import { BackGround } from "../components/canvas/background/background";
import { useSocket } from "./socket/socketProvider";

interface BackgroundContextProps {
  backgroundClass: BackGround | null;
  setBackgroundClass: (background: BackGround | null) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  playTime: number;
  setPlayTime: (time: number) => void;
  activeComponent: string;
  setActiveComponent: (component: string) => void;
  history: any[];
  showComponent: boolean;
  BetsHistory: () => void;
  betInfoIndex: number;
  setBetInfoIndex: (index: number) => void;
  winMultiplayer: number;
  setWinMultiplayer: (value: number) => void;
  exitPopOpen: boolean;
  setExitPopOpen: (open: boolean) => void;
  exitPopOpenAnimation: boolean;
}

const BackgroundContext = createContext<BackgroundContextProps | undefined>(
  undefined
);

export const BackgroundClassProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [backgroundClass, setBackgroundClass] = useState<BackGround | null>(
    null
  );
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [playTime, setPlayTime] = useState<number>(0); // Timer in seconds
  const [activeComponent, setActiveComponent] = useState<string>("menu"); // Track active component
  const [history, setHistory] = useState<any[]>([]);
  const [showComponent, setShowComponent] = useState(false);
  const [betInfoIndex, setBetInfoIndex] = useState(0);
  const [winMultiplayer, setWinMultiplayer] = useState<number>(0);
  const [exitPopOpen, setExitPopOpen] = useState(false);
  const [exitPopOpenAnimation, setExitPopOpenAnimation] = useState(false);
  useEffect(() => {
    if (exitPopOpen === true) {
      setTimeout(() => {
        setExitPopOpenAnimation(true);
      }, 300);
    } else {
      setExitPopOpenAnimation(false);
    }
  }, [exitPopOpen]);

  const { userInfo } = useSocket();
  const BetsHistory = () => {
    if (userInfo?.urId) {
      fetch(`${import.meta.env.VITE_BETS_URL}?userId=${userInfo.urId}`)
        .then((response) => response.json())
        .then((data) => {
          setHistory(data.history);
          console.log("activeComponent", data.history);
        })
        .catch((error) => {
          console.error("Error fetching active component:", error);
        });
    }
  };

  useEffect(() => {
    if (userInfo) {
      BetsHistory();
    }
  }, [userInfo]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setPlayTime((prev) => prev + 1); // Increment play time by 1 second
    }, 1000);

    return () => clearInterval(timerInterval); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    let timer: any;

    if (menuOpen) {
      // Start timer when menu is opened
      timer = setTimeout(() => {
        setShowComponent(true);
      }, 800);
    } else {
      // Reset the component when menu is closed
      setShowComponent(false);
    }

    // Cleanup the timer to prevent memory leaks
    return () => clearTimeout(timer);
  }, [menuOpen]);

  return (
    <BackgroundContext.Provider
      value={{
        backgroundClass,
        setBackgroundClass,
        menuOpen,
        setMenuOpen,
        playTime,
        setPlayTime,
        activeComponent,
        setActiveComponent,
        history,
        showComponent,
        BetsHistory,
        betInfoIndex,
        setBetInfoIndex,
        winMultiplayer,
        setWinMultiplayer,
        exitPopOpen,
        setExitPopOpen,
        exitPopOpenAnimation,
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error(
      "useBackground must be used within a BackgroundClassProvider"
    );
  }
  return context;
};
