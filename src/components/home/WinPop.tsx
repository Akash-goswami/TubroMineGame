import { useEffect, useState } from "react";
import "./WinPop.css";

interface WinPopProps {
  multiplier: number;
  bank: number;
  wonAmount: number;
}

const WinPop = ({ multiplier, wonAmount }: WinPopProps) => {
  const [winPopColor, setWinPopColor] = useState<string>("blue");
  const [animate, setAnimate] = useState<boolean>(false);

  // Function to determine color based on multiplier
  const getBackgroundGradient = (multiplier: number): string => {
    if (multiplier <= 2.0) {
      return "blue";
    } else if (multiplier > 2.0 && multiplier <= 10.0) {
      return "green";
    } else if (multiplier > 10.0 && multiplier <= 20.0) {
      return "yellow";
    } else {
      return "purple"; // Default case
    }
  };

  // Set the winPopColor once on component mount
  useEffect(() => {
    const color = getBackgroundGradient(multiplier);
    setWinPopColor(color);
    // console.log("ullala", wonAmount);
  }, []); // Run only once

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="win-pop">
      <div
        className={`win-pop-wrapper ${
          animate ? "win-pop-wrapper-animation" : ""
        } win-pop-wrapper-${winPopColor}`}
      >
        <div className={`win-pop-info win-pop-info-${winPopColor}`}>
          <div className="win-pop-info-text" data-winamount="You win!">
            You win!
            <span className="popup__text-clip">You win!</span>
          </div>
          <div
            className="popup__coef"
            style={{
              color:
                winPopColor === "purple"
                  ? "#C272FF"
                  : winPopColor === "green"
                  ? "#005D22"
                  : winPopColor === "yellow"
                  ? "#7e7a06"
                  : "#006685",
            }}
          >
            x{multiplier}
          </div>
          <div
            data-winamount={`${wonAmount.toFixed(2)}`}
            className="popup__winamount"
            style={{
              color:
                winPopColor === "purple"
                  ? "#C272FF"
                  : winPopColor === "green"
                  ? "#19B953"
                  : winPopColor === "yellow"
                  ? "#fbf300"
                  : "#08b1e4",
            }}
          >
            {wonAmount.toFixed(2)}
          </div>
        </div>
        <div
          className={`win-pop-Trofi-image ${
            winPopColor === "green" && "greenTop"
          }
          ${winPopColor === "yellow" && "yellowTop"}
          ${winPopColor === "purple" && "purpleTop"}
          `}
        >
          {winPopColor === "green" && (
            <img src="../MenuImages/WinTrofiTwo.svg" alt="WinPop360" />
          )}
          {winPopColor === "yellow" && (
            <img src="../MenuImages/WinTrofiThree.svg" alt="WinPop360" />
          )}
          {winPopColor === "purple" && (
            <img src="../MenuImages/WinTrofiFour.svg" alt="WinPop360" />
          )}
        </div>
      </div>
    </div>
  );
};

export default WinPop;
