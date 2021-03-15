import React from "react";

import BigNumber from "bignumber.js";
import { formatBN } from "../../utils/number";

//Styles
import "./style.css";

type BigNumberInputProps = {
  value: BigNumber;
  setter: (value: BigNumber) => void;
  adornment?: string;
  disabled?: boolean;
};

function BigNumberInput({
  value,
  setter,
  adornment,
  disabled = false,
}: BigNumberInputProps) {
  return (
    <div className="BigNumberInput">
      <input
        type="number"
        value={value.isNegative() ? "" : value.toFixed()}
        onChange={(event) => {
          if (event.target.value) {
            setter(new BigNumber(event.target.value));
          } else {
            setter(new BigNumber(-1));
          }
        }}
        onBlur={() => {
          if (value.isNegative()) {
            setter(new BigNumber(0));
          }
        }}
        disabled={disabled}
      />
    </div>
  );
}

export default BigNumberInput;
