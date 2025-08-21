import React from "react";
import { EditorContext } from "providers/EditorProvider";
import { sendFormRequestThenDispatch } from "providers/AppProvider";
import UncontrolledFormComponent from "./UncontrolledFormComponent";

function FileUploadComponent({ type }) {
  const { callReducer } = React.useContext(EditorContext);
  const { request, callBack } = sendFormRequestThenDispatch();
  const { errors, fetching, message } = request;

  React.useLayoutEffect(() => {
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});
  }, []);

  const formObjects = [
    {
      id: "image",
      type: "file",
      label: `Select ${type}`,
    },
  ];

  const closeModal = () => {
    const elem = document.querySelector(`#${type}`);
    const instance = M.Modal.getInstance(elem);
    instance.close();
  };

  const onSuccess = (name) => {
    if (name) {
      const dispatch = "ADD_EDITOR_IMAGE";
      const data = `${location.protocol}//${location.hostname}/uploads/images/${name}`;
      callReducer({ dispatch, data: { src: data, type } });
      closeModal();
    }
  };

  const callback = (body) => {
    callBack("/api/uploadphoto", "NO_DISPATCH", body, onSuccess);
  };

  return (
    <div id={type} className="modal">
      <div className="modal-content">
        <h4>Upload {type}</h4>
        <br />
        <UncontrolledFormComponent
          {...{ formObjects, errors, fetching, message, callback }}
        />
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">
          CLOSE
        </a>
      </div>
    </div>
  );
}

export default FileUploadComponent;
