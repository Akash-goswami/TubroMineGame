import React, { useState } from 'react';
import './StartButton.css';
import { useMainGameContext } from "../../../context/MainGameContext";
 
function StartButton() {
        const { gameStatus, setGameStatus } = useMainGameContext();
 
    // console.log('gameStatus', gameStatus);
 
    return (
        <>
            <div className="multiplayer-startbtns mixcmn">
                <div className="multiplayers">
                    <div className="multiplayers_1 cmn_multiplayers">
                        <div>x1.08</div>
                        <div>23.76</div>
                    </div>
                    <div className="multiplayers_2 cmn_multiplayers">
                        <div>x1.23</div>
                        <div>27.06</div>
                    </div>
                    <div className="multiplayers_3 cmn_multiplayers">
                        <div>x1.42</div>
                        <div>31.24</div>
                    </div>
                    <div
                        className={`multiplayers_active cmn_multiplayers ${gameStatus ? 'active-bg' : ''}`}
                    >
                        <div>x1.64</div>
                        <div>36.08</div>
                    </div>
                    <div className="multiplayers_5 cmn_multiplayers">
                        <div>x1.92</div>
                        <div>42.24</div>
                    </div>
                    <div className="multiplayers_6 cmn_multiplayers">
                        <div>x2.25</div>
                        <div>23.76</div>
                    </div>
                    <div className="multiplayers_7 cmn_multiplayers">
                        <div>x2.68</div>
                        <div>58.96</div>
                    </div>
                </div>
                <div className="start_cancel_cmn">
                    {!gameStatus ? (
                        <div className="gamestartbtn">
                            <div className="place">
                                <div className="place__layout1"></div>
                                <div className="place__layout2"></div>
                                <div className="place__layout3"></div>
                                <div className="place__layout4"></div>
                                <div className="place__text">
                                    <button className='startbtn' onClick={() => setGameStatus(true)}>
                                        Start Game
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="gamecancelbtn">
                            <div className="cancel">
                                <div className="cancel__layout1"></div>
                                <div className="cancel__layout2"></div>
                                <div className="cancel__layout3"></div>
                                <div className="cancel__layout4"></div>
                                <div className="cancel__text">
                                    <button className='cancelbtn' onClick={() => setGameStatus(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}


export default StartButton;