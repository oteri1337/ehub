import React from "react";
import { sendFormRequestThenDispatch } from "providers/AppProvider";
import UncontrolledFormComponent from "components/UncontrolledFormComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function PdfsCreatePage(props) {
  const { request, callBack } = sendFormRequestThenDispatch();

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
      label: "Upload Pdf",
    },
  ];

  const formArray = [
    {
      id: "image",
      type: "file",
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
    },
  ];

  const onSuccess = () => {
    props.history.push("/control/pdfs/list.html");
  };

  const onSubmit = async (body) => {
    callBack("/api/pdfs", "UPDATE_SONG", body, onSuccess);
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <div className="row">
          <div className="col l8 s12">
            <UncontrolledFormComponent
              formObjects={formArray}
              callback={onSubmit}
              fetching={request.fetching}
              errors={request.errors}
              message={request.message}
              text="Upload"
            />
          </div>
          <div className="col l4 s12">Image Preview Goes Here</div>
        </div>
      </div>
    </AdminContainerComponent>
  );
}

export default PdfsCreatePage;
