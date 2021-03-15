import React, { useState, useEffect } from "react";

import {
  getImplementation,
  getStatusOf,
  getTokenBalance,
  getTokenTotalSupply,
} from "../../utils/infura";
import { ESDS } from "../../constants/tokens";
import { toTokenUnitsBN } from "../../utils/number";
import BigNumber from "bignumber.js";
import GovernanceHeader from "./Header";
import ProposeCandidate from "./ProposeCandidate";
import CandidateHistory from "./CandidateHistory";
import { canPropose } from "../../utils/gov";

//Components
import IconHeader from "../../components/IconHeader";
import Row from "../../components/Row";
import Container from "../../components/Container";

function Governance({ user }: { user: string }) {
  const [stake, setStake] = useState(new BigNumber(0));
  const [totalStake, setTotalStake] = useState(new BigNumber(0));
  const [userStatus, setUserStatus] = useState(0);
  const [implementation, setImplementation] = useState("0x");

  useEffect(() => {
    if (user === "") {
      setStake(new BigNumber(0));
      setUserStatus(0);
      return;
    }
    let isCancelled = false;

    async function updateUserInfo() {
      const [statusStr, stakeStr] = await Promise.all([
        getStatusOf(ESDS.addr, user),
        getTokenBalance(ESDS.addr, user),
      ]);

      if (!isCancelled) {
        setStake(toTokenUnitsBN(stakeStr, ESDS.decimals));
        setUserStatus(parseInt(statusStr, 10));
      }
    }
    updateUserInfo();
    const id = setInterval(updateUserInfo, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      const [totalStakeStr, implementationStr] = await Promise.all([
        getTokenTotalSupply(ESDS.addr),
        getImplementation(ESDS.addr),
      ]);

      if (!isCancelled) {
        setTotalStake(toTokenUnitsBN(totalStakeStr, ESDS.decimals));
        setImplementation(implementationStr);
      }
    }
    updateUserInfo();
    const id = setInterval(updateUserInfo, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  return (
    <Container>
      <>
        <div className="margin">
          <IconHeader icon={<i className="fas fa-poll" />} text="Governance" />

          <Row title="Governance">
            <GovernanceHeader
              stake={stake}
              totalStake={totalStake}
              accountStatus={userStatus}
              implementation={implementation}
            />
          </Row>
        </div>
        {canPropose(stake, totalStake) ? (
          <>
            <p>Propose Candidate</p>
            <ProposeCandidate
              user={user}
              stake={stake}
              totalStake={totalStake}
              accountStatus={userStatus}
            />
          </>
        ) : (
          ""
        )}
        <h3 className="table-name">Candidate History</h3>
        <CandidateHistory user={user} />
      </>
    </Container>
  );
}

export default Governance;
