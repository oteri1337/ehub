import React from "react";
import { Link } from "react-router-dom";
import { getRequestThenDispatch } from "../../../../hooks";
import DeleteComponent from "../../../page_components/DeleteComponent";
import AdminListComponent from "../../admin_components/AdminListComponent";

export const nav = [
  {
    label: "Control Panel",
    link: "/control/index.html"
  },
  {
    label: "Animations",
    link: "/control/animations/index.html"
  },
  {
    label: "Categories"
  }
];

function SongGroupsListPage() {
  const endpoint = "/api/animationgroups";
  const dispatch = "UPDATE_ANIMATIONGROUPS";

  const { state } = getRequestThenDispatch(endpoint, dispatch);
  const list = state.animationgroups;

  const callback = props => {
    return (
      <li className="collection-item" key={props.id}>
        <DeleteComponent {...{ endpoint, dispatch, id: props.id }} />
        <Link
          to={{
            pathname: `/control/animationgroups/${props.slug}`,
            props
          }}
          className="black-text"
        >
          <b>{props.title}</b>
        </Link>
        <p>{props.slug}</p>
      </li>
    );
  };

  const to = "/control/animationgroups/create.html";

  return (
    <AdminListComponent {...{ nav, endpoint, dispatch, list, callback, to }} />
  );
}

export default SongGroupsListPage;
