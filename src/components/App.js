import React, { Component } from "react";
import _ from "lodash";
import NumberCard from "./NumberCard";
import Info from "./Info";
import { calculateRandomPlaces, calculateRowsColumns } from "./Utils";
import { playSound } from "./Sounds";
import "./App.css";

const ACTIVE_NUMBERS = 5; // numbers start from 1
const RESET_INTERVAL = 6000; // 6s

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
    this.autoResetInterval = null;
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
    const cellNums = _.range(0, this.cells);

    return cellNums.map(n => (
      <NumberCard
        key={n}
        active={this.isActive(n)}
        num={this.cellToNum(n)}
        turned={this.state.turned}
        done={this.cardIsDone(n)}
        failed={this.state.failed}
        onNumClick={this.onNextNumClick}
      />
    ));
  }

  isActive(cell) {
    return cell in this.state.activeCellToNum;
  }

  cellToNum(cell) {
    return this.isActive(cell) ? this.state.activeCellToNum[cell] : null;
  }

  cardIsDone(cell) {
    return this.state.doneNums.includes(this.cellToNum(cell));
  }

  onNextNumClick(num) {
    if (!this.state.turned && num !== 1) {
      return;
    }

    if (num === 1) {
      this.setState({
        nextNum: 2,
        turned: true,
        doneNums: _.concat(this.state.doneNums, [1])
      });
      playSound("pop");
    } else if (num === this.state.nextNum) {
      this.setState({
        nextNum: this.state.nextNum + 1,
        doneNums: _.concat(this.state.doneNums, [num])
      });
      if (num === ACTIVE_NUMBERS) {
        this.autoResetInterval = setInterval(this.onReset, RESET_INTERVAL / 2);
        playSound("success");
      } else {
        playSound("pop");
      }
    } else if (num !== this.state.nextNum) {
      this.setState({
        failed: true
      });
      this.autoResetInterval = setInterval(this.onReset, RESET_INTERVAL);
      playSound("fail");
    }
  }

  onReset() {
    clearInterval(this.autoResetInterval);
    this.reset();
    playSound("flip");
  }

  reset() {
    this.setState({
      activeCellToNum: calculateRandomPlaces(this.cells, ACTIVE_NUMBERS),
      nextNum: 1,
      doneNums: [],
      turned: false,
      failed: false
    });
  }
}

export default App;
