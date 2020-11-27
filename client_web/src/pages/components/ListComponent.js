import React from "react";
import PaginationComponent from "./PaginationComponent";
import ListDefaultComponent from "./ListDefaultComponent";

function ListComponent(props) {
  const fetching = props.fetching || false;
  const list = props.list || {};
  const data = list.data || [];

  if (data.length === 0) {
    return (
      <ul className="collection">
        <ul className="collection-item">
          {fetching ? (
            <p id="fetching">fetching...</p>
          ) : (
            <p id="no-data" style={{ textAlign: "center" }}>
              {props.empty || "No Data Found"}
            </p>
          )}
        </ul>
      </ul>
    );
  }

  const dispatch = props.dispatch || "";
  const callback =
    props.callback ||
    function (props) {
      return <ListDefaultComponent {...props} key={props.id} />;
    };

  const list_items = data.map(callback);

  const renderSpinner = () => {
    if (fetching) {
      return (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      {renderSpinner()}
      <ul className="collection">{list_items}</ul>
      <PaginationComponent list={list} dispatch={dispatch + "_PAGE"} />
    </React.Fragment>
  );
}

export default ListComponent;
