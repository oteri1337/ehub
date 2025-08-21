import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Store } from "providers/AppProvider";

function GuestAdminRoute(props) {
  const { state } = React.useContext(Store);

  if (state.admin) {
    return <Redirect to="/control/index.html" />;
  }

  return <Route {...props} />;
}

export default GuestAdminRoute;
