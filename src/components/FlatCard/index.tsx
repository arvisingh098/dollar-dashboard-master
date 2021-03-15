import * as React from "react";

//Style
import "./style.css";

export interface FlatCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  href: string;
}

const FlatCard: React.SFC<FlatCardProps> = ({
  title,
  description,
  children,
  href,
}) => {
  return (
    <div className="FlatCard">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div>
          <h3>{title}</h3>
          {children}
          <p> {description} </p>
        </div>
      </a>
    </div>
  );
};

export default FlatCard;
