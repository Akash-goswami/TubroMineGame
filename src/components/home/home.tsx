import "./Home.css";
import "../manu/Loding.css";
import Rotate from "/MenuImages/Rotate.webp";
import { useEffect, useState } from "react";
import { useBackground } from "../../context/backgroundClassProvider";
import { useSocket } from "../../context/socket/socketProvider";
import ParentComponent from "../manu/ParentComponent";
import { useSound } from "../../context/soundContext";
import MainGame from "./MainGame";
import Footer from "./Footer";
import AleartPop from "./AleartPop";
import { useMainGameContext } from "../../context/MainGameContext";

// betpanel component import
import BetPanel from './BetPanel/BetPanel'

interface HomeProps {
  shouldShowRotateImage: boolean;
}

const Home: React.FC<HomeProps> = ({ shouldShowRotateImage }) => {
  const [isClickedMute, setIsClickedMute] = useState(false);
  const [isClickedMenu, setIsClickedMenu] = useState(false);

  const { menuOpen, setMenuOpen, showComponent } = useBackground();
  const {aleartPop} = useMainGameContext();
  const { socket } = useSocket();
  const { sound, toggleMute } = useSound();

  const handleMenuOpen = () => {
    setIsClickedMenu(true);
    setMenuOpen(!menuOpen);
    setTimeout(() => {
      setIsClickedMenu(false);
    }, 200);
  };



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
          {/* {!socket?.connected ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <div className="loading-text">Connecting...</div>
            </div>
          ) : ( */}
            <div className="game-viewport">
              <div className="game-wrapper">
                <div
                  className={`gameMain gui-bg-gradiant ${
                    menuOpen ? "blurred" : ""
                  }`}
                >
                  <div className="bet_section">
                    <BetPanel/>
                  </div>
                  <MainGame/>
                  {
                    aleartPop && <AleartPop/>
                  }
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
                  <Footer/>
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
          {/* )} */}
        </>
      )}
    </>
  );
};

export default Home;
