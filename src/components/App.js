import React, { Component } from "react";
// import _ from "lodash";
import "./App.css";
import NumberCard from "./NumberCard";

const NUMBER_CARD_MARGIN = 5;
const NUMBER_CARD_WIDTH = 100 + 2 * NUMBER_CARD_MARGIN;
const NUMBER_CARD_HEIGHT = NUMBER_CARD_WIDTH;

// starting from 1
const ACTIVE_NUMBERS = 9;

let calculateRowsColumns = (width, height) => {
  let rows = parseInt(width / NUMBER_CARD_WIDTH);
  let cols = parseInt(height / NUMBER_CARD_HEIGHT);
  return {
    rows,
    cols
  };
};

let toRowCol = cardID => {
  let row = parseInt(cardID / NUMBER_CARD_HEIGHT);
  let col = parseInt(cardID % NUMBER_CARD_WIDTH);
  return {
    row,
    col
  };
};

let toCardID = (row, col, colsPerRow) => {
  return col + row * colsPerRow;
};

// compute random integer in range [a, b]
let randInt = (a, b) => {
  // return _.random(a, b + 1);
  let r = Math.random();
  return a + Math.floor(r * (b + 1 - a + 1));
};

let swap = (l, i, j) => {
  const lj = l[j];
  l[j] = l[i];
  l[i] = lj;
};

let calculateRandomPlaces = numCells => {
  let cells = [];
  for (let i = 0; i < numCells; ++i) cells.push(i);

  let selected = new Set();

  for (let i = 0; i < ACTIVE_NUMBERS; ++i) {
    let r = randInt(i, numCells - 1);
    selected.add(cells[r]);
    swap(cells, i, r);
  }

  console.log("selected", selected);

  return {
    isActive: cellID => {
      return selected.has(cellID);
    }
  };
};

class App extends Component {
  state = {
    rows: 0,
    cols: 0,
    cells: 0 // same as rows * cols
  };

  constructor(props) {
    super(props);

    this.gameAreaRef = React.createRef();
    this.gameAreaHeight = 0;
    this.gameAreaWidth = 0;
  }

  componentDidMount() {
    const gameAreaNode = this.gameAreaRef.current.getBoundingClientRect();
    this.gameAreaHeight = gameAreaNode.height;
    this.gameAreaWidth = gameAreaNode.width;
    console.log(gameAreaNode.height, gameAreaNode.width);
    const { rows, cols } = calculateRowsColumns(
      this.gameAreaWidth,
      this.gameAreaHeight
    );
    const cells = rows * cols;
    this.setState({
      rows,
      cols,
      cells
    });
  }

  render() {
    console.log(this.state);
    const { cells } = this.state;
    let cardNums = [];
    for (let i = 0; i < cells; ++i) {
      cardNums.push(i);
    }
    let randomPlaces = calculateRandomPlaces(cells);
    console.log("randomPlaces", randomPlaces);

    return (
      <React.Fragment>
        <div ref={this.gameAreaRef} id="game-area">
          {cardNums.map(n => (
            <NumberCard key={n} num={n} active={randomPlaces.isActive(n)} />
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
