import React, { useState, useEffect } from "react";

import { getEpoch, getEpochTime } from "../../utils/infura";
import { ESDS } from "../../constants/tokens";
import AdvanceEpoch from "./AdvanceEpoch";
import EpochPageHeader from "./Header";

//Components
import IconHeader from "../../components/IconHeader";
import Row from "../../components/Row";
import Container from "../../components/Container";

function EpochDetail({ user }: { user: string }) {
  const [epoch, setEpoch] = useState(0);
  const [epochTime, setEpochTime] = useState(0);
  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      const [epochStr, epochTimeStr] = await Promise.all([
        getEpoch(ESDS.addr),
        getEpochTime(ESDS.addr),
      ]);

      if (!isCancelled) {
        setEpoch(parseInt(epochStr, 10));
        setEpochTime(parseInt(epochTimeStr, 10));
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
        <IconHeader icon={<i className="fas fa-stream" />} text="Epoch" />

        <Row title="">
          <EpochPageHeader epoch={epoch} epochTime={epochTime} />
        </Row>

        <Row title="AdvanceEpoch">
          <AdvanceEpoch user={user} epoch={epoch} epochTime={epochTime} />
        </Row>
      </>
    </Container>
  );
}

export default EpochDetail;
