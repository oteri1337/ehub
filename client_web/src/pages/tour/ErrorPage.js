import React from "react";
import ContainerComponent from "components/container/TourContainerComponent";
import { useHistory } from "react-router-dom";

function ErrorPage() {
  const history = useHistory();

  const onClick = () => {
    try {
      history.goBack();
    } catch (e) {
      history.push("/");
    }
  };

  return (
    <ContainerComponent>
      <div className="container">
        <a onClick={onClick}>Go Back</a>
        <br /> <br />
        <div className="card-panel ">
          <div className="container">
            <h1>404 Error</h1>
            <p>Resource Not Found</p>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default ErrorPage;
