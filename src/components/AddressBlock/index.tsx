import React from "react";
import { start_and_end } from "../../utils/string";

import "./style.css";

type AddressBlockProps = {
  label: string;
  address: string;
};

function AddressBlock({ label, address }: AddressBlockProps) {
  return (
    <div className="AddressBlock">
      <h3>{label}</h3>

      <p>{start_and_end(address)} </p>
    </div>
  );
}

export default AddressBlock;
