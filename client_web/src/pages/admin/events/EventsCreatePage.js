import React from "react";
import Form from "components/FormComponent";
import { sendFormRequestThenDispatch } from "providers/AppProvider";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function EventsCreatePage({ history }) {
  const { request, callBack } = sendFormRequestThenDispatch();
  const { errors, fetching, message } = request;

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Events",
      link: "/control/events/list.html",
    },
    {
      label: "Create",
    },
  ];

  const formArray = [
    {
      id: "title",
    },
    {
      id: "data",
      type: "textarea",
    },
    // {
    //   id: "type",
    //   type: "select",
    //   options: [
    //     {
    //       value: 1,
    //       label: "News",
    //     },
    //     {
    //       value: 2,
    //       label: "Event",
    //     },
    //   ],
    // },
    {
      id: "date",
      type: "date",
    },
  ];

  const onSuccess = () => {
    history.push(`/control/events/list.html`);
  };

  const onSubmit = async (body) => {
    let formData = new FormData();

    for (let key in body) {
      formData.append(key, body[key]);
    }

    callBack("/api/events", "UPDATE_EVENT", formData, onSuccess);
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <Form
          {...{ formArray, request, onSubmit, errors, fetching, message }}
        />
      </div>
    </AdminContainerComponent>
  );
}

export default EventsCreatePage;
