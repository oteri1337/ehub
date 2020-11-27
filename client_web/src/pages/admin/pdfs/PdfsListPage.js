import React from "react";
import { Link } from "react-router-dom";
import ListComponent from "components/ListComponent";
import SearchComponent from "components/SearchComponent";
import { getRequestThenDispatch } from "providers/AppProvider";
import FloatingButtonComponent from "components/FloatingButtonComponent";
import SecondaryButton from "components/SecondaryButtonComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function PdfsPage() {
  const url = "/api/pdfs";
  const dispatch = "UPDATE_PDFS";
  const { state, fetching } = getRequestThenDispatch(url, dispatch);

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
      <li key={props.id} className="collection-item avatar">
        <img src={`/uploads/images/${props.image_name}`} className="circle" />
        <Link to={`/control/pdfs/${props.slug}`}>{props.title}</Link>
        <p className="grey-text">{props.file_size_string}</p>
        <SecondaryButton
          {...{ type, url, dispatch, body, title, beforeSubmit }}
        />
      </li>
    );
  };

  return (
    <AdminContainerComponent bread={nav}>
      <SearchComponent
        endpoint={url + "/search"}
        dispatch={dispatch}
        label="Search"
        data={state.pdfs.search_keys}
      />
      <ListComponent
        list={state.pdfs}
        dispatch={`${dispatch}`}
        callback={callback}
        fetching={fetching}
      />
      <FloatingButtonComponent title="Add Pdf" to="/control/pdfs/create.html" />
    </AdminContainerComponent>
  );
}

export default PdfsPage;
