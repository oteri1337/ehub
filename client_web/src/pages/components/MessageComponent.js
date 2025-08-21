import React from "react";
import { CSSTransition } from "react-transition-group";

function MessageComponent({ errors = [], message = "" }) {
  if (message.length) {
    return (
      <CSSTransition classNames="fade" appear={true} in={true} timeout={300}>
        <React.Fragment>
          <br />
          <div
            className="green lighten-4 card-panel black-text"
            style={{ overflowWrap: "break-word" }}
          >
            {message}
          </div>
        </React.Fragment>
      </CSSTransition>
    );
  }

  if (!errors.length) {
    return <React.Fragment />;
  }

  errors = errors.map(error => (
    <React.Fragment key={error}>
      <span>{error}</span>
    </React.Fragment>
  ));
  return (
    <CSSTransition classNames="fade" in={true} appear={true} timeout={300}>
      <React.Fragment>
        <br />
        <div className="red black-text lighten-4 card-panel">{errors}</div>
      </React.Fragment>
    </CSSTransition>
  );
}

export default MessageComponent;
