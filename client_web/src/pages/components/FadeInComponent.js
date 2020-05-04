import React from "react";
import { CSSTransition } from "react-transition-group";

function FadeInComponent(props) {
  return (
    <CSSTransition classNames="fade" in={true} appear={true} timeout={300}>
      {props.children}
    </CSSTransition>
  );
}

export default FadeInComponent;
