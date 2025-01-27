import { useEffect, useState } from "react";
import { IoIosFemale, IoIosMale } from "react-icons/io";
import { useBackground } from "../../context/backgroundClassProvider";
import { useSound } from "../../context/soundContext";
import { playToggleSound } from "../../utils/gameSettings";
import styles from "./TogaleGanderChange.module.css";

interface TogaleGanderChangeProps {
  currentPlayer: string;
  setCurrentPlayer: (value: string) => void;
  showNotification: boolean;
  setShowNotification: (value: boolean) => void;
}

const TogaleGanderChange = ({
  currentPlayer,
  setCurrentPlayer,
  showNotification,
  setShowNotification,
}: TogaleGanderChangeProps) => {
  const [isMale, setIsMale] = useState<boolean>(currentPlayer === "boy");
  const { backgroundClass } = useBackground();
  const { sound } = useSound();

  useEffect(() => {
    setIsMale(currentPlayer === "boy");
  }, [currentPlayer]);

  const handleToggleChange = () => {
    const nextIsMale = !isMale; // Toggle the state

    if (!showNotification) {
      setShowNotification(true);
    }

    if (sound) {
      playToggleSound();
    }

    setIsMale(nextIsMale);
    setCurrentPlayer(nextIsMale ? "boy" : "girl");
    backgroundClass?.switchCharacter(nextIsMale ? "boy" : "girl");
  };

  return (
    <div className={styles.togaleGander}>
      <IoIosMale
        style={{
          cursor: "pointer",
        }}
        className={`${styles.genderIcon} ${isMale ? styles.active : ""}`}
        onClick={handleToggleChange}
        // disabled={}
      />
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={!isMale} // Controlled input
          onChange={handleToggleChange}
        />
        <span className={styles.slider}></span>
      </label>
      <IoIosFemale
        className={`${styles.genderIcon} ${!isMale ? styles.active : ""}`}
        style={{ rotate: "314deg", cursor: "pointer" }}
        onClick={handleToggleChange}
      />
    </div>
  );
};

export default TogaleGanderChange;
