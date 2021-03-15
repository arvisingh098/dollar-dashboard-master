import React, { useState } from "react";
import BigNumber from "bignumber.js";
import { approve, providePool } from "../../utils/web3";
import { isPos, toBaseUnitBN, toTokenUnitsBN } from "../../utils/number";
import { ESD, USDC } from "../../constants/tokens";
import { MAX_UINT256 } from "../../constants/values";

//Components
import BigNumberInput from "../../components/BigNumInput";
import BalanceBlock from "../../components/BalanceBlock";
import MaxButton from "../../components/MaxButton";
import PriceSection from "../../components/PriceSection";
import Button from "../../components/Button";

//Style
import "./style.css";

type ProvideProps = {
  poolAddress: string;
  user: string;
  rewarded: BigNumber;
  pairBalanceESD: BigNumber;
  pairBalanceUSDC: BigNumber;
  userUSDCBalance: BigNumber;
  userUSDCAllowance: BigNumber;
  status: number;
};

function Provide({
  poolAddress,
  user,
  rewarded,
  pairBalanceESD,
  pairBalanceUSDC,
  userUSDCBalance,
  userUSDCAllowance,
  status,
}: ProvideProps) {
  const [provideAmount, setProvideAmount] = useState(new BigNumber(0));
  const [usdcAmount, setUsdcAmount] = useState(new BigNumber(0));

  const USDCToESDRatio = pairBalanceUSDC.isZero()
    ? new BigNumber(1)
    : pairBalanceUSDC.div(pairBalanceESD);

  const onChangeAmountESD = (amountESD) => {
    if (!amountESD) {
      setProvideAmount(new BigNumber(0));
      setUsdcAmount(new BigNumber(0));
      return;
    }

    const amountESDBN = new BigNumber(amountESD);
    setProvideAmount(amountESDBN);

    const amountESDBU = toBaseUnitBN(amountESDBN, ESD.decimals);
    const newAmountUSDC = toTokenUnitsBN(
      amountESDBU
        .multipliedBy(USDCToESDRatio)
        .integerValue(BigNumber.ROUND_FLOOR),
      ESD.decimals
    );
    setUsdcAmount(newAmountUSDC);
  };

  return (
    <div className="Provide">
      {userUSDCAllowance.comparedTo(MAX_UINT256.dividedBy(2)) > 0 ? (
        <ul>
          {/* total rewarded */}
          <li>
            <BalanceBlock asset="Rewarded" balance={rewarded} suffix={"ESD"} />
          </li>
          <li>
            <BalanceBlock
              asset="USDC Balance"
              balance={userUSDCBalance}
              suffix={"USDC"}
            />
          </li>
          {/* Provide liquidity using Pool rewards */}
          <div>
            <div>
              <li>
                <BigNumberInput
                  adornment="ESD"
                  value={provideAmount}
                  setter={onChangeAmountESD}
                  disabled={status === 1}
                />
                <PriceSection
                  label="Requires "
                  amt={usdcAmount}
                  symbol=" USDC"
                />
                <MaxButton
                  onClick={() => {
                    onChangeAmountESD(rewarded);
                  }}
                />
              </li>
              <li>
                <Button
                  className="wide"
                  title="Provide"
                  onButtonClick={() => {
                    providePool(
                      poolAddress,
                      toBaseUnitBN(provideAmount, ESD.decimals),
                      (hash) => setProvideAmount(new BigNumber(0))
                    );
                  }}
                  disabled={
                    poolAddress === "" ||
                    status !== 0 ||
                    !isPos(provideAmount) ||
                    usdcAmount.isGreaterThan(userUSDCBalance)
                  }
                />
              </li>
            </div>
          </div>
        </ul>
      ) : (
        <ul>
          {/* total rewarded */}
          <li>
            <BalanceBlock asset="Rewarded" balance={rewarded} suffix={"ESD"} />
          </li>
          <li>
            <BalanceBlock
              asset="USDC Balance"
              balance={userUSDCBalance}
              suffix={"USDC"}
            />
          </li>
          {/* Approve Pool to spend USDC */}
          <li>
            <Button
              className="wide"
              title="+ Approve"
              onButtonClick={() => {
                approve(USDC.addr, poolAddress);
              }}
              disabled={poolAddress === "" || user === ""}
            />
          </li>
        </ul>
      )}

      <span>Zap your rewards directly to LP by providing more USDC</span>
    </div>
  );
}

export default Provide;
