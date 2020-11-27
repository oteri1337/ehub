import React from "react";
import { Link } from "react-router-dom";
import ListComponent from "components/ListComponent";
import SearchComponent from "components/SearchComponent";
import { getRequestThenDispatch } from "providers/AppProvider";
import FloatingButtonComponent from "components/FloatingButtonComponent";
import SecondaryButtonComponent from "components/SecondaryButtonComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function EventsListPage() {
  const url = "/api/events";

  const dispatch = "UPDATE_EVENTS";

  const { state, fetching } = getRequestThenDispatch(url, dispatch);

  const list = state.events;

  const { search_keys } = list;

  const title = "Add Event";

  const to = "/control/events/create.html";

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Events",
    },
  ];

  const callback = (props) => {
    const type = "DELETE";
    const body = { id: props.id };
    const title = `Delete ${props.title}`;

    const beforeSubmit = () => {
      return confirm(`are you sure you want to delete ${props.title}`);
    };

    return (
      <li key={props.id} className="collection-item avatar">
        <img src={`/uploads/images/${props.image}`} className="circle" />
        <Link to={`/control/events/${props.id}`} className="props-title">
          {props.title}
        </Link>
        <p className="grey-text">{props.date}</p>
        <div className="secondary-content">
          <SecondaryButtonComponent
            {...{ type, url, dispatch, body, title, beforeSubmit }}
          />
        </div>
      </li>
    );
  };

  return (
    <AdminContainerComponent bread={nav}>
      <SearchComponent {...{ url, dispatch, search_keys }} />
      <ListComponent {...{ list, dispatch, callback, fetching }} />
      <FloatingButtonComponent {...{ to, title }} />
    </AdminContainerComponent>
  );
}

export default EventsListPage;
