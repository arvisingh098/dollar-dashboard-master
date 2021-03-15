import React from "react";
import BigNumber from "bignumber.js";

//Components
import BalanceBlock from "../../../components/BalanceBlock";
import TextBlock from "../../../components/TextBlock";

//Utils
import { ownership } from "../../../utils/number";

//Style
import "./index.css";

type AccountPageHeaderProps = {
  accountESDBalance: BigNumber;
  accountESDSBalance: BigNumber;
  totalESDSSupply: BigNumber;
  accountStagedBalance: BigNumber;
  accountBondedBalance: BigNumber;
  accountStatus: number;
  unlocked: number;
};

const STATUS_MAP = ["Unlocked", "Locked", "Locked"];

function status(accountStatus, unlocked) {
  return (
    STATUS_MAP[accountStatus] +
    (accountStatus === 0 ? "" : " until " + unlocked)
  );
}

const AccountPageHeader = ({
  accountESDBalance,
  accountESDSBalance,
  totalESDSSupply,
  accountStagedBalance,
  accountBondedBalance,
  accountStatus,
  unlocked,
}: AccountPageHeaderProps) => (
  <ul>
    <li>
      <BalanceBlock
        asset="Balance"
        balance={accountESDBalance}
        suffix={" ESD"}
      />
    </li>
    <li>
      <BalanceBlock
        asset="Staged"
        balance={accountStagedBalance}
        suffix={" ESD"}
      />
    </li>
    <li>
      <BalanceBlock
        asset="Bonded"
        balance={accountBondedBalance}
        suffix={" ESD"}
      />
    </li>
    <li>
      <BalanceBlock
        asset="DAO Ownership"
        balance={ownership(accountESDSBalance, totalESDSSupply)}
        suffix={"%"}
      />
    </li>
    <li>
      <TextBlock label="Status" text={status(accountStatus, unlocked)} />
    </li>
  </ul>
);

export default AccountPageHeader;
