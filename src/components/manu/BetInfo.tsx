import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useBackground } from "../../context/backgroundClassProvider";
import "./MyBets.css";
import "./BetInfo.css";
import { FaRegCopy } from "react-icons/fa";
import CopyIcon from "/MenuImages/cursor.png";
import CopyIconColor from "/MenuImages/cursor_copy.png";
import { useSocket } from "../../context/socket/socketProvider";

const BetInfo: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [relodeText, setRelodeText] = useState<number>(0);
  const [intervalId, setIntervalId] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const { userInfo } = useSocket();

  const {
    setActiveComponent,
    setMenuOpen,
    menuOpen,
    history,
    BetsHistory,
    betInfoIndex,
    winMultiplayer,
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setActiveComponent("menu");
  };

  const currentBet = history[betInfoIndex];

  const startLoop = () => {
    let index = 0;
    const newIntervalId = setInterval(() => {
      const roundedIndex = Math.round(index * 100) / 100;
      // @ts-ignore
      setRelodeText(roundedIndex.toFixed(2));
      if (roundedIndex >= winMultiplayer) {
        clearInterval(newIntervalId);
        setIntervalId(0);
      }

      index += 0.01; // Increment by 0.01
    }, 5);

    setIntervalId(newIntervalId);
  };

  useEffect(() => {
    startLoop();
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentBet.matchId);
    setIsClicked(true); // Change the state to trigger the color change
    setTimeout(() => {
      setIsClicked(false); // Reset the state after 200ms
    }, 200);
  };
  const getBackgroundGradient = (multiplier: number) => {
    if (multiplier <= 2.0) {
      return "linear-gradient(0deg, #0094cc 7.97%, #45deff 65.49%)";
    } else if (multiplier > 2.0 && multiplier <= 10.0) {
      return "linear-gradient(0deg, #00cc4e 7.97%, #45ff7d 65.49%)";
    } else if (multiplier > 10.0 && multiplier <= 20.0) {
      return "linear-gradient(0deg, #ccb800 7.97%, #ffe845 65.49%)";
    } else {
      return "linear-gradient(0deg, #9000cc 7.97%, #d445ff 65.49%)"; // Default case
    }
  };
  return (
    <div className="BetsInfo-container">
      <div>
        <div className="Rules-container-header">
          <span
            className="zoomIcon"
            onClick={() => setActiveComponent("mybets")}
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
          <div>Bet Details</div>
          <RxCross2 onClick={toggleMenu} className="rules-cross" />
        </div>
        <div
          style={{
            marginBottom: "90px",
          }}
        >
          {currentBet ? (
            <div className="render--qVO7q">
              <div className="renderInner--hJzCl">
                <div className="flex-bets">
                  <div className="renderTop--B0CbT">
                    <div className="renderItem--duTq7">
                      <div className="copy--bqTd0">
                        <div className="group--_Qt7D">
                          <div className="groupTitle--WYkjE">Game ID</div>
                          <div className="groupValue--J1GQW">
                            {currentBet.matchId}
                          </div>
                        </div>
                        {/* <div
                          className="copyIcon--CPvN_"
                          onClick={handleCopy}
                          style={{
                            marginBottom: "8px",
                          }}
                        >
                          {isClicked ? (
                            <img
                              src={CopyIconColor}
                              alt="CopyIcon"
                              width="20px"
                            />
                          ) : (
                            <img
                              src={CopyIcon}
                              alt="CopyIconColor"
                              width="20px"
                            />
                          )}
                        </div> */}
                      </div>
                    </div>
                    <div
                      className={`renderItem--duTq7 renderP0--rEDpA ${
                        currentBet.result === "won" && "renderRed--RKEfP"
                      }`}
                    >
                      <div className="win--X3hjg">
                        {currentBet.result === "won" && (
                          <div className="winImage--DglLn"></div>
                        )}

                        <div className="winList--fG3Uu">
                          <div className="winItem--yrDYQ">
                            <div className="winTitle--qmCGW">
                              <span>Bet Amount</span>
                            </div>
                            <div className="winValue--wywh7 winUppercase--oeVWt">
                              <span>
                                {Number(currentBet.betAmount).toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <div className="winItem--yrDYQ">
                            <div className="winTitle--qmCGW">
                              <span>Multiplier</span>
                            </div>
                            <div className="winValue--wywh7">
                              <span>
                                {currentBet.result === "won" ? "x" : ""}

                                {currentBet.result === "won"
                                  ? currentBet.multiplier
                                  : "-"}
                              </span>
                            </div>
                          </div>
                          <div className="winItem--yrDYQ">
                            <div
                              className="winTitle--qmCGW"
                              style={{
                                color:
                                  currentBet.result === "won"
                                    ? "#ff003a"
                                    : undefined,
                              }}
                            >
                              <span>Payout</span>
                            </div>
                            <div
                              className="winValue--wywh7 winUppercase--oeVWt winRed--LJsnj"
                              style={{
                                color:
                                  currentBet.result === "won"
                                    ? "#ff003a"
                                    : undefined,
                              }}
                            >
                              <span>
                                {Number(currentBet.winAmount).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="renderBottom--GtgDa">
                    <div className="renderItem--duTq7">
                      <div className="group--_Qt7D">
                        <div className="groupTitle--WYkjE">Player ID</div>
                        <div className="groupValue--J1GQW">
                          {userInfo?.operatorId}:{currentBet.playerId}
                        </div>
                      </div>
                    </div>
                    <div className="row--Di5bb">
                      <div
                        className="col--Y1jDy"
                        style={{
                          flexGrow: 1,
                        }}
                      >
                        <div className="renderItem--duTq7">
                          <div className="group--_Qt7D">
                            <div className="groupTitle--WYkjE">Username</div>
                            <div className="groupValue--J1GQW">
                              {userInfo?.urNm}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col--Y1jDy">
                        <div className="renderItem--duTq7">
                          <div className="group--_Qt7D">
                            <div className="groupTitle--WYkjE">Date</div>
                            <div className="groupValue--J1GQW">
                              {new Date(currentBet.timestamp).toLocaleString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="renderCenter--l79UE">
                  <div className="game--tFxQP renderItem--duTq7 renderP0--rEDpA">
                    <div className="gameInner--WY6xt">
                      <div className="render">
                        <div className="render__characters _win">
                          {currentBet.result === "won" ? (
                            <img
                              src="/MenuImages/WinBoyImg.webp"
                              alt=""
                              className="imgBoy"
                            />
                          ) : (
                            <img
                              src="/MenuImages/BoyImg.webp"
                              alt=""
                              className="imgBoy"
                            />
                          )}

                          {currentBet.result === "won" ? (
                            <img
                              src="/MenuImages/WinGirlImg.webp"
                              alt=""
                              className="imgGirl"
                            />
                          ) : (
                            <img
                              src="/MenuImages/GirlImg.webp"
                              alt=""
                              className="imgGirl"
                            />
                          )}
                        </div>
                        <div className="render__info">
                          <div className="coefficient__bank">
                            {currentBet.result === "won" ? (
                              <span className="coefficient__bank-text">
                                Cash Out at:
                              </span>
                            ) : (
                              <span className="coefficient__bank-text">
                                Crashed at:
                              </span>
                            )}
                          </div>
                          <div className="coefficient__amount">
                            <span
                              // data-coef={currentBet.multiplier}
                              data-coef={relodeText}
                              className="coefficient__num"
                            >
                              {/* {currentBet.multiplier} */}
                              {relodeText}
                            </span>
                            <span data-x="x" className="coefficient__x _blue">
                              x
                              <span
                                className="coefficient__x-clip"
                                style={{
                                  backgroundImage:
                                    currentBet.result === "won"
                                      ? getBackgroundGradient(
                                          currentBet.multiplier
                                        )
                                      : "none", // or provide a default background style
                                }}
                              >
                                x
                              </span>
                            </span>
                          </div>
                        </div>
                        <div
                          className="render__reload"
                          onClick={startLoop}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>No data available for the selected bet.</p>
          )}
        </div>
      </div>
      <div
        className="myBets-footer"
        style={{
          fontSize: "12px",
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

export default BetInfo;
