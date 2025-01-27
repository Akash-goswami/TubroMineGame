import React, { useEffect, useState } from "react";
import { BiVolumeMute } from "react-icons/bi";
import { FaRegFileAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdFormatListBulleted } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { SiStarship } from "react-icons/si";
import { VscUnmute } from "react-icons/vsc";
import { useBackground } from "../../context/backgroundClassProvider";
import { useSound } from "../../context/soundContext";
import HomeIcon from "/MenuImages/homeIcon.png";
import HomeIconColor from "/MenuImages/homeIconColor.png";
import { setVolume } from "../../utils/gameSettings";
import Iconsound from "/MenuImages/soundIcon.png";
import RulesColorIcon from "/MenuImages/RulesColor.png";
import RulesIcon from "../../../public/MenuImages/RulesColorIcon.png";
import IconMutesound from "/MenuImages/muteIcon.png";
import wishListIcon from "/MenuImages/wishListIcon.png";
import wishListIconColor from "/MenuImages/wishListIconColor.png";
import "./Manu.css";
import { useSocket } from "../../context/socket/socketProvider";
import ExitPopModel from "./ExitPopModel";

const Manu: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [isClickedList01, setIsClickedList01] = useState(false);
  const [isClickedList02, setIsClickedList02] = useState(false);
  const [isClickedList03, setIsClickedList03] = useState(false);
  const [isClickedList04, setIsClickedList04] = useState(false);
  const {
    menuOpen,
    setMenuOpen,
    playTime,
    setActiveComponent,
    exitPopOpen,
    setExitPopOpen,
  } = useBackground();

  //FOR SOUND SLIDER
  const { sound, volume, setVolumeLevel, toggleMute } = useSound();
  const [sliderValue, setSliderValue] = useState<number>(volume * 100);

  const { userInfo } = useSocket();

  const rangBgColor = {
    bgColorA: "red",
    bgColorB: "#d9d1eb",
  };

  useEffect(() => {
    setSliderValue(volume * 100);
  }, [volume]);

  useEffect(() => {
    const sliderElement = document.querySelector(".slider") as HTMLElement;
    if (sliderElement) {
      const calcPercentage = (100 * (sliderValue - 0)) / (100 - 0);
      sliderElement.style.background = `linear-gradient(90deg, red ${calcPercentage}%, #4d4d4d ${calcPercentage}%)`;
    }
  }, [sliderValue]);

  const handleSliderChange = (value: number) => {
    const normalizedVolume = value / 100; // Normalize to 0-1

    // Update slider value immediately for user feedback
    setSliderValue(value);

    // Handle unmute if muted
    if (!sound && normalizedVolume > 0) {
      toggleMute(); // Unmute without restoring the previous volume
    }

    // Update global volume
    setVolumeLevel(normalizedVolume);
  };

  const handleMouseUp = () => {
    // Commit slider position on mouse release
    const normalizedVolume = sliderValue / 100;
    setVolumeLevel(normalizedVolume);
  };

  const handleMenuClose = () => {
    setMenuOpen(!menuOpen);
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

  const formatPlayTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
  };

  const Isclicked01 = () => {
    setIsClickedList01(true);
    setTimeout(() => {
      setActiveComponent("limit");
      setIsClickedList01(false);
    }, 200);
  };
  const Isclicked02 = () => {
    setIsClickedList02(true);
    setTimeout(() => {
      setActiveComponent("rules");
      setIsClickedList02(false);
    }, 200);
  };
  const Isclicked03 = () => {
    setIsClickedList03(true);
    setTimeout(() => {
      setActiveComponent("mybets");
      setIsClickedList03(false);
    }, 200);
  };
  const Isclicked04 = () => {
    setIsClickedList04(true);
    setTimeout(() => {
      setIsClickedList04(false);
    }, 200);
  };

  return (
    <div className="main-container">
      {exitPopOpen && <ExitPopModel />}
      <div className="playTime-container">
        <div className="playTime">
          <span>Play Time:</span> {formatPlayTime(playTime)}
        </div>
        <div className="playVersion-container">
          <div className="playVersion">
            <div>{/* <span>RNG version:</span> "2.0.0" */}</div>
            <div>
              <span>Game Version:</span>"1.0.0"
            </div>
          </div>
          <RxCross2 className="close-icon zoomIcon" onClick={handleMenuClose} />
        </div>
      </div>
      <div className="menu-container">
        <div className="nickname-container">
          <div className="nickname-title">
            <span>Username</span>
            <h1>{userInfo?.urNm}</h1>{" "}
          </div>
          <div className="Sound-container">
            <span>Sound</span>
            <div className="sound-bar">
              <img
                src={IconMutesound}
                alt="IconMutesound"
                className="sound-unmute-icon"
                onClick={toggleMute}
              />
              <input
                type="range"
                className="slider"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                onMouseUp={handleMouseUp}
              />
              <img
                src={Iconsound}
                alt="Iconsound"
                className="sound-mute-icon"
                onClick={toggleMute}
              />
            </div>
          </div>
        </div>
        <div className="menu-container-list">
          <ul>
            <li
              onClick={() => {
                Isclicked01();
              }}
              className="bg-red-list"
            >
              <div
                className={`${
                  isClickedList01 ? "red-bgList" : "setting-hover"
                }`}
              ></div>
              <div className="set-index">
                {/* <SiStarship className={`${isClickedList01 ?  'White-icon' : 'icon_Menu_List' }`} /> */}
                <img
                  src={`${isClickedList01 ? wishListIconColor : wishListIcon}`}
                  alt="IconSetting"
                  width="24px"
                />
                Limits
              </div>
            </li>
            <li onClick={Isclicked02}>
              <div
                className={`${
                  isClickedList02 ? "red-bgList" : "setting-hover"
                }`}
              ></div>
              <div className="set-index">
                <img
                  src={`${isClickedList02 ? RulesColorIcon : RulesIcon}`}
                  alt="IconSetting"
                  width="18px"
                />
                Rules
              </div>
            </li>
            <li onClick={Isclicked03}>
              <div
                className={`${
                  isClickedList03 ? "red-bgList" : "setting-hover"
                }`}
              ></div>
              <div className="set-index">
                <MdFormatListBulleted
                  className={`${
                    isClickedList03 ? "White-icon" : "icon_Menu_List"
                  }`}
                />
                My Bets
              </div>
            </li>

            <li
              onClick={() => {
                Isclicked04();
                setExitPopOpen(true);
              }}
              className="hover-list-item index-hover"
            >
              {/* <div className={`${isClickedList04 ? "red-bgList" : "setting-hover"}`}></div> */}
              <div className="set-index ">
                <img
                  src={HomeIcon}
                  alt="HomeIcon"
                  width="24px"
                  className="default-icon"
                />
                <img
                  src={HomeIconColor}
                  alt="HomeIconColor"
                  width="24px"
                  className="hover-icon"
                />
                Exit Game
              </div>
            </li>
          </ul>
        </div>
      </div>
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
  );
};

export default Manu;
