import { RiMenu4Line } from "react-icons/ri";
import Canvas from "../canvas/canvas";
// import PlayButton from "../manu/PlayButton";
import Slider from "../manu/Slider";
import TogaleGanderChange from "../manu/TogaleGanderChange";
import "./Home.css";
import "../manu/Loding.css";
import Rotate from "/MenuImages/Rotate.webp";

import { useEffect, useState } from "react";
import { GoUnmute } from "react-icons/go";
import NotifiySleactGander from "./NotifiySleactGander";
import TryAgain from "./TryAgain";
import WiningAmount from "./WiningAmount";

import { useBackground } from "../../context/backgroundClassProvider";
import { useSocket } from "../../context/socket/socketProvider";
import ParentComponent from "../manu/ParentComponent";
import WinPop from "./WinPop";
import { LiaWalletSolid } from "react-icons/lia";
import { useSound } from "../../context/soundContext";
import MainGame from "./MainGame";

interface HomeProps {
  shouldShowRotateImage: boolean;
}

const Home: React.FC<HomeProps> = ({ shouldShowRotateImage }) => {
  const [isGameRunning, setIsGameRunning] = useState<boolean>(true);
  const [showNotification, setShowNotification] = useState<boolean>(true);
  const [currentPlayer, setCurrentPlayer] = useState<string>("");
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [winingAmountAnimation, setWiningAmountAnimation] =
    useState<boolean>(true);
  const [multiplier, setMultiplier] = useState<number>(1.01); // State to store multiplier
  const [bank, setBank] = useState<number>(10.01);
  const [wonAmount, setWonAmount] = useState<number>(0);
  const [activeBetAmount, setActiveBetAmount] = useState(""); // Initialize with the first bet amount
  const [isWinPopUp, setIsWinPopUp] = useState<boolean>(false);
  const [tryAgainText, setTryAgainText] = useState(false);
  const [isClickedMute, setIsClickedMute] = useState(false);
  const [isClickedMenu, setIsClickedMenu] = useState(false);

  const { menuOpen, setMenuOpen, showComponent } = useBackground();
  const { userInfo, multiplierArray, isLoading, socket } = useSocket();
  const { sound, toggleMute } = useSound();

  const handleMenuOpen = () => {
    setIsClickedMenu(true);
    setMenuOpen(!menuOpen);
    setTimeout(() => {
      setIsClickedMenu(false);
    }, 200);
  };

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

  const IsclickChange = () => {
    setIsClickedMute(true);
    setTimeout(() => {
      setIsClickedMute(false);
      toggleMute();
    }, 200);
  };

  const IsmenuclickChange = () => {
    setIsClickedMenu(true);
    setTimeout(() => {
      setIsClickedMenu(false);
      handleMenuOpen();
    }, 200);
  };

  return (
    <>
      {shouldShowRotateImage ? (
        <img src={Rotate} alt="rotate img" width="100%" />
      ) : (
        <>
          {!socket?.connected ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <div className="loading-text">Connecting...</div>
            </div>
          ) : (
            <div className="game-viewport">
              <div className="game-wrapper">
                <div
                  className={`gameMain gui-bg-gradiant ${
                    menuOpen ? "blurred" : ""
                  }`}
                >
                  <div className="betContainer">
                  </div>
                  <MainGame/>
                  <div className="Shadow_grid"></div>
                  <div className="Shadow_grid01"></div>
                  <nav>
                    <div className="header">
                      <div className="header-balance">
                        <span className="header-balance-text">Balance:</span>
                        <span>100.00</span>
                      </div>
                      <div className="header-icon">
                        {sound ? (
                          <img
                            src={`${
                              isClickedMute
                                ? "/MenuImages/soundIconColor.png"
                                : "/MenuImages/soundIcon.png"
                            }`}
                            alt="SoundIcon"
                            className="header-icon-item"
                            width="20px"
                            onClick={IsclickChange}
                          />
                        ) : (
                          <img
                            src={`${
                              isClickedMute
                                ? "/MenuImages/muteIconColor.png"
                                : "/MenuImages/muteIcon.png"
                            }`}
                            alt=""
                            onClick={IsclickChange}
                            className="header-icon-item"
                            width="16px"
                          />
                        )}

                        <img
                          src={`${
                            isClickedMenu
                              ? "/MenuImages/menuIconColor.png"
                              : "/MenuImages/hamburger.png"
                          }`}
                          onClick={IsmenuclickChange}
                          className="header-icon-item"
                          alt=""
                          width="22px"
                        />
                      </div>
                    </div>
                  </nav>
                </div>
                <div className="game-footer">
                  <div className="footer-container">
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
              </div>
              <div
                className={`animation--Pf2PO animationOpen--lhuEa ${
                  menuOpen
                    ? "animeTranslate01 animation--Pf2PO animation-top-up"
                    : ""
                }`}
              >
                <div
                  className={`animationInner--O9n3F ${
                    menuOpen ? "animeTranslate02" : ""
                  }`}
                >
                  <div className="tmp--Kw11C">
                    <div className="tmpInner--Ya0As tmpInnerBg--fkOXm">
                      {showComponent ? <ParentComponent /> : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
