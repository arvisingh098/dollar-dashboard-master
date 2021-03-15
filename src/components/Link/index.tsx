import * as React from "react";
import { Link } from "react-router-dom";

export interface LinkProps {
  href: string;
  onClick?: Function;
  children?: React.ReactNode;
}

const StyledLink: React.SFC<LinkProps> = ({ href, onClick, children }) => {
  return (
    <Link to={href} onClick={() => onClick}>
      {children}
    </Link>
  );
};

export default StyledLink;
