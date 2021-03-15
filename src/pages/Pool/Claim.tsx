import React, { useState } from "react";
import BigNumber from "bignumber.js";
import { claimPool } from "../../utils/web3";
import { isPos, toBaseUnitBN } from "../../utils/number";
import { ESD } from "../../constants/tokens";

//Components
import Container from "../../components/Container";
import BigNumberInput from "../../components/BigNumInput";
import BalanceBlock from "../../components/BalanceBlock";
import MaxButton from "../../components/MaxButton";
import Button from "../../components/Button";

type ClaimProps = {
  poolAddress: string;
  claimable: BigNumber;
  status: number;
};

function Claim({ poolAddress, claimable, status }: ClaimProps) {
  const [claimAmount, setClaimAmount] = useState(new BigNumber(0));

  return (
    <div className="Claim">
      <ul>
        {/* total Issued */}
        <li>
          <BalanceBlock asset="Claimable" balance={claimable} suffix={"ESD"} />
        </li>
        {/* Deposit UNI-V2 into Pool */}

        <div>
          <div className="input-submit">
            <BigNumberInput
              adornment="UNI-V2"
              value={claimAmount}
              setter={setClaimAmount}
              disabled={status !== 0}
            />
            <Button
              title="Claim"
              className="glued rectangle"
              onButtonClick={() => {
                claimPool(
                  poolAddress,
                  toBaseUnitBN(claimAmount, ESD.decimals),
                  (hash) => setClaimAmount(new BigNumber(0))
                );
              }}
              disabled={
                poolAddress === "" || status !== 0 || !isPos(claimAmount)
              }
            />
          </div>
          <div>
            <MaxButton
              onClick={() => {
                setClaimAmount(claimable);
              }}
            />
          </div>
        </div>
      </ul>

      <span>
        Unbond to make rewards claimable after your status is Unlocked
      </span>
    </div>
  );
}

export default Claim;
