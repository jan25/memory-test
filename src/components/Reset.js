import React, { Component } from "react";
import "./Info.css";

class Reset extends Component {

  render() {
    const {showReset} = this.props;
    if (showReset) {
      return this.renderResetBtn();
    }
    return null;
  }

  renderResetBtn() {
    return (
      <div>
        <i className="material-icons" onClick={this.props.onReset}>
          refresh
        </i>
      </div>
    );
  }
}

export default Reset;
