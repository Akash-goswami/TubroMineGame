import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useBackground } from "../../context/backgroundClassProvider";
import "./MyBets.css";
import "./BetInfo.css";
import { useSocket } from "../../context/socket/socketProvider";
import { BlastImg01, BlastImg02, BlastImg03, BlastImg04, BlastImg05, BlastImg06, BlastImg07, BlastImg08, BlastImg09, BlastImg10, BlastImg11, BlastImg12, BlastImg13, BlastImg14, BlastImg15 } from "../../Index";

const BetInfo: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [relodeText, setRelodeText] = useState<number>(0);
  const [intervalId, setIntervalId] = useState(0);
  const [relodHit, setRelodHit] = useState(true);
  const { userInfo } = useSocket();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imgesShow , setImgesShow] = useState(true);
  const [hasIntervalSet, setHasIntervalSet] = useState(false);


  const images: string[] = [
    BlastImg01, BlastImg02, BlastImg03, BlastImg04, BlastImg05,
    BlastImg06, BlastImg07, BlastImg08, BlastImg09, BlastImg10,
    BlastImg11, BlastImg12, BlastImg13, BlastImg14, BlastImg15,
  ];

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
  const clickRelode = () => {
    setRelodHit(false);
    setTimeout(() => {
      setRelodHit(true);
    }, 300);  // THIS TIME TO TILES APPER TIMER
    setTimeout(() => {
      setImgesShow(true)
    }, 600);
  };
  useEffect(() => {
    console.log('hello')
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        if (newIndex === 0) {
          setImgesShow(false);
        }
        return newIndex;
      });
    }, 30);
    return () => clearInterval(intervalId);
  }, []);
  


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

  const gameItems = [
    { id: 1, type: "" },
    { id: 2, type: "" },
    { id: 3, type: "" },
    { id: 4, type: relodHit ? "_bomb" : "" },
    { id: 5, type: "" },
    { id: 6, type: "" },
    { id: 7, type: relodHit ? "_diamondBlue" : "" },
    { id: 8, type: "" },
    { id: 9, type: relodHit ? "_diamondBlue" : "" },
    { id: 10, type: "" },
    { id: 11, type: "" },
    { id: 12, type: relodHit ? "_diamondBlue" : "" },
    { id: 13, type: relodHit ? "_diamondBlue" : "" },
    { id: 14, type: "" },
    { id: 15, type: relodHit ? "_diamondBlue" : "" },
    { id: 16, type: "" },
    { id: 17, type: "" },
    { id: 18, type: relodHit ? "_bomb" : "" },
    { id: 19, type: "" },
    { id: 20, type: "" },
    { id: 21, type: relodHit ? "_bomb" : "" },
    { id: 22, type: "" },
    { id: 23, type: "" },
    { id: 24, type: "" },
    { id: 25, type: "" },
  ];
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
                        <div className="render__side">
                          <div className="render__bomb"></div>
                          <div className="render__count">3</div>
                        </div>
                        <div className="render__grid">
                          <div className="game">
                            <div className="game__grid _disabled _5x5">
                              {gameItems.map((item) => (
                                <div
                                  key={item.id}
                                  className={`game__item ${item.type}`}
                                  style={{
                                    opacity: item.type === "_bomb" ? "1" : "",
                                    pointerEvents:'none'
                                  }}
                                >
                                  <div className="game__item-layout1">
                                    <div className="game__item-layout2"></div>
                                    {
                                      imgesShow && 
                                      <>
                                      {item.type === "_bomb" && (
                                      <div className="game__item-layout3_bomb">
                                      <img
                                        src={images[currentImageIndex]}
                                        alt={`Blast Image`}
                                        className="animated__image"
                                      />
                                    </div>
                                    )}
                                      </>
                                    }
                                    
                                    {item.type === "_diamondBlue" && (
                                      <div className="game__item-layout3"></div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="render__side">
                          <div className="render__crystal"></div>
                          <div className="render__count">22</div>
                        </div>
                        <div className="render__reload" onClick={clickRelode}>
                          <i className="fm-iconFont fm-iconFont-ios-reload"></i>
                        </div>
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
          fontSize: "10px",
          padding: "0px 10px",
        }}
      >
        <div>TubroMines | Version: "1.0.3"</div>
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
