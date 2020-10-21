import React from "react";
import { getRequestThenDispatch, sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function PdfGroupUpdatePage({ location, match, history }) {
  const dispatch = "UPDATE_PDFGROUP";
  const { slug } = match.params;
  const { state } = getRequestThenDispatch(`/api/pdfgroups/${slug}`, dispatch);
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const data = state.pdfgroups.object[slug] || location.props;

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
      label: "Groups",
      link: "/control/pdfgroups/list.html",
    },
    {
      label: data?.title ?? "",
    },
  ];

  const formArray = [
    {
      id: "title",
    },
  ];

  const initialState = {
    id: data?.id,
    title: data?.title,
  };

  const onSuccess = () => {
    history.push("/control/pdfgroups/list.html");
  };

  const onSubmit = (body) => {
    callBack("/api/pdfgroups", dispatch, body, onSuccess, "PATCH");
  };

  const text = "Update";

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <FormComponent
          {...{
            formArray,
            initialState,
            fetching,
            errors,
            message,
            onSubmit,
            text,
          }}
        />
      </div>
    </AdminContainerComponent>
  );
}

export default PdfGroupUpdatePage;
