import React from "react";
import { Link } from "react-router-dom";
import ListComponent from "components/ListComponent";
import SearchComponent from "components/SearchComponent";
import { getRequestThenDispatch } from "providers/AppProvider";
import FloatingButtonComponent from "components/FloatingButtonComponent";
import SecondaryButtonComponent from "components/SecondaryButtonComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function NewsListPage() {
  const url = "/api/news";

  const dispatch = "UPDATE_NEWS";

  const { state } = getRequestThenDispatch(url, dispatch);

  const list = state.news;

  const { search_keys } = list;

  const title = "Add News";

  const to = "/control/news/create.html";

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
      label: "List",
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
        <img src={`/uploads/images/${props.image}`} className="circle" />
        <Link to={`/control/news/${props.slug}`} className="props-title">
          {props.title}
        </Link>
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
      <ListComponent {...{ list, dispatch, callback }} />
      <FloatingButtonComponent {...{ to, title }} />
    </AdminContainerComponent>
  );
}

export default NewsListPage;
