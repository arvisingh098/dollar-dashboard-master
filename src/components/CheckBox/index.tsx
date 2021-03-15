import React from "react";
import styled from "styled-components";

import { Checkbox } from "@aragon/ui";

type checkBoxProps = {
  text: string;
  checked: boolean;
  onCheck: Function;
};

function MyCheckBox({ text, checked, onCheck }: checkBoxProps) {
  return (
    <CheckBoxWrapper>
      <Checkbox checked={checked} onChange={onCheck} />
      <span>{text}</span>
      <br />
    </CheckBoxWrapper>
  );
}

export default MyCheckBox;

const CheckBoxWrapper = styled.div`
   {
    display: flex;
    font-size: 22px;
    color: ${(props) => props.theme.surfaceContentSecondary};

    span {
      margin: 0px 5px;
    }
  }
`;
