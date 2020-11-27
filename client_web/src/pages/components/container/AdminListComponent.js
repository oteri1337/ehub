import React, { Fragment } from "react";
import ListComponent from "components/ListComponent";
import SearchComponent from "components/SearchComponent";
import { getRequestThenDispatch } from "providers/AppProvider";
import AdminContainerComponent from "./AdminContainerComponent";
import ListDefaultComponent from "components/ListDefaultComponent";
import FloatingButtonComponent from "components/FloatingButtonComponent";

function AdminListComponent(props) {
  const endpoint = props.endpoint || "";
  const dispatch = props.dispatch || "";

  const { state, fetching } = getRequestThenDispatch(endpoint, dispatch);

  const list = state[props.list] || [];

  const nav = props.nav || [];
  const to = props.to || false;

  const callback =
    props.callback ||
    function (props) {
      return <ListDefaultComponent {...props} key={props.id} />;
    };

  return (
    <AdminContainerComponent bread={nav}>
      <SearchComponent
        endpoint={endpoint + "/search"}
        dispatch={dispatch}
        label="Search"
        data={list.search_keys}
      />
      <ListComponent
        list={list}
        dispatch={`${dispatch}`}
        callback={callback}
        fetching={fetching}
      />
      {to ? (
        <FloatingButtonComponent title={props.title} to={to} />
      ) : (
        <Fragment />
      )}
    </AdminContainerComponent>
  );
}

export default AdminListComponent;
