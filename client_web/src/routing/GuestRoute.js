import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "providers/AppProvider";

function GuestRoute(props) {
	const { state } = React.useContext(AppContext);

	if (state.user) {
		return <Redirect to={"/user/index.html"} />;
	}

	return <Route {...props} />;
}

export default GuestRoute;
