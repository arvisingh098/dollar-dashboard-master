import React from "react";
import BigNumber from "bignumber.js";

//Components
import BalanceBlock from "../../components/BalanceBlock";
import TextBlock from "../../components/TextBlock";

//Utils
import { ownership } from "../../utils/number";

type PoolPageHeaderProps = {
  accountUNIBalance: BigNumber;
  accountBondedBalance: BigNumber;
  accountRewardedESDBalance: BigNumber;
  accountClaimableESDBalance: BigNumber;
  poolTotalBonded: BigNumber;
  accountPoolStatus: number;
  unlocked: number;
};

const STATUS_MAP = ["Unlocked", "Locked"];

function status(accountStatus, unlocked) {
  return (
    STATUS_MAP[accountStatus] +
    (accountStatus === 0 ? "" : " until " + unlocked)
  );
}

const PoolPageHeader = ({
  accountUNIBalance,
  accountBondedBalance,
  accountRewardedESDBalance,
  accountClaimableESDBalance,
  poolTotalBonded,
  accountPoolStatus,
  unlocked,
}: PoolPageHeaderProps) => (
  <ul>
    <li>
      <BalanceBlock
        asset="Balance"
        balance={accountUNIBalance}
        suffix={" UNI-V2"}
      />
    </li>
    <li>
      <BalanceBlock
        asset="Rewarded"
        balance={accountRewardedESDBalance}
        suffix={" ESD"}
      />
    </li>
    <li>
      <BalanceBlock
        asset="Claimable"
        balance={accountClaimableESDBalance}
        suffix={" ESD"}
      />
    </li>
    <li>
      <BalanceBlock
        asset="Pool Ownership"
        balance={ownership(accountBondedBalance, poolTotalBonded)}
        suffix={"%"}
      />
    </li>
    <li>
      <TextBlock
        label="Pool Status"
        text={status(accountPoolStatus, unlocked)}
      />
    </li>
  </ul>
);

export default PoolPageHeader;
