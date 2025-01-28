import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the shape of the context value
interface MainGameContextType {
  isGameStarted: boolean;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  tileValue: number;
  setTileValue: React.Dispatch<React.SetStateAction<number>>;
  clickedTiles: boolean[];
  setClickedTiles: React.Dispatch<React.SetStateAction<boolean[]>>;
  clickedIndex: number | null;
  setClickedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  isAnimationComplete: boolean;
  setIsAnimationComplete: React.Dispatch<React.SetStateAction<boolean>>;
  isAllTilesDisabled: boolean;
  setIsAllTilesDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loadingTileIndex: number | null;
  setLoadingTileIndex: React.Dispatch<React.SetStateAction<number | null>>;
  resetGame: () => void;
}

// Create the context with a default value
const MainGameContext = createContext<MainGameContextType | undefined>(undefined);

// Create the provider component
interface MainGameProviderProps {
  children: ReactNode;
}

export const MainGameProvider: React.FC<MainGameProviderProps> = ({ children }) => {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(true);
  const [tileValue, setTileValue] = useState<number>(9);
  const [clickedTiles, setClickedTiles] = useState<boolean[]>(() => {
    const savedTiles = localStorage.getItem("clickedTiles");
    return savedTiles ? JSON.parse(savedTiles) : Array(tileValue).fill(false);
  });
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false);
  const [isAllTilesDisabled, setIsAllTilesDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingTileIndex, setLoadingTileIndex] = useState<number | null>(null);

  // Save clickedTiles to localStorage when clickedTiles state changes
  useEffect(() => {
    localStorage.setItem("clickedTiles", JSON.stringify(clickedTiles));
  }, [clickedTiles]);
  
  const resetGame = () => {
    setTimeout(() => {
      setClickedTiles(Array(tileValue).fill(false)); // Reset clicked tiles
      setClickedIndex(null); // Reset clicked index
      setCurrentImageIndex(0); // Reset animation index
      setIsAnimationComplete(false); // Reset animation state
      setIsAllTilesDisabled(false); // Enable all tiles again
      setIsGameStarted(false); // Reset the game start state
  
      // Clear local storage during game reset
      localStorage.clear();
    }, 3000); // 3 seconds delay
  };

  return (
    <MainGameContext.Provider
      value={{
        isGameStarted,
        setIsGameStarted,
        tileValue,
        setTileValue,
        clickedTiles,
        setClickedTiles,
        clickedIndex,
        setClickedIndex,
        currentImageIndex,
        setCurrentImageIndex,
        isAnimationComplete,
        setIsAnimationComplete,
        isAllTilesDisabled,
        setIsAllTilesDisabled,
        isLoading,
        setIsLoading,
        loadingTileIndex,
        setLoadingTileIndex,
        resetGame
      }}
    >
      {children}
    </MainGameContext.Provider>
  );
};

// Custom hook to use the context in functional components
export const useMainGameContext = (): MainGameContextType => {
  const context = useContext(MainGameContext);
  if (!context) {
    throw new Error('useMainGameContext must be used within a MainGameProvider');
  }
  return context;
};
