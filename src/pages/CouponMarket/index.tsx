import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  getCouponPremium,
  getTokenAllowance,
  getTokenBalance,
  getTokenTotalSupply,
  getTotalCoupons,
  getTotalCouponsUnderlying,
  getTotalDebt,
  getTotalRedeemable,
} from "../../utils/infura";
import { ESD, ESDS } from "../../constants/tokens";
import CouponMarketHeader from "./Header";
import { toTokenUnitsBN } from "../../utils/number";
import BigNumber from "bignumber.js";
import PurchaseCoupons from "./PurchaseCoupons";
import PurchaseHistory from "./PurchaseHistory";
import ModalWarning from "./ModalWarning";
import { getPreference, storePreference } from "../../utils/storage";

//Components
import IconHeader from "../../components/IconHeader";
import CheckBox from "../../components/CheckBox";
import Container from "../../components/Container";

//Style
import "./style.css";
import Row from "../../components/Row";

const ONE_COUPON = new BigNumber(10).pow(18);

function CouponMarket({ user }: { user: string }) {
  const { override } = useParams();
  if (override) {
    user = override;
  }

  const storedHideRedeemed = getPreference("hideRedeemedCoupons", "0");

  const [balance, setBalance] = useState(new BigNumber(0));
  const [allowance, setAllowance] = useState(new BigNumber(0));
  const [supply, setSupply] = useState(new BigNumber(0));
  const [coupons, setCoupons] = useState(new BigNumber(0));
  const [redeemable, setRedeemable] = useState(new BigNumber(0));
  const [couponPremium, setCouponPremium] = useState(new BigNumber(0));
  const [debt, setDebt] = useState(new BigNumber(0));
  const [hideRedeemed, setHideRedeemed] = useState(storedHideRedeemed === "1");

  useEffect(() => {
    if (user === "") {
      setBalance(new BigNumber(0));
      setAllowance(new BigNumber(0));
      return;
    }
    let isCancelled = false;

    async function updateUserInfo() {
      const [balanceStr, allowanceStr] = await Promise.all([
        getTokenBalance(ESD.addr, user),
        getTokenAllowance(ESD.addr, user, ESDS.addr),
      ]);

      const userBalance = toTokenUnitsBN(balanceStr, ESD.decimals);

      if (!isCancelled) {
        setBalance(new BigNumber(userBalance));
        setAllowance(new BigNumber(allowanceStr));
        new BigNumber(allowanceStr);
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
      const [
        supplyStr,
        debtStr,
        couponsPremiumStr,
        couponsPrincipalStr,
        redeemableStr,
      ] = await Promise.all([
        getTokenTotalSupply(ESD.addr),
        getTotalDebt(ESDS.addr),
        getTotalCoupons(ESDS.addr),
        getTotalCouponsUnderlying(ESDS.addr),
        getTotalRedeemable(ESDS.addr),
      ]);

      const totalSupply = toTokenUnitsBN(supplyStr, ESD.decimals);
      const totalDebt = toTokenUnitsBN(debtStr, ESD.decimals);
      const totalCoupons = toTokenUnitsBN(
        couponsPrincipalStr,
        ESD.decimals
      ).plus(toTokenUnitsBN(couponsPremiumStr, ESD.decimals));
      const totalRedeemable = toTokenUnitsBN(redeemableStr, ESD.decimals);

      if (!isCancelled) {
        setSupply(new BigNumber(totalSupply));
        setDebt(new BigNumber(totalDebt));
        setCoupons(new BigNumber(totalCoupons));
        setRedeemable(new BigNumber(totalRedeemable));

        if (totalDebt.isGreaterThan(new BigNumber(1))) {
          const couponPremiumStr = await getCouponPremium(
            ESDS.addr,
            ONE_COUPON
          );
          setCouponPremium(toTokenUnitsBN(couponPremiumStr, ESD.decimals));
        } else {
          setCouponPremium(new BigNumber(0));
        }
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
      <div className="CouponMarket">
        {/*    <ModalWarning /> */}
        <IconHeader
          icon={<i className="fas fa-ticket-alt" />}
          text="Coupon Market"
        />
        <Row title="Coupon Market">
          <CouponMarketHeader
            debt={debt}
            supply={supply}
            coupons={coupons}
            premium={couponPremium}
            redeemable={redeemable}
          />
        </Row>
        <Row title="Purchase">
          <PurchaseCoupons
            user={user}
            allowance={allowance}
            balance={balance}
            debt={debt}
          />
        </Row>
        <div className="table-title-row">
          <h2>Coupons</h2>
          <div>
            <CheckBox
              text="Hide Redeemed"
              onCheck={(checked) => {
                storePreference("hideRedeemedCoupons", checked ? "1" : "0");
                setHideRedeemed(checked);
              }}
              checked={hideRedeemed}
            />
          </div>
        </div>
        <PurchaseHistory
          user={user}
          hideRedeemed={hideRedeemed}
          totalRedeemable={redeemable}
        />
      </div>
    </Container>
  );
}

export default CouponMarket;
