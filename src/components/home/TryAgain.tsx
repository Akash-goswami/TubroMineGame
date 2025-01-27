import { useState } from "react";
import "./TryAgain.css";
const TryAgain = () => {
  const [tryAgain, setTryAgain] = useState<boolean>(true);
  return (
    <div className={`popup  _again _show ${tryAgain ? "_show" : ""}`}>
      <div className="popup__wrapper">
        <div data-winamount="Try Again" className="popup__text">
          Try Again
        </div>
      </div>
    </div>
  );
};

export default TryAgain;
