import React from "react";

//Components
import NumberBlock from "../../components/NumberBlock";
import TextBlock from "../../components/TextBlock";

type AccountPageHeaderProps = {
  epoch: number;
  epochTime: number;
};

const EpochPageHeader = ({ epoch, epochTime }: AccountPageHeaderProps) => (
  <ul>
    <li>
      <NumberBlock title="Current" num={epoch} />
    </li>
    <li>
      <NumberBlock title="Available" num={epochTime} />
    </li>
    <li>
      <TextBlock label="Period" text={epoch < 106 ? "24 hours" : "8 hours"} />
    </li>
  </ul>
);

export default EpochPageHeader;
