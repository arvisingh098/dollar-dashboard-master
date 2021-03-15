import React from "react";

//Components
import Button from "../../components/Button";

function HomePageNoWeb3() {
  return (
    <>
      <div>
        <MainButton
          title="No web3 wallet detected"
          description="Click to get Metamask."
          icon={<i className="fas fa-times-circle" />}
          onClick={() => {
            // @ts-ignore
            window.location = "https://www.metamask.io/";
          }}
        />
      </div>
    </>
  );
}

type MainButtonPropx = {
  title: string;
  description: string;
  icon: any;
  onClick: Function;
  tag?: string;
};

function MainButton({
  title,
  description,
  icon,
  onClick,
  tag,
}: MainButtonPropx) {
  return (
    <Button onButtonClick={onClick} title={title}>
      <div>
        <div>{tag ? <p>{tag}</p> : <></>}</div>
        <span>{icon}</span>
        <img alt="icon" src={icon} />
        <div> {description} </div>
      </div>
    </Button>
  );
}

export default HomePageNoWeb3;
