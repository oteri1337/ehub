import React from "react";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "providers/AppProvider";
import AdminContainerComponent from "components/container/AdminContainerComponent";

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
    label: "Parent Groups",
    link: "/control/pdfparentgroups/list.html",
  },
  {
    label: "Create",
  },
];

function PdfGroupsCreatePage({ history }) {
  const { request, callBack } = sendRequestThenDispatch();
  const { errors, fetching, message } = request;

  const formArray = [
    {
      id: "title",
    },
  ];

  const onSuccess = () => {
    history.push("/control/pdfparentgroups/list.html");
  };

  const onSubmit = async (body) => {
    callBack("/api/pdfparentgroups", "UPDATE_PDFPARENTGROUP", body, onSuccess);
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <Form {...{ formArray, onSubmit, fetching, errors, message }} />
      </div>
    </AdminContainerComponent>
  );
}

export default PdfGroupsCreatePage;
