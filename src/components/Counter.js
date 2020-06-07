import React, { Component } from "react";
import "./Counter.css";

class Counter extends Component {

  render() {
    return this.renderCounter()
  }

  renderCounter() {
    return (
      <div>
          {this.props.name} {this.props.count}
      </div>
    );
  }
}

export default Counter;
