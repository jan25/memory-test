import React from "react";
import BlackWhiteCard from "./BlackWhiteCard";
import "./NumberCard.css";

const NumberCard = ({
  active,
  failed,
  done,
  turned,
  num,
  onNumClick
}) => {
  if (!active) {
    return <div className="number-card inactive"></div>;
  }

  if (failed) {
    return (
      <div className="number-card failed blinking-error">
        <span>{num}</span>
      </div>
    );
  }

  if (done) {
    return <div className="number-card done"></div>;
  }

  if (turned) {
    return (
      <div className="number-card active" onClick={() => onNumClick(num)}>
        <BlackWhiteCard width={100} />
      </div>
    );
  }

  return (
    <div
      className={
        num === 1
          ? "number-card active blinking-one"
          : "number-card active"
      }
    >
      <span onClick={() => onNumClick(num)}>{num}</span>
    </div>
  );
}

export default NumberCard;
