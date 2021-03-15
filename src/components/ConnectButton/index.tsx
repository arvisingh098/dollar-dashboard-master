import React, { useState } from "react";
import { useWallet } from "use-wallet";

import { connect } from "../../utils/web3";

//Components
import Button from "../Button";
import TotalBalance from "../../components/TotalBalance";
import ConnectModal from "../ConnectModal";
import Link from "../Link";

//Icon
import { BsPower } from "react-icons/bs";
import { start_and_end } from "../../utils/string";

type connectButtonProps = {
  hasWeb3: boolean;
  user: string;
  setUser: Function;
};

function ConnectButton({ hasWeb3, user, setUser }: connectButtonProps) {
  const { status, reset } = useWallet();

  const [isModalOpen, setModalOpen] = useState(false);

  const connectWeb3 = async (wallet) => {
    connect(wallet.ethereum);
    setUser(wallet.account);
  };

  const disconnectWeb3 = async () => {
    setUser("");
    reset();
  };

  const toggleModal = () => setModalOpen(!isModalOpen);

  return status === "connected" ? (
    <div>
      <div>
        <div>
          <Link href="#" onClick={disconnectWeb3}>
            <BsPower />
          </Link>
        </div>
        <div>
          <p>{start_and_end(user)} </p>
        </div>
      </div>
      <div>
        <div>
          <TotalBalance user={user} />
        </div>
      </div>
    </div>
  ) : (
    <>
      <ConnectModal
        visible={isModalOpen}
        onConnect={connectWeb3}
        toggleModal={toggleModal}
      />
      <Button title="Connect" onButtonClick={toggleModal} disabled={!hasWeb3} />
    </>
  );
}

export default ConnectButton;
