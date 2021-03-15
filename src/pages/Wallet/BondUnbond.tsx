import React, { useState } from "react";

import BigNumber from "bignumber.js";
import BalanceBlock from "../../components/BalanceBlock";
import Container from "../../components/Container";
import MaxButton from "../../components/MaxButton";
import Button from "../../components/Button";
import { bond, unbondUnderlying } from "../../utils/web3";
import { isPos, toBaseUnitBN } from "../../utils/number";
import { ESD, ESDS } from "../../constants/tokens";
import TextBlock from "../../components/TextBlock";
import BigNumberInput from "../../components/BigNumInput";
import TableCell from "../../components/TableCell";

//Style
import "./style.css";

type BondUnbondProps = {
  staged: BigNumber;
  bonded: BigNumber;
  status: number;
  lockup: number;
};

function BondUnbond({ staged, bonded, status, lockup }: BondUnbondProps) {
  const [bondAmount, setBondAmount] = useState(new BigNumber(0));
  const [unbondAmount, setUnbondAmount] = useState(new BigNumber(0));

  return (
    <div className="BondUnbound">
      <TableCell>
        {/* Total bonded */}
        <BalanceBlock asset="Bonded" balance={bonded} suffix={"ESD"} />{" "}
        <TextBlock
          label="Exit Lockup"
          text={
            lockup === 0 ? "" : lockup === 1 ? "1 epoch" : `${lockup} epochs`
          }
        />
        {/* Total bonded */}
        {/* Bond Døllar within DAO */}
        <div>
          <div className="input-submit">
            <BigNumberInput
              adornment="ESD"
              value={bondAmount}
              setter={setBondAmount}
            />
            <Button
              title="+ Bond"
              className="bold glued rectangle"
              onButtonClick={() => {
                bond(ESDS.addr, toBaseUnitBN(bondAmount, ESD.decimals));
              }}
              disabled={
                status === 2 ||
                !isPos(bondAmount) ||
                bondAmount.isGreaterThan(staged)
              }
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
        {/* Unbond Døllar within DAO */}
        <div>
          <div className="input-submit">
            <BigNumberInput
              adornment="ESD"
              value={unbondAmount}
              setter={setUnbondAmount}
            />
            <Button
              title="Unbond"
              className="glued rectangle"
              onButtonClick={() => {
                unbondUnderlying(
                  ESDS.addr,
                  toBaseUnitBN(unbondAmount, ESD.decimals)
                );
              }}
              disabled={
                status === 2 ||
                !isPos(unbondAmount) ||
                unbondAmount.isGreaterThan(bonded)
              }
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
      <span className="centered">
        Bonding events will restart the lockup timer
      </span>
    </div>
  );
}

export default BondUnbond;
