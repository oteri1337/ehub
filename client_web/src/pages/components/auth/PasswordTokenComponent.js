import React from "react";
import Form from "../FormComponent";
import { sendRequestThenDispatch } from "hooks";

function PasswordTokenComponent() {
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const formArray = [
    {
      id: "e",
      type: "email",
      label: "email",
    },
  ];

  const text = "Request Token";

  const onSubmit = ({ e }) => {
    const b = { email: e };
    callBack("/api/users/auth/token/password/update", "NO_DISPATCH", b);
  };

  return <Form {...{ formArray, text, fetching, errors, message, onSubmit }} />;
}

export default PasswordTokenComponent;
