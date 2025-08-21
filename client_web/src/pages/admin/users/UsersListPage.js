import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import AdminListComponent from "components/container/AdminListComponent";

function UsersListPage() {
  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Users",
    },
  ];

  const endpoint = "/api/users";

  const dispatch = "UPDATE_USERS";

  const list = "users";

  const callback = (props) => {
    return (
      <li className="collection-item avatar" key={props.id}>
        <img
          src={`/uploads/images/${props.photo_profile}`}
          alt=""
          className="circle"
        />
        <span className="grey-text">{props.id} </span>
        <Link
          to={{
            pathname: `/control/users/${props.id}`,
            props,
          }}
          className="app-list-link"
        >
          <b>
            {props.first_name} {props.last_name}
          </b>
        </Link>

        {props.device_verified == 0 ? (
          <p className="grey-text">Pending Verification</p>
        ) : (
          <Fragment />
        )}
      </li>
    );
  };

  return (
    <AdminListComponent {...{ nav, endpoint, dispatch, list, callback }} />
  );
}

export default UsersListPage;
