import React from "react";
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
  const { state } = getRequestThenDispatch(url, dispatch);

  const list = state.pdfgroups;

  const callback = (props) => {
    const type = "DELETE";
    const body = { id: props.id };

    return (
      <li className="collection-item" key={props.id}>
        <SecondaryButtonComponent {...{ url, dispatch, type, body }} />
        <b>{props.title}</b>
        <p>{props.slug}</p>
      </li>
    );
  };

  return (
    <AdminContainerComponent bread={nav}>
      <SearchComponent {...{ url, dispatch, list }} />
      <ListComponent {...{ list, dispatch, callback }} />
      <FloatingButtonComponent {...{ title, to }} />
    </AdminContainerComponent>
  );
}

export default PdfGroupsListPage;
