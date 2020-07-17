import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Store } from "providers/AppProvider";

function UserRoute(props) {
  const { state } = React.useContext(Store);
  const { user } = state;
  let path = "";

  if (user === false) {
    path = "/signin.html";
    if (props.path == path) {
      return <Route {...props} />;
    }
    return <Redirect to={path} />;
  }

  // if (user.first_name === "") {
  //   path = "/user/auth/signup/step2.html";
  //   if (props.path == path) {
  //     return <Route {...props} />;
  //   }
  //   return <Redirect to={path} />;
  // }

  if (user.device_verified === 0) {
    path = "/user/auth/signup/step3.html";
    if (props.path == path) {
      return <Route {...props} />;
    }
    return <Redirect to={path} />;
  }

  // if (user.identity_verified === 0) {
  //   path = "/user/auth/signup/step4.html";
  //   if (props.path == path) {
  //     return <Route {...props} />;
  //   }
  //   return <Redirect to={path} />;
  // }

  return <Route {...props} />;
}

export default UserRoute;
