import React from "react";
import {
  getRequestThenDispatch,
  sendFormRequestThenDispatch,
} from "../../../hooks";
import Form from "components/UncontrolledFormComponent";
import ContainerComponent from "components/container/AdminContainerComponent";

function PdfsUpdateFilePage({ location, match }) {
  const dispatch = "UPDATE_PDF";
  const { slug } = match.params;
  const { state } = getRequestThenDispatch(`/api/pdfs/${slug}`, dispatch);
  const { request, callBack } = sendFormRequestThenDispatch();
  const { fetching, errors, message } = request;

  const data = state.pdfs.object[slug] || location.data;

  if (!data) {
    return (
      <ContainerComponent>
        <div className="card-panel">PDF Not Found</div>
      </ContainerComponent>
    );
  }

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Pdfs",
      link: "/control/pdfs/index.html",
    },
    {
      label: "List",
      link: "/control/pdfs/list.html",
    },
    {
      label: `${data.title}`,
      link: `/control/pdfs/${data.slug}`,
    },
    {
      label: "Update PDF",
    },
  ];

  const formObjects = [
    {
      id: "pdf",
      type: "file",
    },
  ];

  const initialState = [
    {
      key: "id",
      value: data?.id,
    },
  ];

  const callback = async (body) => {
    callBack("/api/pdfs/file", dispatch, body);
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
            message,
          }}
        />
      </div>
    </ContainerComponent>
  );
}

export default PdfsUpdateFilePage;
