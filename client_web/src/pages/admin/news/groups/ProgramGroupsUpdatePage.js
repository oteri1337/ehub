import React from "react";
import {
  getRequestThenDispatch,
  sendRequestThenDispatch
} from "../../../../hooks";
import FormComponent from "../../../page_components/FormComponent";
import AdminContainerComponent from "../../admin_components/AdminContainerComponent";

function SongGroupUpdatePage({ location, match, history }) {
  const dispatch = "UPDATE_ANIMATIONGROUP";
  const { slug } = match.params;
  const { state } = getRequestThenDispatch(
    `/api/animationgroups/${slug}`,
    dispatch
  );
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const data = state.animationgroups.object[slug] || location.props;

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html"
    },
    {
      label: "Animations",
      link: "/control/animations/index.html"
    },
    {
      label: "Categories",
      link: "/control/animationgroups/list.html"
    },
    {
      label: data?.title ?? ""
    }
  ];

  const formArray = [
    {
      id: "title"
    }
  ];

  const initialState = {
    id: data?.id,
    title: data?.title
  };

  const onSuccess = () => {
    history.push("/control/animationgroups/list.html");
  };

  const onSubmit = body => {
    callBack("/api/animationgroups", dispatch, body, onSuccess, "PATCH");
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <FormComponent
          {...{ formArray, initialState, fetching, errors, message, onSubmit }}
        />
      </div>
    </AdminContainerComponent>
  );
}

export default SongGroupUpdatePage;
