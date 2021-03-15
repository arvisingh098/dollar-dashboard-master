import * as React from "react";

import "./style.css";

export interface ButtonProps {
  title: string;
  onButtonClick?: Function;
  icon?: string;
  disabled?: boolean;
  className?: string;
}

const Button: React.SFC<ButtonProps> = ({
  title,
  onButtonClick,
  disabled,
  className,
}) => {
  const handleClick = () => {
    onButtonClick && onButtonClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`border-button ${className ? className : ""}`}
    >
      <span>{title}</span>
    </button>
  );
};

export default Button;
