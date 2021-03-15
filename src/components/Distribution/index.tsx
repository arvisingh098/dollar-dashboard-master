import * as React from "react";

//Style
import styled from "styled-components";

export interface FlatCardProps {
  title: string;
  description: string;
  items: Array<any>;
}

const FlatCard: React.SFC<FlatCardProps> = ({ title, description, items }) => {
  return (
    <StyledCard width={items && items[0].percentage}>
      <div className="CardContainer">
        <h2 className="CardTitle">{title}</h2>
        <hr />
        <h2 className="CardSubtitle">{description}</h2>
        <div className="progress-bar-border">
          <div className="progress-bar"></div>
        </div>
        <ul className="ItemList">
          {items?.map((item) => (
            <li className="Item">
              {item.item}
              <span>{item.percentage}</span>
            </li>
          ))}
        </ul>
      </div>
    </StyledCard>
  );
};

export default FlatCard;

const StyledCard = styled.div(
  ({ width }) => `
  .CardContainer {
    display: flex;
    flex-direction: column;
    background-color: black;
    color: #00ff19;
    border: solid 2px #00ff19;
    margin: 40px 0;
    margin-right: 30px;
    text-align: left;
    justify-content: space-between;
    width: 300px;
  }
  .CardTitle {
    font-weight: 500;
    margin: 12px 6px;
    text-align: center;
  }

  hr {
    border-color: #00ff19;
    margin-bottom: 12px 0;
    width: 100%;
  }

  .CardSubtitle {
    display: block;
    font-weight: 500;
    font-size: 24px;
    margin: 20px 0px 0px 20px;
  }

  .progress-bar-border {
    margin: 0px 16px;
    border: solid 1px #00ff19;
  }

  .progress-bar-border > div {
    background-color: #00ff19;
    width: ${width}%;
    height: 10px;
  }

  .ItemList {
    display: flex;
    flex-direction: column-reverse;
  }
  .Item {
    margin: 5px 0px 5px 20px;
  }

  .Item::before {
    content: "• ";
    color: var(--green);
    font-size: 30px;
  }

  @media (max-width: 1265px) {
    .CardContainer { 
      margin: 5px; 
    }
  
  }

`
);
