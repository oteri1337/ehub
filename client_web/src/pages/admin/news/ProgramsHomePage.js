import React from "react";
import { Link } from "react-router-dom";
import AdminContainerComponent from "../admin_components/AdminContainerComponent";

function MusicHomePage() {
  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html"
    },
    {
      label: "Animations"
    }
  ];

  return (
    <AdminContainerComponent bread={nav}>
      <ul className="collection">
        <li className="collection-item">
          <Link to="/control/animations/list.html" className="black-text">
            <span className="material-icons notranslate">headset</span>
            <b>Animations List</b>
          </Link>
        </li>

        <li className="collection-item">
          <Link to="/control/animationgroups/list.html" className="black-text">
            <span className="material-icons notranslate">movie_filter</span>
            <b>Animation Categories</b>
          </Link>
        </li>
      </ul>
    </AdminContainerComponent>
  );
}

export default MusicHomePage;
