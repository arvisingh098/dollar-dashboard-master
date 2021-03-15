import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DataView } from "@aragon/ui";

import {
  getAllProposals,
  getApproveFor,
  getEpoch,
  getIsInitialized,
  getRejectFor,
  getTokenTotalSupply,
  getTotalBondedAt,
} from "../../utils/infura";
import { ESDS } from "../../constants/tokens";
import { proposalStatus } from "../../utils/gov";
import BigNumber from "bignumber.js";

//Styles
import "./style.css";
import styled from "styled-components";

//Components
import AddressBlock from "../../components/AddressBlock";
import Button from "../../components/Button";

type CandidateHistoryProps = {
  user: string;
};

type Proposal = {
  index: number;
  candidate: string;
  account: string;
  start: number;
  period: number;
  status: string;
};

async function formatProposals(
  epoch: number,
  proposals: any[]
): Promise<Proposal[]> {
  const currentTotalStake = await getTokenTotalSupply(ESDS.addr);
  const initializeds = await Promise.all(
    proposals.map((p) => getIsInitialized(ESDS.addr, p.candidate))
  );
  const approves = await Promise.all(
    proposals.map((p) => getApproveFor(ESDS.addr, p.candidate))
  );
  const rejecteds = await Promise.all(
    proposals.map((p) => getRejectFor(ESDS.addr, p.candidate))
  );
  const supplyAts = await Promise.all(
    proposals.map(async (p) => {
      const at = p.start + p.period - 1;
      if (epoch > at) {
        return await getTotalBondedAt(ESDS.addr, at);
      }
      return currentTotalStake;
    })
  );

  for (let i = 0; i < proposals.length; i++) {
    proposals[i].index = proposals.length - i;
    proposals[i].start = parseInt(proposals[i].start);
    proposals[i].period = parseInt(proposals[i].period);
    proposals[i].status = proposalStatus(
      epoch,
      proposals[i].start,
      proposals[i].period,
      initializeds[i],
      new BigNumber(approves[i]),
      new BigNumber(rejecteds[i]),
      new BigNumber(supplyAts[i])
    );
  }
  return proposals;
}

function CandidateHistory({ user }: CandidateHistoryProps) {
  const history = useHistory();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [page, setPage] = useState(0);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      const [epochStr, allProposals] = await Promise.all([
        getEpoch(ESDS.addr),
        getAllProposals(ESDS.addr),
      ]);

      if (!isCancelled) {
        const formattedProposals = await formatProposals(
          parseInt(epochStr),
          allProposals
        );
        setProposals(formattedProposals);
        setInitialized(true);
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
    <StyledTable>
      <div className="table-container">
        <DataView
          fields={[
            "Proposal",
            "Candidate",
            "Proposed",
            "Complete",
            "Proposer",
            "Status",
            "",
          ]}
          status={initialized ? "default" : "loading"}
          // @ts-ignore
          entries={proposals}
          entriesPerPage={10}
          page={page}
          onPageChange={setPage}
          renderEntry={(proposal) => [
            "#" + proposal.index,
            <AddressBlock label="" address={proposal.candidate} />,
            proposal.start.toString(),
            (proposal.start + proposal.period).toString(),
            <AddressBlock label="" address={proposal.account} />,
            proposal.status,
            <Button
              title="Go To"
              onButtonClick={() => {
                history.push(`/governance/candidate/${proposal.candidate}`);
              }}
            />,
          ]}
        />
      </div>
    </StyledTable>
  );
}

export default CandidateHistory;

const StyledTable = styled.div`
  .kFatCR {
    position: relative;
    border-radius: 4px;
    border-style: solid;
    border-color: #00ff19;
    border-width: 2px;
    background: #000;
    color: #00ff19;
    font-size: 20px;
  }

  .eqzRvR {
    display: flex;
    justify-content: center;
    font-size: 18px;
    border-collapse: separate;
    border-spacing: 0 30px;
    position: relative;
  }

  .cQcByh thead tr th {
    color: #00ff19;
    text-align: center;
    font-size: 25px;
  }

  .cQcByh tbody tr td div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cQcByh {
    border: 2px solid var(--green);
  }

  .cQcByh thead th {
    border-bottom: 1px solid var(--green);
    border-right: 1px solid var(--green);
    padding: 2px 4px;
  }

  .cQcByh thead th:last-child {
    border-right: none;
  }

  tbody tr td {
    text-align: center;
  }

  .blRtmr {
    background: var(--black);
    color: var(--green);
    border: 1px solid var(--green);
  }

  .iyxOAg div button {
    background: #000;
  }

  .iyxOAg div button span {
    color: #00ff19;
  }

  @media only screen and (max-width: 1500px) {
    table {
      font-size: 17px !important;
    }
  }

  @media (max-width: 1366px) {
    .table-container {
      overflow-x: scroll;
    }

    table,
    .kFatCR,
    thead {
      min-width: 1000px;
    }

    .cQcByh thead tr th,
    tbody tr td {
      font-size: 16px;
      text-align: center;
    }
  }

  @media (max-width: 1200px) {
    .cQcByh thead tr th {
      font-size: 18px;
    }
  }
`;
