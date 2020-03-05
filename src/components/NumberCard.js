import React, { Component } from "react";
import "./NumberCard.css";

class NumberCard extends Component {
  state = {
    turned: false // only used if this.active=true
  };

  constructor(props) {
    super(props);

    this.cell = props.cell;
    this.active = props.active;
    if (this.active) this.num = props.num;
  }

  render() {
    if (!this.active) {
      return <div className="number-card inactive"></div>;
    }
    return <div className="number-card active">{this.num}</div>;
  }
}

export default NumberCard;
