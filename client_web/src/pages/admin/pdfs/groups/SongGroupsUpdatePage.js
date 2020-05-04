import React from "react";
import {
  getRequestThenDispatch,
  sendRequestThenDispatch
} from "../../../../hooks";
import FormComponent from "../../../page_components/FormComponent";
import AdminContainerComponent from "../../admin_components/AdminContainerComponent";

function SongGroupUpdatePage({ location, match, history }) {
  const dispatch = "UPDATE_SONGGROUP";
  const { slug } = match.params;
  const { state } = getRequestThenDispatch(`/api/songgroups/${slug}`, dispatch);
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const data = state.songgroups.object[slug] || location.props;

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html"
    },
    {
      label: "Songs",
      link: "/control/songs/index.html"
    },
    {
      label: "Categories",
      link: "/control/songgroups/list.html"
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
    history.push("/control/songgroups/list.html");
  };

  const onSubmit = body => {
    callBack("/api/songgroups", dispatch, body, onSuccess, "PATCH");
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
