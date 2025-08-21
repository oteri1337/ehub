import React from "react";
import { Link } from "react-router-dom";
import ListComponent from "components/ListComponent";
import SearchComponent from "components/SearchComponent";
import { getRequestThenDispatch } from "providers/AppProvider";
import FloatingButtonComponent from "components/FloatingButtonComponent";
import SecondaryButtonComponent from "components/SecondaryButtonComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

const nav = [
  {
    label: "Control Panel",
    link: "/control/index.html",
  },
  {
    label: "Pdfs",
    link: "/control/pdfs/index.html",
  },
  {
    label: "Groups",
  },
];

const url = "/api/pdfgroups";

const title = "Add Pdf Group";

const dispatch = "UPDATE_PDFGROUPS";

const to = "/control/pdfgroups/create.html";

function PdfGroupsListPage() {
  const { state, fetching } = getRequestThenDispatch(url, dispatch);

  const list = state.pdfgroups;

  const callback = (props) => {
    const type = "DELETE";
    const body = { id: props.id };

    const pathname = `/control/pdfgroups/${props.slug}`;

    const beforeSubmit = () => {
      return confirm(`are you sure you want to delete ${props.title}`);
    };

    return (
      <li className="collection-item" key={props.id}>
        <SecondaryButtonComponent
          {...{ url, dispatch, type, body, beforeSubmit }}
        />
        <b>
          <Link to={{ pathname, props }}>{props.title}</Link>
        </b>
        <p>{props.slug}</p>
      </li>
    );
  };

  return (
    <AdminContainerComponent bread={nav}>
      <SearchComponent {...{ url, dispatch, list }} />
      <ListComponent {...{ list, dispatch, callback, fetching }} />
      <FloatingButtonComponent {...{ title, to }} />
    </AdminContainerComponent>
  );
}

export default PdfGroupsListPage;
