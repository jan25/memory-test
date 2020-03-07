import React, { Component } from "react";
import BlackWhiteCard from "./BlackWhiteCard";
import "./NumberCard.css";

class NumberCard extends Component {
  render() {
    if (!this.props.active) {
      return <div className="number-card inactive"></div>;
    }

    if (this.props.failed) {
      return (
        <div className="number-card failed blinking-error">
          <span>{this.props.num}</span>
        </div>
      );
    }

    if (this.props.done) {
      return <div className="number-card done"></div>;
    }

    if (this.props.turned) {
      return (
        <div className="number-card active" onClick={() => this.onClick()}>
          <BlackWhiteCard width={100} />
        </div>
      );
    }

    return (
      <div
        className={
          this.props.num === 1
            ? "number-card active blinking-one"
            : "number-card active"
        }
      >
        <span onClick={() => this.onClick()}>{this.props.num}</span>
      </div>
    );
  }

  onClick() {
    this.props.onNumClick(this.props.num);
  }
}

export default NumberCard;
