import "./WiningAmount.css";

interface WiningAmountProps {
  multiplier: number | 1.01;
  bank: number | 10.0;
  activeBetAmount: string;
  tryAgainText?: boolean;
}

const getBackgroundGradient = (multiplier: number) => {
  if (multiplier <= 2.0) {
    return "linear-gradient(0deg, #0094cc 7.97%, #45deff 65.49%)";
  } else if (multiplier > 2.0 && multiplier <= 10.0) {
    return "linear-gradient(0deg, #00cc4e 7.97%, #45ff7d 65.49%)";
  } else if (multiplier > 10.0 && multiplier <= 20.0) {
    return "linear-gradient(0deg, #ccb800 7.97%, #ffe845 65.49%)";
  } else {
    return "linear-gradient(0deg, #9000cc 7.97%, #d445ff 65.49%)"; // Default case
  }
};

const WiningAmount = ({
  multiplier,
  bank,
  tryAgainText,
}: WiningAmountProps) => {
  return (
    <div className="coefficient">
      <div
        className={`coefficient__amount  ${
          !tryAgainText ? "" : "try-againMargionTop"
        }`}
        // style={{
        //   marginTop: !tryAgainText ? "0" : "-43px",
        // }}
      >
        <span data-coef={`${multiplier}`} className="coefficient__num">
          {multiplier}
        </span>
        <span data-x="x" className="coefficient__x">
          x
          <span
            className="coefficient__x-clip"
            style={{
              backgroundImage: !tryAgainText
                ? getBackgroundGradient(multiplier)
                : undefined,
            }}
          >
            x
          </span>
        </span>
      </div>
      {!tryAgainText && (
        <div className="coefficient__bank">
          <span className="coefficient__bank-text">Bank:</span>
          <span className="coefficient__bank-amount">{bank}</span>
        </div>
      )}
    </div>
  );
};

export default WiningAmount;
