import React from "react";
import blackwhite from "../assets/checker-board.png";

const BlackWhiteCard = props => {
  return (
    <img
      src={blackwhite}
      height={props.width}
      width={props.width}
      alt="blackwhite card"
    />
  );
};

export default BlackWhiteCard;
