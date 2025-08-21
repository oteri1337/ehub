import React from "react";
import { Link } from "react-router-dom";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function PDfsPage() {
  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Pdfs",
    },
  ];

  return (
    <AdminContainerComponent bread={nav}>
      <ul className="collection">
        <li className="collection-item">
          <Link to="/control/pdfs/list.html" className="app-list-link">
            <span className="material-icons notranslate">archive</span>
            <b>Pdf List</b>
          </Link>
        </li>

        <li className="collection-item">
          <Link to="/control/pdfgroups/list.html" className="app-list-link">
            <span className="material-icons notranslate">archive</span>
            <b>Pdf Groups</b>
          </Link>
        </li>

        <li className="collection-item">
          <Link
            to="/control/pdfparentgroups/list.html"
            className="app-list-link"
          >
            <span className="material-icons notranslate">archive</span>
            <b>Pdf Parent Groups</b>
          </Link>
        </li>
      </ul>
    </AdminContainerComponent>
  );
}

export default PDfsPage;
