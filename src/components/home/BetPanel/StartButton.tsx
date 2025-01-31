import './StartButton.css';
import { useMainGameContext } from "../../../context/MainGameContext";


interface HistoryItemProps {
    multiplier: string;
    amount: string;
}


interface ButtonLayoutProps {
    className: string;
    text: string;
}

import './StartButton.css';

function HistoryItem({ multiplier, amount }: HistoryItemProps) {

    const { gridSelected, mines } = useMainGameContext();

    // console.log('mines', mines, 'gridSelected', gridSelected);

    return (
        <div className="history__item">
            <div className="history__content">
                <div className="history__value">{multiplier}</div>
                <div className="history__value">{amount}</div>
            </div>
        </div>
    );
}

function ButtonLayout({ className, text }: ButtonLayoutProps) {
    return (
        <div className={className}>
            <div className={`${className}__layout1`}></div>
            <div className={`${className}__layout2`}></div>
            <div className={`${className}__layout3`}></div>
            <div className={`${className}__layout4`}></div>
            <div className={`${className}__text`}>{text}</div>
        </div>
    );
}

function StartButton() {
    const historyData = [
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
        { multiplier: 'x301.92k', amount: '$10.1k' }
    ];

    return (
        <>
            <div className="control__history">
                <div className="history">
                    <div className="history__inner _await _43" style={{ transform: "translateY(0%)" }}>
                        {historyData.map((item, index) => (
                            <HistoryItem key={index} multiplier={item.multiplier} amount={item.amount} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="control__button">
                <ButtonLayout className="place" text="Start Game" />
                <ButtonLayout className="cancel" text="Cancel" />
            </div>
        </>
    );
}

export default StartButton;
