import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useBackground } from "../../context/backgroundClassProvider";
import { RiErrorWarningLine } from "react-icons/ri";
import "./MyBets.css";
import "./Loding.css";

const Loader = () => (
  <div className="loading-container">
    <div className="spinner"></div>
    <div className="loading-text">Loading...</div>
  </div>
);

const MyBets: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loader state
  const {
    setActiveComponent,
    setMenuOpen,
    menuOpen,
    history,
    BetsHistory,
    setBetInfoIndex,
    setWinMultiplayer,
  } = useBackground();

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

  useEffect(() => {
    setIsLoading(true); // Start loader
    BetsHistory();
    setTimeout(() => setIsLoading(false), 200); // Simulate delay or wait for data fetching
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setActiveComponent("menu");
  };

  if (isLoading) {
    return <Loader />; // Show loader if loading
  }

  return (
    <div className="MyBets-container">
      <div>
        <div className="Rules-container-header">
          <span
            className="zoomIcon"
            onClick={() => setActiveComponent("menu")}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              fontSize: "24px",
            }}
          >
            <IoIosArrowBack />
            <span
              style={{
                fontSize: "14px",
              }}
            >
              Back
            </span>
          </span>
          <div>My Bets</div>
          <RxCross2 onClick={toggleMenu} className="rules-cross" />
        </div>
        <div className="main-bet-panel">
          <div className="bet-table">
            {history && history.length > 0 && (
              <div className="bet-table-header">
                <h4 className="bet-table-header-item01">Time</h4>
                <h4 className="bet-table-header-item02">Bet Amount</h4>
                <h4 className="bet-table-header-item03">Multiplier</h4>
                <h4 className="bet-table-header-item04">Payout</h4>
                <h4 className="bet-table-header-item04"></h4>
              </div>
            )}

            <div className="bet-table-body">
              {history && history.length > 0 ? (
                history.map((item, index) => (
                  <ul
                    key={index}
                    className="bet-table-row"
                    onClick={() => {
                      setActiveComponent("betInfo");
                      setBetInfoIndex(index);
                      setWinMultiplayer(Number(item.multiplier));
                    }}
                  >
                    <li className="bet-table-row-item01">
                      {new Date(item.timestamp)
                        .toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .replace(/^(\d):/, "0$1:")}
                    </li>
                    <li>{item.betAmount}</li>
                    <li>{item.result === "won" ? item.multiplier : "-"}</li>
                    <li
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {item.winAmount.toFixed(2)}
                    </li>
                    <li>
                      <RiErrorWarningLine
                        className="error-icon"
                        style={{
                          fontSize: "24px",
                          marginTop: "5px",
                        }}
                      />
                    </li>
                  </ul>
                ))
              ) : (
                <div className="no-data-message">
                  {history
                    ? "No history available."
                    : "Not connected. Please connect to view your bet history."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="myBets-footer"
        style={{
          fontSize: "10px",
          padding: "0px 10px",
        }}
      >
        <div>PumpedX | Version: "1.0.0"</div>
        <div>
          {`${new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
            .format(new Date())
            .replace(
              /(\d{2}) (\w{3}) (\d{4})/,
              "$1 $2, $3"
            )} | ${new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}`}
        </div>
      </div>
    </div>
  );
};

export default MyBets;
