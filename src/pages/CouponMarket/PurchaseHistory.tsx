import React, { useEffect, useState } from "react";
import { DataView } from "@aragon/ui";

import {
  getEpoch,
  getBatchBalanceOfCoupons,
  getBatchBalanceOfCouponsUnderlying,
  getBatchCouponsExpiration,
  getCouponEpochs,
} from "../../utils/infura";
import { ESD, ESDS } from "../../constants/tokens";
import { formatBN, toBaseUnitBN, toTokenUnitsBN } from "../../utils/number";
import BigNumber from "bignumber.js";
import { redeemCoupons, migrateCoupons } from "../../utils/web3";

//Components
import Button from "../../components/Button";

//Style
import styled from "styled-components";

type PurchaseHistoryProps = {
  user: string;
  hideRedeemed: boolean;
  totalRedeemable: BigNumber;
};

function PurchaseHistory({
  user,
  hideRedeemed,
  totalRedeemable,
}: PurchaseHistoryProps) {
  const [epochs, setEpochs] = useState([]);
  const [page, setPage] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);

  //Update User balances
  useEffect(() => {
    if (user === "") return;
    let isCancelled = false;

    async function updateUserInfo() {
      const epochStr = await getEpoch(ESDS.addr);
      const epochsFromEvents = await getCouponEpochs(ESDS.addr, user);
      const epochNumbers = epochsFromEvents.map((e) => parseInt(e.epoch));
      const balanceOfCouponsPremium = await getBatchBalanceOfCoupons(
        ESDS.addr,
        user,
        epochNumbers
      );
      const balanceOfCouponsPrincipal = await getBatchBalanceOfCouponsUnderlying(
        ESDS.addr,
        user,
        epochNumbers
      );
      const couponsExpirations = await getBatchCouponsExpiration(
        ESDS.addr,
        epochNumbers
      );

      const couponEpochs = epochsFromEvents.map((epoch, i) => {
        epoch.principal = new BigNumber(balanceOfCouponsPrincipal[i]);
        epoch.premium = new BigNumber(balanceOfCouponsPremium[i]);
        epoch.expiration = couponsExpirations[i];
        return epoch;
      });

      if (!isCancelled) {
        // @ts-ignore
        setEpochs(couponEpochs);
        setCurrentEpoch(parseInt(epochStr, 10));
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
  }, [user, totalRedeemable]);

  return (
    <div className="PurchaseHistory">
      {/*   {epochs && epochs.length > 1 ? (
        <StyledTable>
          <DataView
            fields={[
              "Epoch",
              "Purchased",
              "Principal",
              "Premium",
              "Expires",
              "",
            ]}
            status={initialized ? "default" : "loading"}
            // @ts-ignore
            entries={
              hideRedeemed
                ? epochs.filter(
                    (epoch) =>
                      !epoch.principal.isZero() || !epoch.premium.isZero()
                  )
                : epochs
            }
            entriesPerPage={10}
            page={page}
            onPageChange={setPage}
            renderEntry={(epoch) => [
              epoch.epoch.toString(),
              formatBN(toTokenUnitsBN(epoch.coupons, ESD.decimals), 2),
              formatBN(toTokenUnitsBN(epoch.principal, ESD.decimals), 2),
              formatBN(toTokenUnitsBN(epoch.premium, ESD.decimals), 2),
              epoch.expiration.toString(),
              <CouponAction
                epoch={currentEpoch}
                coupon={epoch}
                totalRedeemable={totalRedeemable}
              />,
            ]}
          />
        </StyledTable>
      ) : (
        <p>Ops, something went wrong...</p>
      )} */}
      <p>Ops, something went wrong...</p>
    </div>
  );
}

type CouponActionProps = {
  epoch: number;
  coupon: any;
  totalRedeemable: BigNumber;
};

function CouponAction({ epoch, coupon, totalRedeemable }: CouponActionProps) {
  const isRedeemable = !totalRedeemable.isZero() || coupon.expiration < epoch;

  return (
    <>
      {coupon.principal.isZero() && !coupon.premium.isZero() ? (
        <Button
          title="Migrate"
          onButtonClick={() => migrateCoupons(ESDS.addr, coupon.epoch)}
        />
      ) : coupon.principal.isZero() ? (
        <Button title="Redeemed" disabled={true} />
      ) : (
        <Button
          title="Redeem"
          onButtonClick={() =>
            redeemCoupons(
              ESDS.addr,
              coupon.epoch,
              !totalRedeemable.isZero() &&
                coupon.principal.isGreaterThan(
                  toBaseUnitBN(totalRedeemable, ESD.decimals)
                )
                ? toBaseUnitBN(totalRedeemable, ESD.decimals)
                : coupon.principal
            )
          }
          disabled={!isRedeemable}
        />
      )}
    </>
  );
}

export default PurchaseHistory;

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
`;
