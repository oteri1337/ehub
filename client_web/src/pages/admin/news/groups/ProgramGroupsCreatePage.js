import React from "react";
import { nav as parentNav } from "./AnimationGroupsListPage";
import { sendRequestThenDispatch } from "../../../../hooks";
import FormComponent from "../../../page_components/FormComponent";
import AdminContainerComponent from "../../admin_components/AdminContainerComponent";

function SongGroupsCreatePage(props) {
  let childProps = {};
  const { request, callBack } = sendRequestThenDispatch();
  childProps = { ...request };

  let nav = JSON.parse(JSON.stringify(parentNav));
  nav[nav.length - 1].link = "/control/animationgroups/list.html";
  nav[nav.length] = { label: "Create" };

  childProps.formArray = [
    {
      id: "title"
    }
  ];

  const onSuccess = () => {
    props.history.push("/control/animationgroups/list.html");
  };

  childProps.onSubmit = async body => {
    callBack("/api/animationgroups", "UPDATE_ANIMATIONGROUP", body, onSuccess);
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <FormComponent {...childProps} />
      </div>
    </AdminContainerComponent>
  );
}

export default SongGroupsCreatePage;
