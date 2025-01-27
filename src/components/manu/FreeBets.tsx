import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useBackground } from "../../context/backgroundClassProvider";
import "./FreeBets.css";
// import { BsQuestionSquare } from "react-icons/bs";
// import { RiErrorWarningLine } from "react-icons/ri";

const FreeBets: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const { setActiveComponent, setMenuOpen, menuOpen } = useBackground();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(now);

      const formattedTime = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setCurrentDateTime(`${formattedDate} | ${formattedTime}`);
    };

    updateDateTime();

    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setActiveComponent("menu");
  };

  return (
    <div className="freebets-container">
      <div className="Rules-container-header">
        <IoIosArrowBack
          onClick={() => setActiveComponent("menu")}
          style={{ cursor: "pointer" }}
        />
        <div>My Bets</div>
        <RxCross2 onClick={toggleMenu} className="rules-cross" />
      </div>
      <div className="main-bet-panel">
        <h2>This is nothing here yet</h2>
      </div>
      <div>
        <div className="footer-container">
          <div>Turbo Games PumpedX</div>
          <div>
            {`${new Intl.DateTimeFormat("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).format(new Date())} | ${new Date().toLocaleTimeString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeBets;
