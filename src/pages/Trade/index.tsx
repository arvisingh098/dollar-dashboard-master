import React, { useState, useEffect } from "react";

import BigNumber from "bignumber.js";
import { getTokenBalance } from "../../utils/infura";
import { toTokenUnitsBN } from "../../utils/number";

import TradePageHeader from "./Header";
import { ESD, UNI, USDC } from "../../constants/tokens";

//Components
import IconHeader from "../../components/IconHeader";
import Row from "../../components/Row";
import FlatCard from "../../components/FlatCard";

//Style
import "./style.css";
import Container from "../../components/Container";

function UniswapPool({ user }: { user: string }) {
  const [pairBalanceESD, setPairBalanceESD] = useState(new BigNumber(0));
  const [pairBalanceUSDC, setPairBalanceUSDC] = useState(new BigNumber(0));

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      const [pairBalanceESDStr, pairBalanceUSDCStr] = await Promise.all([
        getTokenBalance(ESD.addr, UNI.addr),
        getTokenBalance(USDC.addr, UNI.addr),
      ]);

      if (!isCancelled) {
        setPairBalanceESD(toTokenUnitsBN(pairBalanceESDStr, ESD.decimals));
        setPairBalanceUSDC(toTokenUnitsBN(pairBalanceUSDCStr, USDC.decimals));
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
      <div className="UniswapPool">
        <Row title="Trade">
          <TradePageHeader
            pairBalanceESD={pairBalanceESD}
            pairBalanceUSDC={pairBalanceUSDC}
            uniswapPair={UNI.addr}
          />
        </Row>
        <div className="cards-container">
          <FlatCard
            title="Info"
            description="View ESD-USDC pool stats."
            href={
              "https://uniswap.info/pair/0x88ff79eb2bc5850f27315415da8685282c7610f9"
            }
          >
            <i className="fas fa-chart-area" />
          </FlatCard>

          <FlatCard
            title="Trade"
            description="Trade døllar tokens."
            href={
              "https://uniswap.exchange/swap?inputCurrency=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&outputCurrency=0x36f3fd68e7325a35eb768f1aedaae9ea0689d723"
            }
          >
            <i className="fas fa-exchange-alt" />
          </FlatCard>

          <FlatCard
            title="Supply"
            description="Supply and redeem liquidity."
            href={
              "https://uniswap.exchange/add/0x36f3fd68e7325a35eb768f1aedaae9ea0689d723/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            }
          >
            <i className="fas fa-water" />
          </FlatCard>
        </div>
      </div>
    </Container>
  );
}

export default UniswapPool;
