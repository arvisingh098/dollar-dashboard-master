import React from "react";

import BigNumber from "bignumber.js";
import { approve } from "../../utils/web3";

import { ESD, USDC } from "../../constants/tokens";
import { MAX_UINT256 } from "../../constants/values";
import { UniswapV2Router02 } from "../../constants/contracts";

//Components
import Container from "../../components/Container";
import Button from "../../components/Button";

type UniswapApproveCollateralProps = {
  user: string;
  userAllowanceESD: BigNumber;
  userAllowanceUSDC: BigNumber;
};

function UniswapApproveCollateral({
  user,
  userAllowanceESD,
  userAllowanceUSDC,
}: UniswapApproveCollateralProps) {
  return (
    <Container>
      <div>
        <div />
        {/* Approve Uniswap Router to spend ESD */}
        <div>
          <Button
            title="Unlock ESD"
            onButtonClick={() => {
              approve(ESD.addr, UniswapV2Router02);
            }}
            disabled={
              user === "" || userAllowanceESD.comparedTo(MAX_UINT256) === 0
            }
          />
        </div>
        {/* Approve Uniswap Router to spend USDC */}
        <div />
        <div>
          <Button
            title="Unlock USDC"
            onButtonClick={() => {
              approve(USDC.addr, UniswapV2Router02);
            }}
            disabled={
              user === "" ||
              userAllowanceUSDC.comparedTo(MAX_UINT256.dividedBy(2)) > 0
            }
          />
        </div>
      </div>
    </Container>
  );
}

export default UniswapApproveCollateral;
