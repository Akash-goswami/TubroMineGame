import React, { useState, useEffect, useCallback, useRef } from 'react';
import './BetPanel.css';
import Logo from '../../../../public/GameImages/logo.png';
import { useMainGameContext } from "../../../context/MainGameContext";
import BetAmount from "./BetAmount";
import StartButton from './StartButton';

// react icons
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { useSound } from '../../../context/soundContext';
import { tileClickSound } from '../../../utils/gameSettings';

function BetPanel() {
    const { gridSelected, setGridSelected, mines, setMines, gameStatus } = useMainGameContext();
    const inputRef = useRef<HTMLInputElement>(null);

    const getMaxMines = useCallback((): number => {
        switch (gridSelected) {
            case '3x3': return 8;
            case '5x5': return 24;
            case '7x7': return 48;
            case '9x9': return 80;
            default: return 8;
        }
    }, [gridSelected]);

    useEffect(() => {
        if (!gridSelected) {
            setGridSelected('5x5');
        }

        switch (gridSelected) {
            case '3x3':
                setMines('2');
                break;
            case '5x5':
                setMines('3');
                break;
            case '7x7':
                setMines('5');
                break;
            case '9x9':
                setMines('10');
                break;
            default:
                setMines('1');
                break;
        }
    }, [gridSelected, setGridSelected, setMines]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
                if (mines === '0') {
                    setMines('1');
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mines, setMines]);

    const handleMinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        const numericValue = value ? parseInt(value, 10) : 0;

        if (numericValue >= 0 && numericValue <= getMaxMines()) {
            setMines(numericValue.toString());
        } else if (numericValue > getMaxMines()) {
            setMines(getMaxMines().toString());
        } else {
            setMines('1');
        }
    };

    const handleIncrement = () => {
        const currentMines = parseInt(mines, 10) || 1;
        if (currentMines < getMaxMines()) {
            setMines((currentMines + 1).toString());
        }
    };

    const handleDecrement = () => {
        const currentMines = parseInt(mines, 10) || 1;
        if (currentMines > 1) {
            setMines((currentMines - 1).toString());
        }
    };

    const handleGridSelection = (grid: string) => {
        tileClickSound();
        setGridSelected(grid);
        setMines('1');
    };

    return (
        <div className='betpanel_component'>
            <div className="betpanel_bgimg">
                <div className="betpanel_box">
                    <div className="bet_dasbord">
                        <div className="logo">
                            <img src={Logo} alt="" />
                        </div>
                        <div className={`grids_cmn ${gameStatus ? 'disabled_inputs' : ''}`}>
                            <span className='betTitle'>Grid</span>
                            <div className="grids_cmnbg">
                                {['3x3', '5x5', '7x7', '9x9'].map((grid) => (
                                    <button
                                        key={grid}
                                        className={`grid ${gridSelected === grid ? 'active active_grid' : ''}`}
                                        onClick={() => handleGridSelection(grid)}
                                    >
                                        {grid}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={`mines_cmn ${gameStatus ? 'disabled_inputs' : ''}`}>
                            <button onClick={handleDecrement} disabled={parseInt(mines, 10) <= 1}>
                                <TiMinus />
                            </button>
                            <div className='mines_selectinput'>
                                <p className='betTitle'>Mines</p>
                                {mines === '0' && (
                                    <div className="custom-toast">
                                        <p><CiCircleInfo /> Please choose from 1 to {getMaxMines()}</p>
                                    </div>
                                )}
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={mines}
                                    onChange={handleMinesChange}
                                    onKeyDown={(e) => {
                                        if (['e', 'E', '-', '+'].includes(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    min="1"
                                />
                            </div>
                            <button onClick={handleIncrement} disabled={parseInt(mines, 10) >= getMaxMines()}>
                                <FaPlus />
                            </button>
                        </div>
                    </div>

                    {/* bet amount component*/}
                    <BetAmount />

                    {/* start button component */}
                    <StartButton />

                </div>
            </div>
        </div>
    );
}

export default BetPanel;
