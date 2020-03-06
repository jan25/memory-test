import React, { Component } from "react";
import _ from "lodash";
import "./App.css";
import NumberCard from "./NumberCard";
import BlackWhiteCard from "./BlackWhiteCard";

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

// let toRowCol = cardID => {
//   let row = parseInt(cardID / NUMBER_CARD_HEIGHT);
//   let col = parseInt(cardID % NUMBER_CARD_WIDTH);
//   return {
//     row,
//     col
//   };
// };

// let toCardID = (row, col, colsPerRow) => {
//   return col + row * colsPerRow;
// };

let calculateRandomPlaces = numCells => {
  let cells = _.range(0, numCells);
  let shuffled = _.shuffle(cells);
  let selected = _.slice(shuffled, 0, ACTIVE_NUMBERS);

  let cellToNum = {};
  let num = 1;
  _.forEach(selected, cell => {
    cellToNum[cell] = num++;
  });

  return cellToNum;
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
    return (
      <React.Fragment>
        <div ref={this.gameAreaRef} id="game-area">
          {this.renderNumberCards()}
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

  renderNumberCards() {
    const { cells } = this.state;
    let cellNums = _.range(0, cells);
    let cellsToNum = calculateRandomPlaces(cells);

    return cellNums.map(n =>
      n in cellsToNum ? (
        <NumberCard key={n} active={true} num={cellsToNum[n]} />
      ) : (
        <NumberCard key={n} active={false} />
      )
    );
  }
}

export default App;
