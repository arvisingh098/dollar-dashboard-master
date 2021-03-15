import React from "react";

import "./style.css";

export interface MaxButtonProps {
  onClick: Function;
}

const MaxButton: React.SFC<MaxButtonProps> = ({ onClick }) => {
  return (
    <div className="MaxButton">
      <button onClick={() => onClick}>
        <span> Max </span>
      </button>
    </div>
  );
};

export default MaxButton;
