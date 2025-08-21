import React from "react";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "hooks";
import TourContainerComponent from "components/tour/TourContainerComponent";
import PasswordTokenComponent from "components/PasswordTokenComponent";

function PasswordPage({ location }) {
	const { request, callBack } = sendRequestThenDispatch();
	const { fetching, errors, message } = request;

	const params = new URLSearchParams(location.search);
	const email = params.get("email");
	const token = params.get("token");

	const nav = [
		{
			label: "Home",
			link: "/"
		},
		{
			label: "Reset Password"
		}
	];

	const formArray = [
		{
			id: "email",
			type: "email"
		},
		{
			id: "password_token",
			label: "token"
		},
		{
			id: "new_password",
			type: "password"
		},
		{
			id: "confirm_new_password",
			type: "password"
		}
	];

	const initialState = {
		email: email ?? "",
		password_token: token ?? ""
	};

	const onSucess = () => {};

	const onSubmit = body => {
		callBack(
			"/api/users/auth/update/password",
			"UPDATE_USER",
			body,
			onSucess,
			"PATCH"
		);
	};

	return (
		<TourContainerComponent bread={nav}>
			<div className="row app-py-0 ">
				<div className="col s12 m12 l6 offset-l3">
					<div className="card-panel">
						<center>
							<Form
								{...{
									formArray,
									initialState,

									onSubmit,
									fetching,
									errors,
									message
								}}
							/>

							<br />
							<PasswordTokenComponent type="user" />
							<br />
						</center>
					</div>
				</div>
			</div>
		</TourContainerComponent>
	);
}

export default PasswordPage;
