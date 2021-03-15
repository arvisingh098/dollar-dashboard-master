import React from "react";

//Components
import Button from "../../components/Button";
import NumberBlock from "../../components/NumberBlock";

//Utils
import { ESDS } from "../../constants//tokens";
import { advance } from "../../utils/web3";

type AdvanceEpochProps = {
  user: string;
  epoch: number;
  epochTime: number;
};

function AdvanceEpoch({ user, epoch, epochTime }: AdvanceEpochProps) {
  return (
    <ul>
      <li>
        <NumberBlock title="Epoch (from current time)" num={epochTime} />
      </li>
      <li />
      <li>
        <Button
          title="Advance"
          className="wide"
          onButtonClick={() => {
            advance(ESDS.addr);
          }}
          disabled={user === "" || epoch >= epochTime}
        />
      </li>
    </ul>
  );
}

export default AdvanceEpoch;
