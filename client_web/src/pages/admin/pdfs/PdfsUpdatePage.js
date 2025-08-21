import React from "react";
import FormComponent from "components/FormComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";
import { sendRequestThenDispatch } from "../../../hooks";

function PdfsUpdatePage({ match, history }) {
  const { slug } = match.params;
  const { request, callBack, state } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const initialState = state.pdfs.object[slug];

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
      label: `${initialState.title}`,
      link: `/control/pdfs/${initialState.slug}`,
    },
    {
      label: "Update Data",
    },
  ];

  const formArray = [
    {
      id: "title",
    },
    {
      id: "description",
      type: "textarea",
    },
  ];

  const onSuccess = () => {
    history.push(`/control/pdfs/${slug}`);
  };

  const onSubmit = (body) => {
    callBack("/api/pdfs", "UPDATE_EVENT", body, onSuccess, "PATCH");
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <FormComponent
          {...{ formArray, initialState, onSubmit, fetching, errors, message }}
        />
      </div>
    </AdminContainerComponent>
  );
}

export default PdfsUpdatePage;
