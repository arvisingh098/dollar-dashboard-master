import React from "react";

import BigNumber from "bignumber.js";

//Components
import BalanceBlock from "../../components/BalanceBlock";

//Utils
import { ownership } from "../../utils/number";

type CouponMarketHeaderProps = {
  debt: BigNumber;
  supply: BigNumber;
  coupons: BigNumber;
  premium: BigNumber;
  redeemable: BigNumber;
};

const CouponMarketHeader = ({
  debt,
  supply,
  coupons,
  premium,
  redeemable,
}: CouponMarketHeaderProps) => (
  <ul>
    <li>
      <BalanceBlock
        asset="Debt Ratio"
        balance={ownership(debt, supply)}
        suffix={"%"}
      />
    </li>
    <li>
      <BalanceBlock asset="Total Debt" balance={debt} suffix={"ESD"} />
    </li>
    <li>
      <BalanceBlock asset="Coupons" balance={coupons} />
    </li>
    <li>
      <BalanceBlock
        asset="Premium"
        balance={premium.multipliedBy(100)}
        suffix={"%"}
      />
    </li>
    <li>
      <BalanceBlock asset="Redeemable" balance={redeemable} />
    </li>
  </ul>
);

export default CouponMarketHeader;
