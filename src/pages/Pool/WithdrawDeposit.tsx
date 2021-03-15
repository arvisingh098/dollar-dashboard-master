import React, { useState } from "react";
import BigNumber from "bignumber.js";
import { approve, depositPool, withdrawPool } from "../../utils/web3";
import { isPos, toBaseUnitBN } from "../../utils/number";
import { UNI } from "../../constants/tokens";
import { MAX_UINT256 } from "../../constants/values";

//Components
import Container from "../../components/Container";
import Button from "../../components/Button";
import BalanceBlock from "../../components/BalanceBlock";
import MaxButton from "../../components/MaxButton";
import BigNumberInput from "../../components/BigNumInput";

type WithdrawDepositProps = {
  poolAddress: string;
  user: string;
  balance: BigNumber;
  allowance: BigNumber;
  stagedBalance: BigNumber;
  status: number;
};

function WithdrawDeposit({
  poolAddress,
  user,
  balance,
  allowance,
  stagedBalance,
  status,
}: WithdrawDepositProps) {
  const [depositAmount, setDepositAmount] = useState(new BigNumber(0));
  const [withdrawAmount, setWithdrawAmount] = useState(new BigNumber(0));

  return (
    <>
      {allowance.comparedTo(MAX_UINT256) === 0 ? (
        <div>
          {/* total Issued */}
          <div>
            <BalanceBlock
              asset="Staged"
              balance={stagedBalance}
              suffix={"UNI-V2"}
            />
          </div>
          {/* Deposit UNI-V2 into Pool */}
          <div>
            <div>
              <div>
                <>
                  <BigNumberInput
                    adornment="UNI-V2"
                    value={depositAmount}
                    setter={setDepositAmount}
                    disabled={status !== 0}
                  />
                  <MaxButton
                    onClick={() => {
                      setDepositAmount(balance);
                    }}
                  />
                </>
              </div>
              <div>
                <Button
                  title="Deposit"
                  onButtonClick={() => {
                    depositPool(
                      poolAddress,
                      toBaseUnitBN(depositAmount, UNI.decimals),
                      (hash) => setDepositAmount(new BigNumber(0))
                    );
                  }}
                  disabled={
                    poolAddress === "" || status !== 0 || !isPos(depositAmount)
                  }
                />
              </div>
            </div>
          </div>
          <div />
          {/* Withdraw Døllar from DAO */}
          <div>
            <div>
              <div>
                <>
                  <BigNumberInput
                    adornment="UNI-V2"
                    value={withdrawAmount}
                    setter={setWithdrawAmount}
                    disabled={status !== 0}
                  />
                  <MaxButton
                    onClick={() => {
                      setWithdrawAmount(stagedBalance);
                    }}
                  />
                </>
              </div>
              <div>
                <Button
                  title="Withdraw"
                  onButtonClick={() => {
                    withdrawPool(
                      poolAddress,
                      toBaseUnitBN(withdrawAmount, UNI.decimals),
                      (hash) => setWithdrawAmount(new BigNumber(0))
                    );
                  }}
                  disabled={
                    poolAddress === "" || status !== 0 || !isPos(withdrawAmount)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="centered">
          {/* total Issued */}

          <BalanceBlock
            asset="Staged"
            balance={stagedBalance}
            suffix={"UNI-V2"}
          />

          <div />
          {/* Approve Pool to spend UNI-V2 */}

          <Button
            className="wide"
            title="Approve"
            onButtonClick={() => {
              approve(UNI.addr, poolAddress);
            }}
            disabled={poolAddress === "" || user === ""}
          />
        </div>
      )}
    </>
  );
}

export default WithdrawDeposit;
