import React, { useState } from "react";
import BigNumber from "bignumber.js";
import { bondPool, unbondPool } from "../../utils/web3";
import { isPos, toBaseUnitBN } from "../../utils/number";
import { UNI } from "../../constants/tokens";

//Components
import TableCell from "../../components/TableCell";
import BigNumberInput from "../../components/BigNumInput";
import TextBlock from "../../components/TextBlock";
import BalanceBlock from "../../components/BalanceBlock";
import MaxButton from "../../components/MaxButton";
import Button from "../../components/Button";

//Styles
import "./style.css";

type BondUnbondProps = {
  poolAddress: string;
  staged: BigNumber;
  bonded: BigNumber;
  status: number;
  lockup: number;
};

function BondUnbond({
  poolAddress,
  staged,
  bonded,
  status,
  lockup,
}: BondUnbondProps) {
  const [bondAmount, setBondAmount] = useState(new BigNumber(0));
  const [unbondAmount, setUnbondAmount] = useState(new BigNumber(0));

  return (
    <div className="BondUnbond">
      <TableCell>
        {/* Total bonded */}

        <BalanceBlock asset="Bonded" balance={bonded} suffix={"UNI-V2"} />

        {/* Exit lockup */}

        <TextBlock
          label="Exit Lockup"
          text={
            lockup === 0 ? "" : lockup === 1 ? "1 epoch" : `${lockup} epochs`
          }
        />
        {/* Bond UNI-V2 within Pool */}

        <div>
          <div className="input-submit">
            <BigNumberInput
              adornment="UNI-V2"
              value={bondAmount}
              setter={setBondAmount}
            />
            <Button
              title="+ Bond"
              className="bold glued rectangle"
              onButtonClick={() => {
                bondPool(
                  poolAddress,
                  toBaseUnitBN(bondAmount, UNI.decimals),
                  (hash) => setBondAmount(new BigNumber(0))
                );
              }}
              disabled={poolAddress === "" || !isPos(bondAmount)}
            />
          </div>
          <div>
            <MaxButton
              onClick={() => {
                setBondAmount(staged);
              }}
            />
          </div>
        </div>
        <div />
        {/* Unbond UNI-V2 within Pool */}
        <div>
          <div className="input-submit">
            <BigNumberInput
              adornment="UNI-V2"
              value={unbondAmount}
              setter={setUnbondAmount}
            />
            <Button
              title="Unbond"
              className="glued rectangle"
              onButtonClick={() => {
                unbondPool(
                  poolAddress,
                  toBaseUnitBN(unbondAmount, UNI.decimals),
                  (hash) => setUnbondAmount(new BigNumber(0))
                );
              }}
              disabled={poolAddress === "" || !isPos(unbondAmount)}
            />
          </div>
          <div>
            <MaxButton
              onClick={() => {
                setUnbondAmount(bonded);
              }}
            />
          </div>
        </div>
      </TableCell>
      <span>Bonding events will restart the lockup timer </span>
    </div>
  );
}

export default BondUnbond;
