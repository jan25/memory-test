import React, { useState, useEffect, useRef, useCallback } from "react";
import _ from "lodash";
import NumberCard from "./NumberCard";
import Info from "./Info";
import { calculateRandomPlaces, calculateRowsColumns } from "./Utils";
import { playSound } from "./Sounds";
import "./App.css";

const ACTIVE_NUMBERS = 9; // numbers start from 1
const RESET_INTERVAL = 6000; // 6s

const App = () => {
  const gameAreaRef = useRef(null);

  const [gameState, setGameState] = useState({
    activeCellToNum: {},
    nextNum: 1,
    turned: false,
    failed: false
  });

  const [gameAreaDims, setGameAreaDims] = useState({
    gameAreaHeight: 0,
    gameAreaWidth: 0,
    cells: 0
  });

  const reset = useCallback(() => {
    setGameState({
      activeCellToNum: calculateRandomPlaces(gameAreaDims.cells, ACTIVE_NUMBERS),
      nextNum: 1,
      turned: false,
      failed: false
    });
  }, [gameAreaDims.cells, setGameState]);

  useEffect(() => {
    const gameAreaNode = gameAreaRef.current.getBoundingClientRect();
    const gameAreaHeight = gameAreaNode.height;
    const gameAreaWidth = gameAreaNode.width;
    const { rows, cols } = calculateRowsColumns(gameAreaWidth, gameAreaHeight);
    const cells = rows * cols;
    setGameAreaDims({ gameAreaHeight, gameAreaWidth, cells });
  }, [setGameAreaDims]);

  useEffect(() => {
    reset(gameAreaDims.cells);
  }, [gameAreaDims.cells, reset]);

  const [autoResetTimeout, setAutoResetTimeout] = useState(null);

  const isActive = (cell) => {
    return cell in gameState.activeCellToNum;
  }

  const cellToNum = (cell) => {
    return isActive(cell) ? gameState.activeCellToNum[cell] : null;
  }

  const cardIsDone = (cell) => {
    return cellToNum(cell) < gameState.nextNum;
  }

  const onNextNumClick = (num) => {
    if (!gameState.turned && num !== 1) {
      return;
    }

    // Begin playing a round
    if (num === 1) {
      setGameState({
        ...gameState,
        nextNum: 2,
        turned: true
      });
      playSound("pop");

      return;
    }

    // Each good move in a round
    if (num === gameState.nextNum) {
      setGameState({
        ...gameState,
        nextNum: gameState.nextNum + 1
      });

      if (num === ACTIVE_NUMBERS) {
        setAutoResetTimeout(setTimeout(onReset, RESET_INTERVAL / 2));
        playSound("success");
      } else {
        playSound("pop");
      }

      return;
    }

    // Bad move ends the round 
    if (num !== gameState.nextNum) {
      setGameState({
        ...gameState,
        failed: true
      });
      setAutoResetTimeout(setTimeout(onReset, RESET_INTERVAL));
      playSound("fail");

      return;
    }
  }

  const onReset = () => {
    clearTimeout(autoResetTimeout);
    reset();
    playSound("flip");
  }

  const showResetBtn = gameState.turned || gameState.failed;

  return (
    <>
      <div ref={gameAreaRef} id="game-area">
        {
          _.range(0, gameAreaDims.cells)
            .map(num => (
              <NumberCard
                key={num}
                active={isActive(num)}
                num={cellToNum(num)}
                turned={gameState.turned}
                done={cardIsDone(num)}
                failed={gameState.failed}
                onNumClick={onNextNumClick}
              />
            ))
        }
      </div>

      <div id="game-info">
        <Info
          showInfo={!showResetBtn}
          showReset={showResetBtn}
          onReset={onReset}
        />
      </div>
    </>
  );
}

export default App;
