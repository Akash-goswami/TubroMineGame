import { useEffect, useState } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { useSound } from "../../context/soundContext";
import { playToggleSound } from "../../utils/gameSettings";
import "./Slider.css";
import { useSocket } from "../../context/socket/socketProvider";
import ArrowIcon from "/MenuImages/leftArrow.webp";

interface SliderProps {
  setActiveBetAmount: (value: string) => void;
}

const Slider = ({ setActiveBetAmount }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { sound } = useSound();
  const { multiplierArray } = useSocket();

  // const [activeBetAmount, setActiveBetAmount] = useState("$0.1"); // Initialize with the first bet amount

  // Array of bet amounts
  const betAmounts = multiplierArray;
  //  [
  //   "1",
  //   "2",
  //   "3",
  //   "5",
  //   "1",
  //   "1.5",
  //   "2",
  //   "5",
  //   "10",
  //   "20",
  //   "50",
  //   "100",
  // ];

  useEffect(() => {
    //   // Set the first element of multiplierArray as the initial value of activeBetAmount
    if (multiplierArray.length > 0) {
      setActiveBetAmount(multiplierArray[currentIndex]);
    }
  }, [multiplierArray]);

  // Function to update the active bet amount
  const updateActiveBetAmount = (newIndex: number) => {
    setActiveBetAmount(betAmounts[newIndex]);
  };

  // Function to move to the next slide
  const goNext = () => {
    if (currentIndex < betAmounts.length - 1) {
      if (sound) {
        playToggleSound();
      }
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        updateActiveBetAmount(newIndex);
        return newIndex;
      });
    }
  };

  // Function to move to the previous slide
  const goPrev = () => {
    if (currentIndex > 0) {
      if (sound) {
        playToggleSound();
      }
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        updateActiveBetAmount(newIndex);
        return newIndex;
      });
    }
  };

  return (
    <div className="bet-amount">
      <button
        data-track="bet_1.minus_1"
        className="bet-amount__btn _prev"
        disabled={currentIndex === 0}
        style={{
          cursor: currentIndex === 0 ? "default" : "pointer",
          color: currentIndex === 0 ? "" : "#bdc9c8",
        }}
      >
        {/* <MdArrowLeft className="arrow-icon" onClick={goPrev} /> */}
        <img
          src={ArrowIcon}
          alt="ArrowIcon"
          className="arrow-icon"
          onClick={goPrev}
          style={{
            width: "24px",
          }}
        />
      </button>
      <div className="bet-amount__inner">
        <div
          className="bet-amount__inner-slider"
          style={{
            transform: `translateX(calc(13% - ${
              currentIndex * 3.75 + currentIndex * 1.9
            }rem))`,
            transition: "transform 0.3s ease",
          }}
        >
          {betAmounts.map((amount, index) => (
            <div
              key={index}
              className={`bet-amount__item ${
                currentIndex === index ? "_active" : ""
              }`}
            >
              <div>{amount}</div>
            </div>
          ))}
        </div>
      </div>
      <button
        data-track="bet_1.plus_1"
        className="bet-amount__btn _next"
        disabled={currentIndex === betAmounts.length - 1}
        style={{
          cursor:
            currentIndex === betAmounts.length - 1 ? "default" : "pointer",
          color: currentIndex === betAmounts.length - 1 ? "" : "#bdc9c8",
        }}
      >
        {/* <MdArrowRight className="arrow-icon" onClick={goNext} /> */}
        <img
          src={ArrowIcon}
          alt="ArrowIcon"
          onClick={goNext}
          style={{
            width: "24px",
            rotate: "180deg",
          }}
        />
      </button>
    </div>
  );
};

export default Slider;
