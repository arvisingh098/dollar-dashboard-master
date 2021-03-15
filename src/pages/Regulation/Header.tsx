import React from "react";

import BigNumber from "bignumber.js";

//Components
import Distribution from "../../components/Distribution";
import "./style.css";

import { formatMoney, ownership } from "../../utils/number";

type RegulationHeaderProps = {
  totalSupply: BigNumber;

  totalBonded: BigNumber;
  totalStaged: BigNumber;
  totalRedeemable: BigNumber;

  poolLiquidity: BigNumber;
  poolRewarded: BigNumber;
  poolClaimable: BigNumber;

  legacyPoolRewarded: BigNumber;
  legacyPoolClaimable: BigNumber;

  totalDebt: BigNumber;
  totalCoupons: BigNumber;
  totalCouponsUnderlying: BigNumber;
  couponPremium: BigNumber;
};

const RegulationHeader = ({
  totalSupply,
  totalBonded,
  totalStaged,
  totalRedeemable,
  poolLiquidity,
  poolRewarded,
  poolClaimable,
  legacyPoolRewarded,
  legacyPoolClaimable,
  totalDebt,
  totalCoupons,
  totalCouponsUnderlying,
  couponPremium,
}: RegulationHeaderProps) => {
  const daoTotalSupply = totalBonded.plus(totalStaged).plus(totalRedeemable);
  const poolTotalSupply = poolLiquidity.plus(poolRewarded).plus(poolClaimable);
  const legacyPoolTotalSupply = legacyPoolRewarded.plus(legacyPoolClaimable);
  const circulatingSupply = totalSupply
    .minus(daoTotalSupply)
    .minus(poolTotalSupply)
    .minus(legacyPoolTotalSupply);

  return (
    <div className="Header">
      <Distribution
        title="SUPPLY ALLOCATION"
        description={`∅${formatMoney(totalSupply.toNumber())}`}
        items={[
          {
            item: "DAO",
            percentage: +ownership(daoTotalSupply, totalSupply)
              .toNumber()
              .toFixed(2),
          },
          {
            item: "Uniswap",
            percentage: +ownership(poolTotalSupply, totalSupply)
              .toNumber()
              .toFixed(2),
          },
          {
            item: "Circulating",
            percentage: +ownership(circulatingSupply, totalSupply)
              .toNumber()
              .toFixed(2),
          },
        ]}
      ></Distribution>
      <Distribution
        title="DAO BREAKDOWN"
        description={`∅${formatMoney(daoTotalSupply.toNumber())}`}
        items={[
          {
            item: "Bonded",
            percentage: +ownership(totalBonded, daoTotalSupply)
              .toNumber()
              .toFixed(2),
          },
          {
            item: "Staged",
            percentage: +ownership(totalStaged, daoTotalSupply)
              .toNumber()
              .toFixed(2),
          },
          {
            item: "Redeemable",
            percentage: +ownership(totalRedeemable, daoTotalSupply)
              .toNumber()
              .toFixed(2),
          },
        ]}
      ></Distribution>
      <Distribution
        title="UNISWAP BREAKDOWN"
        description={`∅${formatMoney(poolTotalSupply.toNumber())}`}
        items={[
          {
            item: "Liquidity",
            percentage: +ownership(poolLiquidity, poolTotalSupply)
              .toNumber()
              .toFixed(2),
          },
          {
            item: "Rewarded",
            percentage: +ownership(poolRewarded, poolTotalSupply)
              .toNumber()
              .toFixed(2),
          },
          {
            item: "Claimable",
            percentage: +ownership(poolClaimable, poolTotalSupply)
              .toNumber()
              .toFixed(2),
          },
        ]}
      ></Distribution>
    </div>
  );
};

export default RegulationHeader;
