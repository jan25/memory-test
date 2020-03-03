import React, { Component } from "react";
import "./App.css";
import NumberCard from "./NumberCard";

class App extends Component {
  state = {};
  render() {
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
      <React.Fragment>
        <div id="game-main">
          This is App Component
          {number.map(n => (
            <NumberCard num={n} />
          ))}
        </div>
        <div id="game-info">
          <h4>Click on 1 to start the test</h4>
          <p>
            Goal: remember the layout of numbers 1-9 on this page. The numbers
            are turned upside down when you click on number 1. And you have to
            recall the remaining numbers in order by clicking on upside down
            cards.
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
