import React from "react";
import BigNumber from "bignumber.js";

//Components
import AddressBlock from "../../components/AddressBlock";
import BalanceBlock from "../../components/BalanceBlock";

type TradePageHeaderProps = {
  pairBalanceESD: BigNumber;
  pairBalanceUSDC: BigNumber;
  uniswapPair: string;
};

const TradePageHeader = ({
  pairBalanceESD,
  pairBalanceUSDC,
  uniswapPair,
}: TradePageHeaderProps) => {
  const price = pairBalanceUSDC.dividedBy(pairBalanceESD);

  return (
    <ul>
      <li>
        <BalanceBlock asset="ESD Price" balance={price} suffix={"USDC"} />
      </li>
      <li>
        <BalanceBlock
          asset="ESD Liquidity"
          balance={pairBalanceESD}
          suffix={"ESD"}
        />
      </li>
      <li>
        <BalanceBlock
          asset="USDC Liquidity"
          balance={pairBalanceUSDC}
          suffix={"USDC"}
        />
      </li>
      <li>
        <AddressBlock label="Uniswap Contract" address={uniswapPair} />
      </li>
    </ul>
  );
};

export default TradePageHeader;
