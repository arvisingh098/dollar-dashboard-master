import React, { useEffect, useState } from "react";
import { useWallet } from "use-wallet";

//Components
import Button from "../Button";

//Style
import styled from "styled-components";

type ConnectModalProps = {
  visible: boolean;
  onConnect: Function;
  toggleModal: Function;
};

function ConnectModal({ visible, onConnect, toggleModal }: ConnectModalProps) {
  const wallet = useWallet();

  const connectMetamask = () => {
    wallet.connect("injected");
  };

  const connectWalletConnect = () => {
    wallet.connect("walletconnect");
  };

  const connectCoinbase = () => {
    wallet.connect("walletlink");
  };

  useEffect(() => {
    if (wallet.account) {
      onConnect && onConnect(wallet);
    }
  }, [wallet, onConnect]);

  return (
    <StyledConnectModal visible={visible}>
      <h2>
        Select a wallet provider
        <span onClick={() => toggleModal(false)}> X</span>
      </h2>

      <div className="connect-option">
        <img src={`./wallets/metamask-fox.svg`}></img>
        <Button title="Metamask" onButtonClick={connectMetamask} />
      </div>
      <div className="connect-option">
        <img src={`./wallets/wallet-connect.svg`}></img>
        <Button title={"Wallet"} onButtonClick={connectWalletConnect} />
      </div>
      <div className="connect-option">
        <img src={`./wallets/coinbase-wallet.png`}></img>
        <Button title={"Coinbase"} onButtonClick={connectCoinbase} />
      </div>
    </StyledConnectModal>
  );
}

export default ConnectModal;

const StyledConnectModal = styled.div(
  ({ visible }) => `
  background:  var(--black);
  border: 1px solid var(--green);
  display: ${visible ? "flex" : "none"};
  z-index: 3;
  position: absolute;
  inset: 0px;
  height: 500px;
  width: 50%; 
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: space-evenly;
  justify-content: space-evenly;
  text-align: center;
  overflow: auto;
  flex-wrap: wrap;
  margin: auto;
  align-items: flex-end;
  padding-bottom: 30px;

  h2{
    flex-basis: 100%; 
    margin: 20px 0;
  }

  h2 span{
    float: right;
    margin-right: 30px;
  }

 .connect-option{
   flex-basis: 30%;
 }

 .connect-option img{
   width: 70%;
  margin: 15px 0;
 }

  `
);
