import React from "react";
import AlearImg from "/public/GameImages/aleartImg.png"
import "./AleartPop.css";

function AleartPop() {
  return (
    <div id="modal" className="layout-alert">
        <div className="alertTitle--rq8nO">
          <img src={AlearImg} alt="AlearImg"/>
          We've returned your unfinished round so you can continue your game!   
        </div>
    </div>
  );
}
export default AleartPop;