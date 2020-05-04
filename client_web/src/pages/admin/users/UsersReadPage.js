import React from "react";
import { format } from "functions";
import { Link } from "react-router-dom";
import FormComponent from "components/FormComponent";
import {
  getRequestThenDispatch,
  sendRequestThenDispatch,
} from "providers/AppProvider";
import ContainerComponent from "components/container/AdminContainerComponent";

function UsersReadPage({ location, match }) {
  const { id } = match.params;
  const { state } = getRequestThenDispatch(
    `/api/users/${id}`,
    "UPDATE_USER_IN_USERS"
  );

  const { callBack, request } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const data = state.users.object[id] || location.props;

  if (!data) {
    return (
      <ContainerComponent bread={[]}>
        <div className="card-panel">
          <p>Not Found</p>
        </div>
      </ContainerComponent>
    );
  }

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Users",
      link: "/control/users/list.html",
    },
    {
      label: `${data.first_name} ${data.last_name}`,
    },
  ];

  const renderRow = () => {
    let keysArray = Object.keys(data);
    return keysArray.map((key) => {
      if (typeof data[key] === "object") return false;

      if (key == "push_subscription") return false;

      if (key == "trading_balance") {
        return (
          <tr key={key}>
            <td style={{ textTransform: "uppercase" }}>
              {key.replace(/_/g, " ")}
            </td>
            <td>{format(data.currency, data[key])}</td>
          </tr>
        );
      }

      return (
        <tr key={key}>
          <td style={{ textTransform: "uppercase" }}>
            {key.replace(/_/g, " ")}
          </td>
          <td>{data[key]}</td>
        </tr>
      );
    });
  };

  const onSuccess = () => {};

  const approve = () => {
    const body = {
      id: data.id,
      action: 1,
    };

    callBack(
      "/api/users/auth/verify/id",
      "UPDATE_USER_IN_USERS",
      body,
      onSuccess,
      "PATCH"
    );
  };

  const decline = () => {
    const body = {
      id: data.id,
      action: 2,
    };

    callBack(
      "/api/users/auth/verify/id",
      "UPDATE_USER_IN_USERS",
      body,
      onSuccess,
      "PATCH"
    );
  };

  const renderButtons = () => {
    if (data.identity_verified === 0) {
      return (
        <div>
          <FormComponent
            {...{
              text: "Approve",
              fetching,
              errors,
              message,
              onSubmit: approve,
            }}
          />
          <FormComponent
            {...{
              text: "Decline",
              fetching,
              errors,
              message,
              onSubmit: decline,
            }}
          />
        </div>
      );
    }
  };

  const renderVerfication = () => {
    if (data.photo_front_view && data.photo_back_view) {
      return (
        <div>
          <img
            src={`/uploads/images/${data.photo_front_view}`}
            className="responsive-img"
          />
          <br />
          <img
            src={`/uploads/images/${data.photo_back_view}`}
            className="responsive-img"
          />
          {renderButtons()}
        </div>
      );
    }
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <div className="row">
          <div className="col l4 s12">
            <center>
              <img
                src={`/uploads/images/${data.photo_profile}`}
                className="responsive-img circle"
              />
              <br />

              <Link to={{ pathname: `/control/users/${id}/push`, data }}>
                Send Push
              </Link>
              <br />
              <Link to={{ pathname: `/control/users/${id}/email`, data }}>
                Send Email
              </Link>

              <br />
              <br />

              {renderVerfication()}
            </center>
          </div>

          <div className="col l8 s12">
            <table className="striped">
              <tbody>{renderRow()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default UsersReadPage;
