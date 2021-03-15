import React, { useState } from "react";

import BigNumber from "bignumber.js";

//Components
import BalanceBlock from "../../components/BalanceBlock";
import MaxButton from "../../components/MaxButton";
import Button from "../../components/Button";
import BigNumberInput from "../../components/BigNumInput";
//Utils
import { approve, deposit, withdraw } from "../../utils/web3";
import { isPos, toBaseUnitBN } from "../../utils/number";

//Constants
import { ESD, ESDS } from "../../constants/tokens";
import { MAX_UINT256 } from "../../constants/values";
import TableCell from "../../components/TableCell";

//Icons

type WithdrawDepositProps = {
  user: string;
  balance: BigNumber;
  allowance: BigNumber;
  stagedBalance: BigNumber;
  status: number;
};

function WithdrawDeposit({
  user,
  balance,
  allowance,
  stagedBalance,
  status,
}: WithdrawDepositProps) {
  const [depositAmount, setDepositAmount] = useState(new BigNumber(0));
  const [withdrawAmount, setWithdrawAmount] = useState(new BigNumber(0));

  return (
    <div>
      {allowance.comparedTo(MAX_UINT256) === 0 ? (
        <div>
          {/* total Issued */}
          <div>
            <BalanceBlock
              asset="Staged"
              balance={stagedBalance}
              suffix={"ESD"}
            />
          </div>
          {/* Deposit Døllar into DAO */}
          <div>
            <div>
              <div>
                <BigNumberInput
                  adornment="ESD"
                  value={depositAmount}
                  setter={setDepositAmount}
                  disabled={status !== 0}
                />
                <MaxButton
                  onClick={() => {
                    setDepositAmount(balance);
                  }}
                />
              </div>
              <div>
                <Button
                  title="Deposit"
                  onButtonClick={() => {
                    deposit(
                      ESDS.addr,
                      toBaseUnitBN(depositAmount, ESD.decimals)
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div />

          <div>
            <div>
              <div>
                <BigNumberInput
                  adornment="ESD"
                  value={withdrawAmount}
                  setter={setWithdrawAmount}
                  disabled={status !== 0}
                />
                <MaxButton
                  onClick={() => {
                    setWithdrawAmount(stagedBalance);
                  }}
                />
              </div>
              <div>
                <Button
                  title="Withdraw"
                  onButtonClick={() => {
                    withdraw(
                      ESDS.addr,
                      toBaseUnitBN(withdrawAmount, ESD.decimals)
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <TableCell>
          {/* total Issued */}
          <BalanceBlock asset="Staged" balance={stagedBalance} suffix={"ESD"} />
          {/* Approve DAO to spend Døllar */}

          <Button
            title="+ Approve"
            className="wide"
            onButtonClick={() => {
              approve(ESD.addr, ESDS.addr);
            }}
            disabled={user === ""}
          />
        </TableCell>
      )}
    </div>
  );
}

export default WithdrawDeposit;
