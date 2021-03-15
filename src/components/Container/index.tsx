import * as React from "react";
import "./style.css";

type ContainerProps = {
  children: JSX.Element;
};

const Container: React.SFC<ContainerProps> = ({ children }) => {
  return <div className="Container">{children}</div>;
};

export default Container;
