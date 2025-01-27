import React, { useContext } from "react";
import "./ExitPopModel.css";
import { useBackground } from "../../context/backgroundClassProvider";
import { useSocket } from "../../context/socket/socketProvider";
import { Link } from "react-router-dom";

export default function ExitPopModel() {
  // const { exitPopOpen, setExitPopOpen } = useContext(back)
  const { token } = useSocket();
  const { exitPopOpen, setExitPopOpen, exitPopOpenAnimation } = useBackground();
  return (
    <div className={`exit--GUmOl ${exitPopOpenAnimation && "exitOpen--oJg6y"}`}>
      <div className="exitInner--G5sE7">
        <div className="exitTitle--AIhOm">Exit Game</div>
        <div className="exitDescription--esCFf">
          Exit the game and go back to the lobby
        </div>
        <div className="exitButtons--grTQR">
          <div
            className="primaryButton--vfjEL primaryButtonRed--HgS0x"
            onClick={() => setExitPopOpen(false)}
          >
            Cancel
          </div>
          <Link
            to={`${import.meta.env.VITE_EXIT_GAME_URL}?id=${token}`}
            style={{
              color: "#fff",
              textDecoration: "none",
            }}
            onClick={() =>
              (window.location.href = `${
                import.meta.env.VITE_EXIT_GAME_URL
              }?id=${token}`)
            }
            className="secondaryButton--F1n7f"
          >
            Exit
          </Link>
        </div>
      </div>
    </div>
  );
}
