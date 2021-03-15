import React from "react";

//Styles
import "./style.css";

type IconHeaderProps = {
  icon: any;
  text: string;
};

function IconHeader({ icon, text }: IconHeaderProps) {
  return (
    <div className="IconHeader">
      <div>{icon}</div>

      <p>{text}</p>
    </div>
  );
}

export default IconHeader;
