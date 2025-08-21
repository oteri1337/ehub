import React from "react";

function DismissableComponent({ message = "" }) {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) {
    return <React.Fragment />;
  }

  const onClick = () => {
    setDismissed(true);
  };

  return (
    <ul className="collection">
      <li className="collection-item">
        {message}
        <span style={{ float: "right", cursor: "pointer" }} onClick={onClick}>
          X
        </span>
      </li>
    </ul>
  );
}

export default DismissableComponent;
