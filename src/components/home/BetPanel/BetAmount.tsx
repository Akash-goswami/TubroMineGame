import React, { useEffect, useState } from 'react';
import './BetAmount.css';
import { useMainGameContext } from "../../../context/MainGameContext";

// Icons
import { CiCircleInfo } from "react-icons/ci";
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";

function BetAmount() {
    const { betAmount, setBetAmount, gameStatus } = useMainGameContext(); 
    const [showTooltip, setShowTooltip] = useState(false);

    const betValues = [10, 20, 50, 100, 200, 500, 1000, 1500, 2000, 3000, 5000]; 
    const currentBetIndex = betValues.indexOf(betAmount); 

    useEffect(() => {
        if (betAmount < 10) {
            setShowTooltip(true);
        } else {
            setShowTooltip(false);
        }
    }, [betAmount]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        const parsedValue = value ? parseInt(value) : 0;
        setBetAmount(parsedValue);
    };
    

    const increaseBet = () => {
        const currentBetValue = betAmount;
        const nextHigherBet = betValues.find(value => value > currentBetValue);
        if (nextHigherBet) {
            setBetAmount(nextHigherBet);
        }
    };

    const decreaseBet = () => {
        const currentBetValue = betAmount;
        const nextLowerBet = betValues.slice().reverse().find(value => value < currentBetValue);
        if (nextLowerBet) {
            setBetAmount(nextLowerBet);
        }
    };

    const setMinBet = () => {
        setBetAmount(betValues[0]);
    };

    const setMaxBet = () => {
        setBetAmount(betValues[betValues.length - 1]);
    };

    const handleBlur = () => {
        if (betAmount < 10) {
            setBetAmount(10);
        } else if (betAmount > 5000) {
            setBetAmount(5000);
        }
    };

    // console.log('betAmount', betAmount);

    return (
        <div className={`bet_amountcmn ${gameStatus ? 'disabled' : ''}`}>
            <p
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                Bet Amount <CiCircleInfo />
                {showTooltip && <span className="tooltip"><CiCircleInfo/> Max Profit 50000</span>}
            </p>
            <input 
                type="text" 
                value={betAmount} 
                onInput={handleInputChange} 
                onBlur={handleBlur} 
            />
            <div className="betselect_btns">
                <button onClick={setMinBet}>min</button>
                <button onClick={decreaseBet}><TiMinus /></button>
                <button onClick={increaseBet}><FaPlus /></button>
                <button onClick={setMaxBet}>max</button>
            </div>
        </div>
    );
}

export default BetAmount;
