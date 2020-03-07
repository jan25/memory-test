import React, { Component } from "react";
import _ from "lodash";
import "./App.css";
import NumberCard from "./NumberCard";
import Info from "./Info";
// import BlackWhiteCard from "./BlackWhiteCard";

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
  constructor(props) {
    super(props);

    this.gameAreaRef = React.createRef();
    this.gameAreaHeight = 0;
    this.gameAreaWidth = 0;

    this.state = {
      activeCellToNum: {},
      nextNum: 1,
      doneNums: [],
      turned: false,
      failed: false
    };
    this.onNextNumClick = this.onNextNumClick.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  componentDidMount() {
    const gameAreaNode = this.gameAreaRef.current.getBoundingClientRect();
    this.gameAreaHeight = gameAreaNode.height;
    this.gameAreaWidth = gameAreaNode.width;
    const { rows, cols } = calculateRowsColumns(
      this.gameAreaWidth,
      this.gameAreaHeight
    );
    this.cells = rows * cols;

    this.reset();
  }

  render() {
    const showResetBtn = this.state.turned || this.state.failed;

    return (
      <React.Fragment>
        <div ref={this.gameAreaRef} id="game-area">
          {this.renderNumberCards()}
        </div>
        <div id="game-info">
          <Info
            showInfo={!showResetBtn}
            showReset={showResetBtn}
            onReset={this.onReset}
          />
        </div>
      </React.Fragment>
    );
  }

  renderNumberCards() {
    let cellNums = _.range(0, this.cells);
    console.log(this.state);
    console.log(this.state.activeCellToNum);
    return cellNums.map(n => (
      <NumberCard
        key={n}
        active={n in this.state.activeCellToNum}
        num={
          n in this.state.activeCellToNum ? this.state.activeCellToNum[n] : null
        }
        turned={this.state.turned}
        done={
          n in this.state.activeCellToNum &&
          this.state.doneNums.includes(this.state.activeCellToNum[n])
        }
        failed={this.state.failed}
        onNumClick={this.onNextNumClick}
      />
    ));
  }

  onNextNumClick(num) {
    console.log("onNextNumClick", num);
    if (!this.state.turned && num !== 1) {
      return;
    }

    if (num === 1) {
      this.setState({
        nextNum: 2,
        turned: true,
        doneNums: _.concat(this.state.doneNums, [1])
      });
    } else if (num === this.state.nextNum) {
      this.setState({
        nextNum: this.state.nextNum + 1,
        doneNums: _.concat(this.state.doneNums, [num])
      });
      // TODO finish when num == 9
    } else if (num !== this.state.nextNum) {
      this.setState({
        failed: true
      });
    }
  }

  onReset() {
    this.reset();
  }

  reset() {
    this.setState({
      activeCellToNum: calculateRandomPlaces(this.cells),
      nextNum: 1,
      doneNums: [],
      turned: false,
      failed: false
    });
  }
}

export default App;
