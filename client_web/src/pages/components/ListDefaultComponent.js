import React from "react";

function ListDefaultComponent(props) {
  return (
    <li className="collection-item" key={props.id}>
      <p>ID: {props.id}</p>
      <p className="grey-text">Created At: {props.created_at}</p>
      <p className="grey-text">Updated At: {props.updated_at}</p>
    </li>
  );
}

export default ListDefaultComponent;
