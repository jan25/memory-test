import React, { Component } from "react";
import "./NumberCard.css";

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
        <span onClick={() => this.onClick()}>{this.state.num}</span>
      </div>
    );
  }

  onClick() {
    this.setState({
      active: false
    });
  }
}

export default NumberCard;
