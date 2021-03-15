import React from "react";

import BigNumber from "bignumber.js";

//Style
import "./style.css";

type NumberBlockProps = {
  title: string;
  num: BigNumber | string | number;
};

function NumberBlock({ title, num }: NumberBlockProps) {
  const numNum = new BigNumber(num).toNumber();

  return (
    <div className="NumberBlock">
      <h3>{title}</h3>
      <p>{numNum}</p>
    </div>
  );
}

export default NumberBlock;
