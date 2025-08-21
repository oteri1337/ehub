import React from "react";
import FormComponent from "components/FormComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";
import {
  sendRequestThenDispatch,
  getRequestThenDispatch,
} from "../../../hooks";

function EventsUpdatePage({ match, history }) {
  const { id } = match.params;
  const get = getRequestThenDispatch(`/api/programs/${id}`, "UPDATE_program");
  const { request, callBack, state } = sendRequestThenDispatch();
  const { errors, fetching, message } = request;

  const initialState = state.events.object[id];

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
      label: `${initialState.title}`,
      link: `/control/events/${initialState.id}`,
    },
    {
      label: "Update Data",
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
    {
      id: "type",
      type: "select",
      options: [
        {
          value: 1,
          label: "News",
        },
        {
          value: 2,
          label: "Event",
        },
      ],
    },
    {
      id: "date",
      type: "date",
    },
    {
      id: "allow_comments",
      type: "select",
      options: [
        {
          value: "yes",
        },
        {
          value: "no",
        },
      ],
    },
  ];

  const onSuccess = () => {
    history.push(`/control/events/${id}`);
  };

  const onSubmit = (body) => {
    callBack("/api/events", "UPDATE_EVENT", body, onSuccess, "PATCH");
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <FormComponent
          {...{ formArray, initialState, onSubmit, errors, fetching, message }}
        />
      </div>
    </AdminContainerComponent>
  );
}

export default EventsUpdatePage;
