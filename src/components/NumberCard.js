import React, { Component } from "react";
import BlackWhiteCard from "./BlackWhiteCard";
import "./NumberCard.css";

class NumberCard extends Component {
  constructor(props) {
    super(props);

    this.num = props.num;
    this.active = props.active;
    this.onNumClick = this.onNumClick.bind(this);
  }

  render() {
    if (!this.active) {
      return <div className="number-card inactive"></div>;
    }

    if (this.props.failed) {
      return <div className="number-card failed"></div>;
    } else if (this.props.done) {
      return <div className="number-card done"></div>;
    } else if (this.props.turned) {
      return (
        <div className="number-card active">
          <BlackWhiteCard width={100} onClick={() => this.onClick()} />
        </div>
      );
    } else {
      return (
        <div className="number-card active">
          <span onClick={this.onNumClick}>{this.num}</span>
        </div>
      );
    }
  }

  onNumClick() {
    this.props.onNextNumClick(this.num);
  }
}

export default NumberCard;
