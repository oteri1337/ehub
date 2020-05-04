import React from "react";
import { sendRequestThenDispatch } from "providers/AppProvider";
import FormComponent from "components/FormComponent";

function AdminLoggedPasswordComponent(props) {
  const { request, callBack } = sendRequestThenDispatch();

  let formArray = [
    {
      id: "email",
    },
  ];
  let initialState = {};

  if (props.email) {
    formArray = [];
    initialState = { email: props.email };
  }

  const onSubmit = (body) => {
    callBack("/api/admins/auth/password/token", "NO_DISPATCH", body);
  };

  return (
    <FormComponent
      formArray={formArray}
      initialState={initialState}
      text="Request Password Token"
      className="btn btn-secondary"
      fetching={request.fetching}
      errors={request.errors}
      message={request.message}
      onSubmit={onSubmit}
    />
  );
}

export default AdminLoggedPasswordComponent;
