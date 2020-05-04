import React from "react";
import { Link } from "react-router-dom";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function AdminHomePage() {
  const nav = [
    {
      label: "Control Panel",
    },
  ];

  return (
    <AdminContainerComponent bread={nav}>
      <ul className="collection">
        <li className="collection-item">
          <Link to="/control/pdfs/index.html" className="app-list-link">
            <span className="material-icons notranslate">book</span>
            <b>Pdfs</b>
          </Link>
        </li>

        <li className="collection-item">
          <Link to="/control/news/list.html" className="app-list-link">
            <span className="material-icons notranslate">notes</span>
            <b>News</b>
          </Link>
        </li>

        <li className="collection-item">
          <Link to="/control/topics/list.html" className="app-list-link">
            <span className="material-icons notranslate">forum</span>
            <b>Topics</b>
          </Link>
        </li>

        <li className="collection-item">
          <Link to="/control/users/list.html" className="app-list-link">
            <span className="material-icons notranslate">
              supervised_user_circle
            </span>
            <b>Users</b>
          </Link>
        </li>
      </ul>
    </AdminContainerComponent>
  );
}

export default AdminHomePage;
