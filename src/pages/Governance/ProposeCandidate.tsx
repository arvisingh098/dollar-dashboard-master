import React, { useState } from "react";

import BigNumber from "bignumber.js";
import { recordVote } from "../../utils/web3";

import { ESDS } from "../../constants/tokens";
import { canPropose } from "../../utils/gov";

//Components
import Container from "../../components/Container";
import Button from "../../components/Button";

type ProposeCandidateProps = {
  user: string;
  stake: BigNumber;
  totalStake: BigNumber;
  accountStatus: number;
};

function plausibleCandidate(candidate: string): boolean {
  return /^(0x)[0-9a-fA-F]{40}$/i.test(candidate);
}

function ProposeCandidate({
  user,
  stake,
  totalStake,
  accountStatus,
}: ProposeCandidateProps) {
  const [candidate, setCandidate] = useState("0x");

  return (
    <Container>
      <div>
        {/* User balance */}
        <div>
          <>
            <input
              type="text"
              value={candidate}
              onChange={(event) => {
                if (event.target.value) {
                  setCandidate(event.target.value);
                } else {
                  setCandidate("0x");
                }
              }}
            ></input>
          </>
        </div>
        <div />
        {/* Purchase coupons */}
        <div>
          <Button
            title="Propose"
            onButtonClick={() => {
              recordVote(
                ESDS.addr,
                candidate,
                1 // APPROVE
              );
            }}
            disabled={
              user === "" ||
              !canPropose(stake, totalStake) ||
              !plausibleCandidate(candidate) ||
              accountStatus === 1
            }
          />
        </div>
      </div>
    </Container>
  );
}

export default ProposeCandidate;
