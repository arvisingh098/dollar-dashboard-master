import React from "react";

import BigNumber from "bignumber.js";
import { ownership } from "../../utils/number";
import { GOVERNANCE_PROPOSAL_THRESHOLD } from "../../constants/values";

//Components
import TextBlock from "../../components/TextBlock";
import BalanceBlock from "../../components/BalanceBlock";
import AddressBlock from "../../components/AddressBlock";

type GovernanceHeaderProps = {
  stake: BigNumber;
  totalStake: BigNumber;
  accountStatus: number;
  implementation: string;
};

const STATUS_MAP = ["Frozen", "Fluid", "Locked"];

const GovernanceHeader = ({
  stake,
  totalStake,
  accountStatus,
  implementation,
}: GovernanceHeaderProps) => (
  <ul>
    <li>
      <BalanceBlock
        asset="DAO Ownership"
        balance={ownership(stake, totalStake)}
        suffix="%"
      />
    </li>
    <li>
      <BalanceBlock
        asset="Proposal Threshold"
        balance={GOVERNANCE_PROPOSAL_THRESHOLD.multipliedBy(100)}
        suffix="%"
      />
    </li>
    <li>
      <TextBlock label="Status" text={STATUS_MAP[accountStatus]} />
    </li>
    <li>
      <AddressBlock label="Implementation" address={implementation} />
    </li>
  </ul>
);

export default GovernanceHeader;
