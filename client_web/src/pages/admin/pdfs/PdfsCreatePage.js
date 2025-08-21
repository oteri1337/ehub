import React from "react";
import Form from "components/UncontrolledFormComponent";
import { sendUploadRequestThenDispatch } from "providers/AppProvider";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function PdfsCreatePage(props) {
  const {
    response,
    callBack,
    fetching,
    progress,
  } = sendUploadRequestThenDispatch();
  const { errors, message } = response;

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
      label: "Upload Pdf",
    },
  ];

  const formObjects = [
    {
      id: "image",
      type: "file",
      accept: ".jpg,.png,.jpg",
    },
    {
      id: "title",
    },
    {
      id: "description",
      type: "textarea",
    },
    {
      id: "file",
      type: "file",
      accept: ".pdf",
    },
  ];

  const onSuccess = () => {
    props.history.push("/control/pdfs/list.html");
  };

  const callback = async (body) => {
    callBack("/api/pdfs", "UPDATE_SONG", body, onSuccess);
  };

  const text = "Upload";

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <div className="container">
          <Form
            {...{
              formObjects,
              callback,
              fetching,
              text,
              errors,
              message,
              progress,
            }}
          />
        </div>
      </div>
    </AdminContainerComponent>
  );
}

export default PdfsCreatePage;
