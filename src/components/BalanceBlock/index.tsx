import React from "react";

import BigNumber from "bignumber.js";
import { formatBN } from "../../utils/number";

//Style
import "./style.css";

type BlanceBlockProps = {
  asset: string;
  balance: BigNumber | string | number;
  suffix?: string;
};

function BalanceBlock({ asset, balance, suffix = "" }: BlanceBlockProps) {
  let integer = "0";
  let digits = "0";
  const balanceBN = new BigNumber(balance);
  if (balanceBN.gte(new BigNumber(0))) {
    const tokens = formatBN(balanceBN, 2).split(".");
    integer = tokens[0];
    digits = tokens[1];
  }

  return (
    <div className="BalanceBlock">
      <h3>{asset}</h3>
      <div className="balance-value">
        <span>{integer}</span>.<span> {digits} </span>
        {suffix === "" ? "" : <span>{suffix}</span>}
      </div>
    </div>
  );
}

export default BalanceBlock;
