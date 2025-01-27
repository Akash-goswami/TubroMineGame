import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useBackground } from "../../context/backgroundClassProvider";
import "./Manu.css";
import "./Rules.css";

const Rules: React.FC = () => {
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

  const TogaleMenu = () => {
    setMenuOpen(!menuOpen);
    setActiveComponent("menu");
  };

  return (
    <div className="Rules-container">
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
        <div>Rules</div>
        <RxCross2 onClick={TogaleMenu} className="rules-cross zoomIcon" />
      </div>
      <div className="Rules-container-body">
        <div className="Rules-container-body-box01">
          <ul>
            <a
              href=""
              className="rule-links"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("rule0");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <li>How to Play?</li>
            </a>
            <a
              href=""
              className="rule-links"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("rule1");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <li>Game Details</li>
            </a>
            <a
              href=""
              className="rule-links"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("rule2");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <li>Settings</li>
            </a>
            <a
              href=""
              className="rule-links"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("rule3");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <li>Disconnection Policy</li>
            </a>
            <a
              href=""
              className="rule-links"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("rule4");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <li>Version</li>
            </a>
          </ul>
        </div>
        <div className="Rules-container-body-box02">
          <div className="how-to-Play" id="rule0">
            <h2>How to Play?</h2>
            <ul>
              <li>Choose your grid: 3x3, 5x5, 7x7, or 9x9.</li>
              <li>Set your bet.</li>
              <li>Start the game: Click "Start Game".</li>
              {/* <li>
                Hold down the "PUMP" button and pump the muscles until the
                coefficient reaches your desired target
              </li>
              <li>
                Claim your winnings by releasing the button before the character
                gets tired
              </li> */}
            </ul>
            {/* <p>
              The longer you pump the muscles, the bigger your winnings will be.
              Keep in mind that the character can get tired at any moment. If
              you don’t claim your winnings before the character gets tired, you
              will lose your bet.
            </p> */}
          </div>
          <div className="Game_Details" id="rule1">
            <h2>Game Details</h2>
            <h6>Place Bet</h6>
            {/* <p>
              Select the bet amount under the "PUMP" button and hold down the
              "PUMP" button to start your athletic earnings!
            </p> */}
            <h6>1. Choose your grid:</h6>
            <p>
            Select from four grid sizes: 3x3, 5x5, 7x7, or 9x9. Each grid has a default number of mines and gems, but you can customize the number of mines to your liking. The more mines are on the playing field, the higher the winning multiplier will be, as well as risk of striking one, so choose wisely!
            </p>
            <h6>2. Set your bet:</h6>
            <p>
            Enter the amount you want to wager in the "Bet Amount" field. Your bet will determine the potential payout if you successfully uncover all the gems without hitting a mine.
            </p>
            <h6>3. Start the game:</h6>
            <p>
            Click the "Start Game" button to begin your treasure hunt. Once the game starts, you'll see a grid of tiles concealing both gems and mines.
            </p>
            <h6>4. Gems and Multipliers:</h6>
            <p>
            Turbo Mines features three types of gems with varying multipliers:
            </p>
            <ul>
              <li><span>Blue gems:</span> Multipliers start at 1.0 and increase with each gem, ranging from 0 to 3.5.</li>
              <li><span>Green gems:</span> Offer significantly higher multipliers than blue gems, ranging from 3.5 to 30.</li>
              <li><span> Golden gems:</span>The most valuable gems, providing the highest multipliers, starting from 30 and above.</li>
            </ul>
            <h6>Cash Out</h6>
            <p>You can cancel the bet only if you haven't opened any tiles yet. This allows you to reconsider your strategy or adjust your bet amount before committing to a round.</p>
            <h6>RTP</h6>
            <p>
            Game relies on a coefficient called "RTP" (Return to Player) which is the statistical average of payouts over billions of rounds. <br />
            Turbo Mines offers four different game fields with the following minimum RTPs: <br />
            </p>
            <ul>
              <li>3x3 (94.89%);</li>
              <li>5x5 (94.40%);</li>
              <li>7x7 (94.25%);</li>
              <li>9x9 (94.54%).</li>
            </ul>
          </div>
          <div className="Settings" id="rule2">
            <h2>Settings</h2>
            <p>
            Click on the icon with three sliders in the upper right corner of the screen to open the settings menu. In the settings, you can:
            </p>
            <ul>
              <li>view your username</li>
              <li>
              view the minimum bet, maximum bet, and maximum profit limits
              </li>
              <li>turn on/off sounds</li>
              <li>view a list of your recent bets </li>
            </ul>
            {/* <p>
              You can also change your character on the main game screen using
              the slider located on the right. <br />
              Similarly, the mute button is located on the main screen to the
              left of the settings button.
            </p> */}
          </div>
          <div className="Disconnection_Policy" id="rule3">
            <h2>Disconnection Policy</h2>
            <p>
              We prioritize the safety and satisfaction of our players, even in
              cases of unexpected internet disconnections. Here's how we handle
              such situations:
            </p>
            <ul>
              <li>
              If a bet is placed after a disconnection, it will not be sent to the server, no funds will be deducted, and the game will not proceed.
              </li>
              <li>
              If a disconnection occurs during an active game, the game state on the server will remain unchanged. Players will be able to resume the game once the connection is restored.
              </li>
            </ul>
          </div>
          <div className="Version" id="rule4">
            <h2>Version</h2>
            <p>
              Game Version: "1.0.3" <br />
              {/* RNG version: "2.0.0" */}
            </p>
          </div>
        </div>
      </div>
      <div
        className="menu-footer-container"
        style={{
          fontSize: "10px",
          position: "absolute",
          bottom: "3px"
      
        }}
      >
        <div>PumpedX | Version: "1.0.3"</div>
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

export default Rules;