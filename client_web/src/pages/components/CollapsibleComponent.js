import React from "react";

function CollapsibleComponent({ data = [] }) {
  const collapsibles = data.map((c) => {
    return (
      <li key={c.header}>
        <div className="collapsible-header">
          <i className="material-icons">arrow_drop_down</i>
          {c.header}
        </div>
        <div className="collapsible-body">
          <span>{c.body}</span>
        </div>
      </li>
    );
  });

  return <ul className="collapsible">{collapsibles}</ul>;
}

export default CollapsibleComponent;
