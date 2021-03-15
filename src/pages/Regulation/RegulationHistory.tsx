import React, { useEffect, useState } from "react";
import { DataView } from "@aragon/ui";

import { getAllRegulations } from "../../utils/infura";
import { ESD, ESDS } from "../../constants/tokens";
import { formatBN, toTokenUnitsBN } from "../../utils/number";
import BigNumber from "bignumber.js";

//Styles
import "./style.css";
import styled from "styled-components";

type RegulationHistoryProps = {
  user: string;
};

type Regulation = {
  type: string;
  data: RegulationEntry;
};

type RegulationEntry = {
  epoch: string;
  price: string;
  deltaRedeemable: string;
  deltaDebt: string;
  deltaBonded: string;
};

function formatPrice(type, data) {
  return type === "NEUTRAL"
    ? "1.00"
    : formatBN(toTokenUnitsBN(new BigNumber(data.price), ESD.decimals), 3);
}

function formatDeltaRedeemable(type, data) {
  return type === "INCREASE"
    ? "+" +
        formatBN(
          toTokenUnitsBN(new BigNumber(data.newRedeemable), ESD.decimals),
          2
        )
    : "+0.00";
}

function formatDeltaDebt(type, data) {
  return type === "INCREASE"
    ? "-" +
        formatBN(toTokenUnitsBN(new BigNumber(data.lessDebt), ESD.decimals), 2)
    : type === "DECREASE"
    ? "+" +
      formatBN(toTokenUnitsBN(new BigNumber(data.newDebt), ESD.decimals), 2)
    : "+0.00";
}

function formatDeltaBonded(type, data) {
  return type === "INCREASE"
    ? "+" +
        formatBN(toTokenUnitsBN(new BigNumber(data.newBonded), ESD.decimals), 2)
    : "+0.00";
}

function renderEntry({ type, data }: Regulation): string[] {
  return [
    data.epoch.toString(),
    formatPrice(type, data),
    formatDeltaRedeemable(type, data),
    formatDeltaDebt(type, data),
    formatDeltaBonded(type, data),
  ];
}

function RegulationHistory({ user }: RegulationHistoryProps) {
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [page, setPage] = useState(0);
  const [initialized, setInitialized] = useState(false);

  //Update User balances
  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      const [allRegulations] = await Promise.all([
        getAllRegulations(ESDS.addr),
      ]);

      if (!isCancelled) {
        setRegulations(allRegulations);
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
          fields={["Epoch", "Price", "Δ Redeemable", "Δ Debt", "Δ Bonded"]}
          status={initialized ? "default" : "loading"}
          entries={regulations}
          entriesPerPage={10}
          page={page}
          onPageChange={setPage}
          renderEntry={renderEntry}
        />
      </div>
    </StyledTable>
  );
}

export default RegulationHistory;

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
    padding: 2px 4px;
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
  }

  .cQcByh thead th:last-child {
    border-right: none;
  }

  tbody tr td {
    text-align: center;
    padding: 0 15px;
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

  @media (max-width: 768px) {
    .table-container {
      overflow-x: scroll;
    }

    table,
    .kFatCR {
      min-width: 465px;
    }

    .cQcByh thead tr th {
      font-size: 18px;
    }
  }

  @media only screen and (max-width: 1500px) {
    table {
      font-size: 17px !important;
    }
  }
`;
