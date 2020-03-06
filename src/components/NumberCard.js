import React, { Component } from "react";
import BlackWhiteCard from "./BlackWhiteCard";
import "./NumberCard.css";

const SOMETHING = 10;

class NumberCard extends Component {
  state = {
    turned: false // only used if this.active=true
  };

  constructor(props) {
    super(props);

    this.state = {
      active: props.active,
      num: props.num
    };
  }

  render() {
    if (!this.state.active) {
      return <div className="number-card inactive"></div>;
    }
    return (
      <div className="number-card active">
        {this.state.turned ? (
          <BlackWhiteCard width={100} onClick={() => this.onClick()} />
        ) : (
          <span onClick={() => this.onClick()}>{this.state.num}</span>
        )}
      </div>
    );
  }

  onClick() {
    this.setState({
      turned: !this.state.turned
    });
  }
}

export default NumberCard;
