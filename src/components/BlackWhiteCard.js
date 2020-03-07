import React, { Component } from "react";
import blackwhite from "../blackwhite.png";

class BlackWhiteCard extends Component {
  constructor(props) {
    super(props);
    this.width = props.width;
  }

  render() {
    return (
      <img
        src={blackwhite}
        alt="missing blackwhite image"
        height={this.width}
        width={this.width}
      />
    );
  }
}

export default BlackWhiteCard;
