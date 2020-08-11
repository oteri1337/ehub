import React from "react";
import {
  getRequestThenDispatch,
  sendFormRequestThenDispatch,
} from "../../../hooks";
import Form from "components/UncontrolledFormComponent";
import ContainerComponent from "components/container/AdminContainerComponent";

function EventsUpdateImagePage({ location, history, match }) {
  const dispatch = "UPDATE_PROGRAM";
  const { id } = match.params;
  const { state } = getRequestThenDispatch(`/api/events/${id}`, dispatch);
  const { request, callBack } = sendFormRequestThenDispatch();
  const { fetching, errors, message } = request;

  const data = state.events.object[id] || location.data;

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
      label: `${data.title}`,
      link: `/control/events/${data.id}`,
    },
    {
      label: "Update Image",
    },
  ];

  const formObjects = [
    {
      id: "image",
      type: "file",
    },
  ];

  const initialState = [
    {
      key: "id",
      value: data?.id,
    },
  ];

  const onSuccess = ({ id }) => {
    history.push(`/control/events/${id}`);
  };

  const callback = async (body) => {
    callBack("/api/events/image", dispatch, body, onSuccess);
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <div className="row">
          <div className="col l6 s12">
            <img
              src={`/uploads/images/${data.image}`}
              className="responsive-img"
            />
          </div>
          <div className="col l6 s12">
            <Form
              {...{
                formObjects,
                initialState,
                callback,
                fetching,
                errors,
                message,
              }}
            />
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default EventsUpdateImagePage;
