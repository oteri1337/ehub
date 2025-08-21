import React from "react";
import { Link } from "react-router-dom";
import { sendFormRequestThenDispatch } from "providers/AppProvider";
import ContainerComponent from "components/container/TourContainerComponent";
import UncontrolledFormComponent from "components/UncontrolledFormComponent";

function AdminSigninPage() {
  const { request, callBack } = sendFormRequestThenDispatch();

  const nav = [
    {
      label: "Control Panel",
    },
  ];

  const formArray = [
    {
      id: "email",
      type: "email",
    },
    {
      id: "password",
      type: "password",
    },
  ];

  const callback = (body) => {
    callBack("/api/admins/auth/signin", "UPDATE_ADMIN", body);
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="row ">
        <div className="col s12 m12 l4 offset-l4">
          <br />
          <center>
            <UncontrolledFormComponent
              formObjects={formArray}
              callback={callback}
              errors={request.errors}
              fetching={request.fetching}
              text="Sign In"
            />
            <br />
            <br />
            <Link to="/control/password.html">Reset Password</Link>
          </center>
          <br />
        </div>
      </div>
    </ContainerComponent>
  );
}

export default AdminSigninPage;
