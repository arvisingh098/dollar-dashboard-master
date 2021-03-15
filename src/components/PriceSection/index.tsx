import React from "react";
import BigNumber from "bignumber.js";

function PriceSection({
  label,
  amt,
  symbol = "",
  forceDisplay = false,
}: {
  label: string;
  amt: string | number | BigNumber;
  symbol?: string;
  forceDisplay?: boolean;
}) {
  const amtBN = new BigNumber(amt);
  if (amtBN.gt(new BigNumber(0)) || forceDisplay) {
    return (
      <div>
        <span>{label}</span>
        <span>{amtBN.toNumber().toFixed(5)}</span>
        <span>{symbol}</span>
      </div>
    );
  }
  return <div />;
}

export default PriceSection;
