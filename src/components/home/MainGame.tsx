import React, { useState, useEffect } from "react";
import "./MainGame.css";
import { tileClickSound ,blueDimondSound ,GreenDimondSound, BombBlastSound, GoldDimondSound } from "../../utils/gameSettings";
import { BlastImg01, BlastImg02, BlastImg03,BlastImg04, BlastImg05,
  BlastImg06, BlastImg07, BlastImg08, BlastImg09, BlastImg10,
  BlastImg11, BlastImg12, BlastImg13, BlastImg14, BlastImg15, } from "../../Index";
import { useMainGameContext } from "../../context/MainGameContext";
import { useSound } from "../../context/soundContext";

const images: string[] = [
  BlastImg01, BlastImg02, BlastImg03, BlastImg04, BlastImg05,
  BlastImg06, BlastImg07, BlastImg08, BlastImg09, BlastImg10,
  BlastImg11, BlastImg12, BlastImg13, BlastImg14, BlastImg15,
];

const MainGame: React.FC = () => {
  const {
    isGameStarted,
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
    loadingTileIndex, setLoadingTileIndex,
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



  const getTileClass = (index: number): string => {

    if (loadingTileIndex === index) {
      return "_loading"; // Apply loading class to the clicked tile only
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
        return "_bomb"; // Bomb class for all bomb tiles
      }
    }
    return "";
  };
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

  const handleTileClick = (index: number): void => {
    if (sound) {
      tileClickSound();
      setTimeout(() => {
      if(index < 4) {
        blueDimondSound()
      }else if(index >= 4 && index < 7){
        GreenDimondSound()
      }
      // else if(index >= 7 && index < 20){
      //   GoldDimondSound()
      // }
      else{
        BombBlastSound()
      }
      }, 200);
    }
    if (clickedTiles[index] || isAllTilesDisabled) return; // Prevent clicking already clicked tiles or disabled tiles
  
    setLoadingTileIndex(index); // Set the clicked tile index to show the loading state
    setIsLoading(true)
  
  // After a short delay, reset loading state
  setTimeout(() => {
    setLoadingTileIndex(null); // Reset the loading state after the delay
    setIsLoading(false)
  },100);
    // Mark the clicked tile and start animation for the blast image
    setClickedIndex(index);
    setCurrentImageIndex(0);
    setIsAnimationComplete(false);
  
    setClickedTiles((prevTiles) => {
      const updatedTiles = [...prevTiles];
      updatedTiles[index] = true; // Mark this tile as clicked
  
      // Save the updated tiles to local storage
      localStorage.setItem("clickedTiles", JSON.stringify(updatedTiles));
      return updatedTiles;
    });
  
    // If bomb tile is clicked, clear local storage and disable all tiles
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
      // Keep tiles visible for 3 seconds, then reset the game
      setTimeout(() => {
        resetGame(); // Reset the game state after 3 seconds
      }, 3000); // 3-second delay before resetting
    }
  };
  
  
  
  // Clear bombClicked and reset the game if the user refreshes
  useEffect(() => {
    const bombClicked = localStorage.getItem("bombClicked");
  
    if (bombClicked) {
      setTimeout(() => {
        localStorage.removeItem("clickedTiles");
        localStorage.removeItem("bombClicked"); 
        setIsAllTilesDisabled(true); 
        resetGame();
      }, 100); // Delay for 100ms
    }
  }, []);
  



  const shouldShowBlastImage = (index: number): boolean => {
    return (
      clickedTiles[index] &&
      getTileClass(index) === "_bomb" &&
      index === clickedIndex && // Only animate the clicked bomb
      !isAnimationComplete
    );
  };
  useEffect(() => {
    const savedTiles = localStorage.getItem("clickedTiles");
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
      <div className="game">
        <div className={`game__grid
          ${tileValue === 9 && "_3x3"}
          ${tileValue === 25 && "_5x5"}
          ${tileValue === 49 && "_7x7"}
          ${tileValue === 81 && "_9x9"}
          ${isGameStarted ? "" : "_disabled"}`}>
          {[...Array(tileValue)].map((_, index) => (
            <div
              key={index}
              className={`game__item ${getTileClass(index)} ${
                isAllTilesDisabled && !clickedTiles[index] ? "gameOver_disabled" : ""
              }`}
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
      </div>
    </div>
  );
};

export default MainGame;
