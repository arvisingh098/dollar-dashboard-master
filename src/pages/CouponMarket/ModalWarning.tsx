import React, { useState } from "react";
import { getPreference, storePreference } from "../../utils/storage";
import { COUPON_EXPIRATION } from "../../constants/values";

//Components
import Button from "../../components/Button";

function ModalWarning() {
  const storedShowWarning = getPreference("showCouponWarning", "1");
  const [showWarning, setShowWarning] = useState(storedShowWarning === "1");

  return (
    <div /* visible={showWarning} closeButton={false} */>
      <div>
        <div>Warning</div>

        <div>
          <div>
            Coupons will only become redeemable during the next supply
            expansion. Each expansionary epoch, a tranche of rewards are
            reserved for coupon redemptions by the DAO. At that time, the
            redemption process is first come, first served. If coupons are not
            redeemed within {COUPON_EXPIRATION} epochs of purchase, they can be
            redeemed for the original purchase price and the premium is
            forfeited.
          </div>

          <div>Coupon premiums and redemption timing are not guaranteed.</div>
        </div>

        <div>
          <Button
            title={"I understand"}
            onButtonClick={() => {
              storePreference("showCouponWarning", "0");
              setShowWarning(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ModalWarning;
