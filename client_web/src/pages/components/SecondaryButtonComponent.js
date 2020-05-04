import React from "react";
import { sendRequestThenDispatch } from "providers/AppProvider";

function SecondaryButtonComponent(props) {
  const { url, type = "POST", dispatch, body, title = "", icon } = props;
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching } = request;

  const beforeSubmit =
    props.beforeSubmit ||
    function () {
      return true;
    };

  if (fetching) {
    return (
      <div className="secondary-content">
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-blue">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const onClick = () => {
    const sure = beforeSubmit();
    if (sure) {
      callBack(url, dispatch, body, undefined, type);
    }
  };

  return (
    <a className="secondary-content" onClick={onClick} title={title ?? ""}>
      <i className="material-icons"> {icon || "delete"}</i>
    </a>
  );
}

export default SecondaryButtonComponent;
