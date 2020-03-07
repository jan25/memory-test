import _ from "lodash";

const NUMBER_CARD_MARGIN = 5;
const NUMBER_CARD_WIDTH = 100 + 2 * NUMBER_CARD_MARGIN;
const NUMBER_CARD_HEIGHT = NUMBER_CARD_WIDTH;

export const calculateRowsColumns = (width, height) => {
  let rows = parseInt(width / NUMBER_CARD_WIDTH);
  let cols = parseInt(height / NUMBER_CARD_HEIGHT);
  return {
    rows,
    cols
  };
};

export const calculateRandomPlaces = (numCells, numNums) => {
  let cells = _.range(0, numCells);
  let shuffled = _.shuffle(cells);
  let selected = _.slice(shuffled, 0, numNums);

  let cellToNum = {};
  let num = 1;
  _.forEach(selected, cell => {
    cellToNum[cell] = num++;
  });

  return cellToNum;
};
