import React from "react";
import blackwhite from "../assets/checker-board.png";

const BlackWhiteCard = ({ width }) => {
  return (
    <img
      src={blackwhite}
      height={width}
      width={width}
      alt="blackwhite card"
    />
  );
};

export default BlackWhiteCard;
