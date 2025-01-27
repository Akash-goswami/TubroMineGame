import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { PiMoneyDuotone } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { SiStarship } from "react-icons/si";
import { useBackground } from "../../context/backgroundClassProvider";
import wishListIcon from "/MenuImages/wishListIcon.png";
import redcolorMoney from "/MenuImages/redcolorMoney.png";

import "./Limit.css";
import "./Manu.css";
import "./Loding.css";

const LimitMain: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { menuOpen, setMenuOpen, setActiveComponent } = useBackground();

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
    // Simulate a delay to show the loading spinner
    const timeoutId = setTimeout(() => setLoading(false), 200); // 2 seconds delay
    return () => clearTimeout(timeoutId);
  }, []);

  const TogaleMenu = () => {
    setMenuOpen(!menuOpen);
    setActiveComponent("menu");
  };

  const goBack = () => {
    setActiveComponent("menu");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="Limit-container">
      <div className="Limit-container-header">
        <span
          style={{ display: "flex", alignItems: "center", fontSize: "24px" }}
          onClick={goBack}
          className="zoomIcon"
        >
          <IoIosArrowBack style={{ cursor: "pointer" }} />
          <span
            style={{
              fontSize: "14px",
            }}
          >
            Back
          </span>
        </span>
        <div>Limits</div>
        <RxCross2 onClick={TogaleMenu} className="limit-cross zoomIcon" />
      </div>
      <div className="Limit-container-body">
        <div className="Limit-container-body-box01 animation-delay01">
          <img src={wishListIcon} alt="wishListIcon" width="24px" />
          <span>Minimum bet:</span> <span className="limit-amount">10</span>
        </div>
        <div className="Limit-container-body-box01 animation-delay02">
          <img src={redcolorMoney} alt="wishListIcon" width="24px" />
          <span>Maximum bet:</span> <span className="limit-amount">5,000</span>
        </div>
        <div className="Limit-container-body-box01 animation-delay03">
          <IoArrowUpCircleOutline className="limit-icon" />
          <span>Maximum win for one bet:</span>{" "}
          <span className="limit-amount">2,50,000</span>
        </div>
      </div>
      <div>
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
  );
};

export default LimitMain;
