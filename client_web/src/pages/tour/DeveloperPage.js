import React from "react";
import TourContainerComponent from "components/container/TourContainerComponent";

function DeveloperPage() {
  return (
    <TourContainerComponent>
      <div className="row app-py-3">
        <div className="col l4 offset-l4 s12">
          <div className="card-panel center">
            <p>eHUB is developed by</p>
            <h3>Oteri Avwunudiogba</h3>
            <a href="https://github.com/oteri1337" target="_blank">
              Github{" "}
            </a>
            <a href="https://www.linkedin.com/in/oteri1337" target="_blank">
              Linkedin
            </a>
            <br />
            <br />
            +234 701 241 3480
            <br />
            <br />
            oteri2021@gmail.com
          </div>
        </div>
      </div>
    </TourContainerComponent>
  );
}

export default DeveloperPage;
