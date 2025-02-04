import React, { useState, useEffect } from "react";
import "./MainGame.css";
import { tileClickSound, blueDimondSound, GreenDimondSound, BombBlastSound, GoldDimondSound } from "../../utils/gameSettings";
import {
  BlastImg01, BlastImg02, BlastImg03, BlastImg04, BlastImg05,
  BlastImg06, BlastImg07, BlastImg08, BlastImg09, BlastImg10,
  BlastImg11, BlastImg12, BlastImg13, BlastImg14, BlastImg15,
} from "../../Index";
import { useMainGameContext } from "../../context/MainGameContext";
import { useSound } from "../../context/soundContext";
import { FaL } from "react-icons/fa6";

const images: string[] = [
  BlastImg01, BlastImg02, BlastImg03, BlastImg04, BlastImg05,
  BlastImg06, BlastImg07, BlastImg08, BlastImg09, BlastImg10,
  BlastImg11, BlastImg12, BlastImg13, BlastImg14, BlastImg15,
];

const MainGame: React.FC = () => {
  const { setAleartPop } = useMainGameContext();
  const [isShowPop , setIsShowPop] = useState<Boolean>(false)
  const {
    isGameStarted,
    gameStatus,
    tileValue,
    clickedTiles,
    setClickedTiles,
    isLoading,
    setIsLoading,
    setIsGameStarted,
    clickedIndex, setClickedIndex,
    currentImageIndex, setCurrentImageIndex,
    isAnimationComplete, setIsAnimationComplete,
    isAllTilesDisabled, setIsAllTilesDisabled,
    loadingTileIndex, setLoadingTileIndex, setTileClick,
    setGameStatus
  } = useMainGameContext();
  const { sound } = useSound();

  useEffect(() => {
    let interval: any;
    if (clickedIndex !== null) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          if (prevIndex < images.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(interval);
            setIsAnimationComplete(true);
            return prevIndex;
          }
        });
      }, 40);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [clickedIndex]);

  const ShowPopStartGame = () => {
    console.log("hello i am aleart")
    setIsShowPop(true)
    setTimeout(() => {
      setIsShowPop(false)
    }, 800);
  }


  const getTileClass = (index: number): string => {

    if (loadingTileIndex === index) {
      return "_loading";
    }

    if (clickedTiles[index]) {
      if (index < 4) {
        return "_diamondBlue";
      } else if (index >= 4 && index < 7) {
        return "_diamondGreen";
      }
      //  else if (index >= 7 && index < 20) {
      //   return "_diamondGold";
      // }
      else {
        return "_bomb";
      }
    }
    return "";
  };
  const getTileStyle = (index: number): React.CSSProperties => {
    if (getTileClass(index) === "_bomb") {
      return {
        opacity: index === clickedIndex ? 1 : 0.5,
      };
    }
    return {};
  };

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

  const handleTileClick = (index: number): void => {
    setTileClick(true)
    if (sound) {
      tileClickSound();
      setTimeout(() => {
        if (index < 4) {
          blueDimondSound()
        } else if (index >= 4 && index < 7) {
          GreenDimondSound()
        }
        // else if(index >= 7 && index < 20){
        //   GoldDimondSound()
        // }
        else {
          setTileClick(false)
          setGameStatus(false)
          BombBlastSound()
        }
      }, 200);
    }
    if (clickedTiles[index] || isAllTilesDisabled) return;


    setLoadingTileIndex(index);
    setIsLoading(true)


    setTimeout(() => {
      setLoadingTileIndex(null);
      setIsLoading(false)
    }, 100);

    setClickedIndex(index);
    setCurrentImageIndex(0);
    setIsAnimationComplete(false);

    setClickedTiles((prevTiles) => {
      const updatedTiles = [...prevTiles];
      updatedTiles[index] = true;


      localStorage.setItem("clickedTiles", JSON.stringify(updatedTiles));
      return updatedTiles;
    });


    if (index >= 7) {
      console.log("Bomb tile clicked, clearing clickedTiles from localStorage...");
      localStorage.setItem("bombClicked", "true");
      setIsAllTilesDisabled(true);
      setClickedTiles((prevTiles) => {
        const updatedTiles = [...prevTiles];
        for (let i = 7; i < updatedTiles.length; i++) {
          updatedTiles[i] = true;
        }
        return updatedTiles;
      });

      setTimeout(() => {
        resetGame();
      }, 3000);
    }
  };



  useEffect(() => {
    const bombClicked = localStorage.getItem("bombClicked");
    if (bombClicked) {
      setTimeout(() => {
        localStorage.removeItem("clickedTiles");
        localStorage.removeItem("bombClicked");
        setIsAllTilesDisabled(true);
        resetGame();
      }, 100);
    }
  }, []);




  const shouldShowBlastImage = (index: number): boolean => {
    return (
      clickedTiles[index] &&
      getTileClass(index) === "_bomb" &&
      index === clickedIndex &&
      !isAnimationComplete
    );
  };
  useEffect(() => {
    const savedTiles = localStorage.getItem("clickedTiles");
    if (isGameStarted) {
      setAleartPop(true);
    }
    setTimeout(() => {
      setAleartPop(false);
    }, 3000);
    if (savedTiles) {
      setClickedTiles(JSON.parse(savedTiles));
    }
  }, []);
  useEffect(() => {
    const bombClicked = localStorage.getItem("bombClicked");
    console.log("Checking bombClicked flag on page load:", bombClicked);
    if (bombClicked === "true") {
      console.log("Bomb was clicked before refresh. Resetting the game...");
      resetGame();
      console.log("Game reset complete. Clearing bombClicked flag...");
      localStorage.removeItem("bombClicked");
    }
  }, []);

  return (
    <div className="template__game">
      <div className="game"         
       onClick={gameStatus === false ? ShowPopStartGame : undefined}>
        <div className={`game__grid
          ${tileValue === 9 && "_3x3"}
          ${tileValue === 25 && "_5x5"}
          ${tileValue === 49 && "_7x7"}
          ${tileValue === 81 && "_9x9"}
          ${gameStatus ? "" : "_disabled"}`}
          >
          {[...Array(tileValue)].map((_, index) => (
            <div
              key={index}
              className={`game__item ${getTileClass(index)} ${isAllTilesDisabled && !clickedTiles[index] ? "gameOver_disabled" : ""
                }`}
              style={getTileStyle(index)}
              onClick={() => handleTileClick(index)}
            >
              <div className="game__item-layout1">
                <div className="game__item-layout2">
                  {
                    !isLoading &&
                    <>
                      {shouldShowBlastImage(index) ? (
                        <div className="game__item-layout3_bomb">
                          <img
                            src={images[currentImageIndex]}
                            alt={`Blast Image ${currentImageIndex + 1}`}
                            className="animated__image"
                          />
                        </div>
                      ) : (
                        clickedIndex === index && !shouldShowBlastImage(index) && (
                          <div className="game__item-layout3"></div>
                        )
                      )}
                    </>
                  }
                  <div className="game__item-sum">$122</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {
          isShowPop && <>
           {
        !gameStatus &&
        <div className="start-alert"><div className="start-alert__alert">Please press Start Game</div></div>
        }
          </>
        }
       
      </div>
    </div>
  );
};

export default MainGame;
