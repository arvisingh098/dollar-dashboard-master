import React, { useState } from "react";
import BigNumber from "bignumber.js";
import { mintTestnetUSDC } from "../../utils/web3";

import { isPos, toBaseUnitBN } from "../../utils/number";
import { USDC } from "../../constants/tokens";

//Components
import Container from "../../components/Container";
import BigNumberInput from "../../components/BigNumInput";
import BalanceBlock from "../../components/BalanceBlock";
import Button from "../../components/Button";

type MintUSDCProps = {
  user: string;
  userBalanceUSDC: BigNumber;
};

function MintUSDC({ user, userBalanceUSDC }: MintUSDCProps) {
  const [mintAmount, setMintAmount] = useState(new BigNumber(0));

  return (
    <Container>
      <div>
        {/* USDC balance */}
        <div>
          <BalanceBlock asset="USDC Balance" balance={userBalanceUSDC} />
        </div>
        {/* Mint */}
        <div />
        <div>
          <div>
            <div>
              <BigNumberInput
                adornment="USDC"
                value={mintAmount}
                setter={setMintAmount}
              />
            </div>
            <div>
              <Button
                title="Mint"
                onButtonClick={() => {
                  mintTestnetUSDC(toBaseUnitBN(mintAmount, USDC.decimals));
                }}
                disabled={user === "" || !isPos(mintAmount)}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default MintUSDC;
