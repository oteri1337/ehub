import React from "react";
import { Link } from "react-router-dom";
import ListComponent from "components/ListComponent";
import SearchComponent from "components/SearchComponent";
import { getRequestThenDispatch } from "providers/AppProvider";
import SecondaryButtonComponent from "components/SecondaryButtonComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function NewsListPage() {
  const url = "/api/topics";

  const dispatch = "UPDATE_TOPICS";

  const { state, fetching } = getRequestThenDispatch(url, dispatch);

  const list = state.topics;

  const { search_keys } = list;

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Topics",
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
      <li key={props.id} className="collection-item app-item avatar">
        <p style={{ backgroundColor: props.color }} className="circle" />
        <Link to={`/control/topics/${props.id}`} className="props-title">
          {props.title}
        </Link>
        <p className="grey-text">{props.comments_count} Comments</p>
        {/* <div className="secondary-content">
          <SecondaryButtonComponent
            {...{ type, url, dispatch, body, title, beforeSubmit }}
          />
        </div> */}
      </li>
    );
  };

  return (
    <AdminContainerComponent bread={nav}>
      <SearchComponent {...{ url, dispatch, search_keys }} />
      <ListComponent {...{ list, dispatch, callback, fetching }} />
    </AdminContainerComponent>
  );
}

export default NewsListPage;
