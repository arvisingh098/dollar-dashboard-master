import React from "react";

//Components
import NumberBlock from "../../components/NumberBlock";

type CommitHeaderProps = {
  epoch: number;
  startEpoch: number;
  periodEpoch: number;
};

const CommitHeader = ({
  epoch,
  startEpoch,
  periodEpoch,
}: CommitHeaderProps) => (
  <ul>
    <li>
      <NumberBlock title="Epoch" num={epoch} />
    </li>
    <li>
      <NumberBlock title="Starts" num={startEpoch} />
    </li>
    <li>
      <NumberBlock title="Period" num={periodEpoch} />
    </li>
  </ul>
);

export default CommitHeader;
