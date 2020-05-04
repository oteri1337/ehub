import React from "react";
import Form from "components/RichFormComponent";
import FileUploadComponent from "components/FileUploadComponent";
import { sendFormRequestThenDispatch } from "providers/AppProvider";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function NewsCreatePage({ history }) {
  const { request, callBack } = sendFormRequestThenDispatch();

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "News",
      link: "/control/news/list.html",
    },
    {
      label: "Create",
    },
  ];

  const formObjects = [
    {
      id: "title",
    },
    {
      id: "content",
      type: "richeditor",
    },
  ];

  const onSuccess = () => {
    history.push(`/control/news/list.html`);
  };

  const submitCallback = async (body) => {
    let formData = new FormData();

    for (let key in body) {
      formData.append(key, body[key]);
    }

    callBack("/api/news", "UPDATE_NEW", formData, onSuccess);
  };

  const text = "Post";

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <FileUploadComponent type="image" />
        <FileUploadComponent type="video" />
        <Form {...{ formObjects, request, submitCallback, text }} />
      </div>
    </AdminContainerComponent>
  );
}

export default NewsCreatePage;
