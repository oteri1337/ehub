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
    {
      id: "icon",
      type: "select",
      options: [
        {
          value: "droplet",
        },
        {
          value: "anchor",
        },
        {
          value: "cpu",
        },
        {
          value: "thermometer",
        },
        {
          value: "settings",
        },
      ],
    },
  ];

  const onSuccess = () => {
    history.push("/control/pdfparentgroups/list.html");
  };

  const onSubmit = async (body) => {
    callBack("/api/pdfparentgroups", "UPDATE_PDFPARENTGROUP", body, onSuccess);
  };

  const initialState = {
    icon: "droplet",
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <Form
          {...{ formArray, onSubmit, fetching, errors, message, initialState }}
        />
      </div>
    </AdminContainerComponent>
  );
}

export default PdfGroupsCreatePage;
