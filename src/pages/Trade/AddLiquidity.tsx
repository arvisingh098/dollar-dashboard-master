import React, { useState } from "react";
import BigNumber from "bignumber.js";
import { addLiquidity } from "../../utils/web3";

import { toBaseUnitBN, toTokenUnitsBN } from "../../utils/number";
import { ESD, UNI, USDC } from "../../constants/tokens";
import { SLIPPAGE } from "../../utils/calculation";

//Components
import Container from "../../components/Container";
import BigNumberInput from "../../components/BigNumInput";
import BalanceBlock from "../../components/BalanceBlock";
import MaxButton from "../../components/MaxButton";
import PriceSection from "../../components/PriceSection";
import Button from "../../components/Button";

type AddliquidityProps = {
  userBalanceESD: BigNumber;
  userBalanceUSDC: BigNumber;
  pairBalanceESD: BigNumber;
  pairBalanceUSDC: BigNumber;
  pairTotalSupplyUNI: BigNumber;
};

function AddLiquidity({
  userBalanceESD,
  userBalanceUSDC,
  pairBalanceESD,
  pairBalanceUSDC,
  pairTotalSupplyUNI,
}: AddliquidityProps) {
  const [amountUSDC, setAmountUSDC] = useState(new BigNumber(0));
  const [amountESD, setAmountESD] = useState(new BigNumber(0));
  const [amountUNI, setAmountUNI] = useState(new BigNumber(0));

  const USDCToESDRatio = pairBalanceUSDC.isZero()
    ? new BigNumber(1)
    : pairBalanceUSDC.div(pairBalanceESD);
  const ESDToUSDCRatio = pairBalanceESD.isZero()
    ? new BigNumber(1)
    : pairBalanceESD.div(pairBalanceUSDC);

  const onChangeAmountUSDC = (amountUSDC) => {
    if (!amountUSDC) {
      setAmountESD(new BigNumber(0));
      setAmountUSDC(new BigNumber(0));
      setAmountUNI(new BigNumber(0));
      return;
    }

    const amountUSDCBN = new BigNumber(amountUSDC);
    setAmountUSDC(amountUSDCBN);

    const amountUSDCBU = toBaseUnitBN(amountUSDCBN, USDC.decimals);
    const newAmountESD = toTokenUnitsBN(
      amountUSDCBU
        .multipliedBy(ESDToUSDCRatio)
        .integerValue(BigNumber.ROUND_FLOOR),
      USDC.decimals
    );
    setAmountESD(newAmountESD);

    const newAmountESDBU = toBaseUnitBN(newAmountESD, ESD.decimals);
    const pairTotalSupplyBU = toBaseUnitBN(pairTotalSupplyUNI, UNI.decimals);
    const pairBalanceESDBU = toBaseUnitBN(pairBalanceESD, ESD.decimals);
    const newAmountUNIBU = pairTotalSupplyBU
      .multipliedBy(newAmountESDBU)
      .div(pairBalanceESDBU)
      .integerValue(BigNumber.ROUND_FLOOR);
    const newAmountUNI = toTokenUnitsBN(newAmountUNIBU, UNI.decimals);
    setAmountUNI(newAmountUNI);
  };

  const onChangeAmountESD = (amountESD) => {
    if (!amountESD) {
      setAmountESD(new BigNumber(0));
      setAmountUSDC(new BigNumber(0));
      setAmountUNI(new BigNumber(0));
      return;
    }

    const amountESDBN = new BigNumber(amountESD);
    setAmountESD(amountESDBN);

    const amountESDBU = toBaseUnitBN(amountESDBN, ESD.decimals);
    const newAmountUSDC = toTokenUnitsBN(
      amountESDBU
        .multipliedBy(USDCToESDRatio)
        .integerValue(BigNumber.ROUND_FLOOR),
      ESD.decimals
    );
    setAmountUSDC(newAmountUSDC);

    const newAmountUSDCBU = toBaseUnitBN(newAmountUSDC, USDC.decimals);
    const pairTotalSupplyBU = toBaseUnitBN(pairTotalSupplyUNI, UNI.decimals);
    const pairBalanceUSDCBU = toBaseUnitBN(pairBalanceUSDC, USDC.decimals);
    const newAmountUNIBU = pairTotalSupplyBU
      .multipliedBy(newAmountUSDCBU)
      .div(pairBalanceUSDCBU)
      .integerValue(BigNumber.ROUND_FLOOR);
    const newAmountUNI = toTokenUnitsBN(newAmountUNIBU, UNI.decimals);
    setAmountUNI(newAmountUNI);
  };

  return (
    <Container>
      <div>
        {/* Pool Status */}
        <div>
          <BalanceBlock asset="USDC Balance" balance={userBalanceUSDC} />
        </div>
        {/* Add liquidity to pool */}
        <div>
          <div>
            <div>
              <>
                <BigNumberInput
                  adornment="ESD"
                  value={amountESD}
                  setter={onChangeAmountESD}
                />
                <MaxButton
                  onClick={() => {
                    onChangeAmountESD(userBalanceESD);
                  }}
                />
              </>
            </div>
            <div>
              <BigNumberInput
                adornment="USDC"
                value={amountUSDC}
                setter={onChangeAmountUSDC}
              />
              <PriceSection
                label="Mint "
                amt={amountUNI}
                symbol=" Pool Tokens"
              />
            </div>
            <div>
              <Button
                title="Add Liquidity"
                onButtonClick={() => {
                  const amountESDBU = toBaseUnitBN(amountESD, ESD.decimals);
                  const amountUSDCBU = toBaseUnitBN(amountUSDC, USDC.decimals);
                  addLiquidity(amountESDBU, amountUSDCBU, SLIPPAGE);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AddLiquidity;
