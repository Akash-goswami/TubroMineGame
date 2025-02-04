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
  tileClick: boolean;
  aleartPop: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTileClick: React.Dispatch<React.SetStateAction<boolean>>;
  setAleartPop: React.Dispatch<React.SetStateAction<boolean>>;
  loadingTileIndex: number | null;
  setLoadingTileIndex: React.Dispatch<React.SetStateAction<number | null>>;
  resetGame: () => void;
  gridSelected: string | null;
  setGridSelected: React.Dispatch<React.SetStateAction<string| null>>;
  mines: string;
  setMines: React.Dispatch<React.SetStateAction<string>>;
  betAmount: number;
  setBetAmount: React.Dispatch<React.SetStateAction<number>>;
  gameStatus: boolean;
  setGameStatus: React.Dispatch<React.SetStateAction<boolean>>;
}


const MainGameContext = createContext<MainGameContextType | undefined>(undefined);


interface MainGameProviderProps {
  children: ReactNode;
}

export const MainGameProvider: React.FC<MainGameProviderProps> = ({ children }) => {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(true);
  const [tileValue, setTileValue] = useState<number>(81);
  const [clickedTiles, setClickedTiles] = useState<boolean[]>(() => {
    const savedTiles = localStorage.getItem("clickedTiles");
    return savedTiles ? JSON.parse(savedTiles) : Array(tileValue).fill(false);
  });
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false);
  const [isAllTilesDisabled, setIsAllTilesDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tileClick, setTileClick] = useState<boolean>(false);
  const [aleartPop, setAleartPop] = useState<boolean>(false);
  const [loadingTileIndex, setLoadingTileIndex] = useState<number | null>(null);
  // betPanel states
  const [gridSelected, setGridSelected] =useState<string| null>('')
  const [mines, setMines] = useState("3");
  const [betAmount, setBetAmount] = useState<number>(10);
  const [gameStatus, setGameStatus] = useState<boolean>(false);
  console.log("this is my tile click value as true and false ",tileClick);
  

  useEffect(() => {
  if(gridSelected == "3x3"){
    setTileValue(9)
  }else if(gridSelected == "5x5"){
    setTileValue(25)
  }else if(gridSelected == "7x7"){
      setTileValue(49)
  }
  else if(gridSelected == "9x9"){
        setTileValue(81)
  }
},[gridSelected])

  useEffect(() => {
    localStorage.setItem("clickedTiles", JSON.stringify(clickedTiles));
  }, [clickedTiles]);
  
  const resetGame = () => {
    setTimeout(() => {
      setClickedTiles(Array(tileValue).fill(false)); 
      setClickedIndex(null); 
      setCurrentImageIndex(0); 
      setIsAnimationComplete(false); 
      setIsAllTilesDisabled(false); 
      setIsGameStarted(false); 
  
      
      localStorage.clear();
    }, 3000); 
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
        resetGame,
        aleartPop,
        setAleartPop,
        gridSelected,
        setGridSelected,
        mines,
        setMines,
        betAmount,
        setBetAmount,
        gameStatus,
        setGameStatus,
        tileClick,
        setTileClick
      }}
    >
      {children}
    </MainGameContext.Provider>
  );
};


export const useMainGameContext = (): MainGameContextType => {
  const context = useContext(MainGameContext);
  if (!context) {
    throw new Error('useMainGameContext must be used within a MainGameProvider');
  }
  return context;
};
