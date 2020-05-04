import React from "react";
import {
  getRequestThenDispatch,
  sendFormRequestThenDispatch
} from "../../../hooks";
import Form from "../../page_components/UncontrolledFormComponent";
import ContainerComponent from "../admin_components/AdminContainerComponent";

function MusicUpdateImagePage({ location, history, match }) {
  const dispatch = "UPDATE_PROGRAM";
  const { slug } = match.params;
  const { state } = getRequestThenDispatch(`/api/programs/${slug}`, dispatch);
  const { request, callBack } = sendFormRequestThenDispatch();
  const { fetching, errors, message } = request;

  const data = state.programs.object[slug] || location.data;

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html"
    },
    {
      label: "Programs",
      link: "/control/programs/list.html"
    },
    {
      label: "List",
      link: "/control/programs/list.html"
    },
    {
      label: `${data.title}`,
      link: `/control/programs/${data.slug}`
    },
    {
      label: "Update Image"
    }
  ];

  const formObjects = [
    {
      id: "image",
      type: "file"
    }
  ];

  const initialState = [
    {
      key: "id",
      value: data?.id
    }
  ];

  const onSuccess = ({ slug }) => {
    history.push(`/control/programs/${slug}`);
  };

  const callback = async body => {
    callBack("/api/programs/image", dispatch, body, onSuccess);
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <Form
          {...{
            formObjects,
            initialState,
            callback,
            fetching,
            errors,
            message
          }}
        />
      </div>
    </ContainerComponent>
  );
}

export default MusicUpdateImagePage;
