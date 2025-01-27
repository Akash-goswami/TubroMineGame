import { useEffect, useState } from "react";
import HoldIcon from "../../../public/MenuImages/HoldIcon.svg";
import "./NotifiySleactGander.css";

interface NotifiySleactGanderProps {
  showIcon?: boolean;
}

const NotifiySleactGander = ({ showIcon }: NotifiySleactGanderProps) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(true);
  }, []);

  // const [showIcon, setShowIcon] = useState<boolean>(false);
  return (
    <div className={`notific ${show ? "_show" : ""}`} style={{transform: show ? "translateY(0)" : ""}}>
      <div className="notific__inner">
        {showIcon ? (
          <>
            <img src={HoldIcon} alt="gander" />
            <p>Hold "PUMP" to start the game</p>
          </>
        ) : (
          <p>Choose a character to start the game</p>
        )}
      </div>
    </div>
  );
};
export default NotifiySleactGander;
