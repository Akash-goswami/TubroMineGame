import './StartButton.css';
import { useMainGameContext } from "../../../context/MainGameContext";

function StartButton() {
    
    const { gridSelected } = useMainGameContext();

    const multiplierData = [
        { multiplier: 'x1.06', amount: '$106' },
        { multiplier: 'x1.18', amount: '$118' },
        { multiplier: 'x1.32', amount: '$132' },
        { multiplier: 'x1.48', amount: '$148' },
        { multiplier: 'x1.67', amount: '$167' },
        { multiplier: 'x1.88', amount: '$188' },
        { multiplier: 'x2.13', amount: '$213' },
        { multiplier: 'x2.42', amount: '$242' },
        { multiplier: 'x2.75', amount: '$275' },
        { multiplier: 'x3.15', amount: '$315' },
        { multiplier: 'x3.61', amount: '$361' },
        { multiplier: 'x4.16', amount: '$416' },
        { multiplier: 'x4.81', amount: '$481' },
        { multiplier: 'x5.58', amount: '$558' },
        { multiplier: 'x6.51', amount: '$651' },
        { multiplier: 'x7.63', amount: '$763' },
        { multiplier: 'x9', amount: '$900' },
        { multiplier: 'x10.66', amount: '$1.06k' },
        { multiplier: 'x12.71', amount: '$1.27k' },
        { multiplier: 'x15.25', amount: '$1.52k' },
        { multiplier: 'x18.43', amount: '$1.84k' },
        { multiplier: 'x22.44', amount: '$2.24k' },
        { multiplier: 'x27.54', amount: '$2.75k' },
        { multiplier: 'x34.1', amount: '$3.41k' },
        { multiplier: 'x42.62', amount: '$4.26k' },
        { multiplier: 'x53.84', amount: '$5.38k' },
        { multiplier: 'x68.79', amount: '$6.87k' },
        { multiplier: 'x89.02', amount: '$8.9k' },
        { multiplier: 'x116.84', amount: '$10.1k' },
        { multiplier: 'x155.79', amount: '$10.1k' },
        { multiplier: 'x211.43', amount: '$10.1k' },
        { multiplier: 'x292.75', amount: '$10.1k' },
        { multiplier: 'x414.73', amount: '$10.1k' },
        { multiplier: 'x603.24', amount: '$10.1k' },
        { multiplier: 'x904.87', amount: '$10.1k' },
        { multiplier: 'x1.4k', amount: '$10.1k' },
        { multiplier: 'x2.28k', amount: '$10.1k' },
        { multiplier: 'x3.92k', amount: '$10.1k' },
        { multiplier: 'x7.18k', amount: '$10.1k' },
        { multiplier: 'x14.37k', amount: '$10.1k' },
        { multiplier: 'x32.34k', amount: '$10.1k' },
        { multiplier: 'x86.26k', amount: '$10.1k' },
        { multiplier: 'x301.92k', amount: '$10.1k' },
    ];

    
    let numItemsToShow = 0;
    if (gridSelected === '3x3') {
        numItemsToShow = 8;
    } else if (gridSelected === '5x5') {
        numItemsToShow = 24;
    } else if (gridSelected === '7x7') {
        numItemsToShow = 48;
    } else if (gridSelected === '9x9') {
        numItemsToShow = multiplierData.length; 
    }

    
    const dataToShow = multiplierData.slice(0, numItemsToShow);

    return (
        <>
            <div className="control__history">
                <div className="history">
                    <div className="history__inner _await _43" style={{ transform: "translateY(0%)" }}>
                        {dataToShow.map((entry, index) => (
                            <div className="history__item" key={index}>
                                <div className="history__content">
                                    <div className="history__value">{entry.multiplier}</div>
                                    <div className="history__value">{entry.amount}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="control__button">
                <div className="place">
                    <div className="place__layout1"></div>
                    <div className="place__layout2"></div>
                    <div className="place__layout3"></div>
                    <div className="place__layout4"></div>
                    <div className="place__text">Start Game</div>
                </div>
                <div className="cancel">
                    <div className="cancel__layout1"></div>
                    <div className="cancel__layout2"></div>
                    <div className="cancel__layout3"></div>
                    <div className="cancel__layout4"></div>
                    <div className="cancel__text">Cancel</div>
                </div>
            </div>
        </>
    );
}

export default StartButton;
