import React from "react";
import "./style.css";

type TextBlockProps = {
  label: string;
  text: string;
};

function TextBlock({ label, text }: TextBlockProps) {
  return (
    <div className="TextBlock">
      <h3>{label}</h3>
      <p>{text}</p>
    </div>
  );
}

export default TextBlock;
