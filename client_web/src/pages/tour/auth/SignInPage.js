import React from "react";
import { Link } from "react-router-dom";
import { sendFormRequestThenDispatch } from "hooks";
import Form from "components/UncontrolledFormComponent";

function SignInPage() {
  const { request, callBack } = sendFormRequestThenDispatch();
  const { fetching, errors } = request;

  const formObjects = [
    {
      id: "email",
      type: "email",
    },
    {
      id: "password",
      type: "password",
    },
  ];

  const callback = async (body) => {
    await callBack("/api/users/auth/signin", "UPDATE_USER", body);
  };

  return (
    <div className=" app-py-3 row  ">
      <div className="col s12 m12 l4 offset-l4">
        <br />
        <center>
          <Form
            {...{
              formObjects,
              callback,
              fetching,
              errors,
              text: "Sign In",
            }}
          />
          <br />
          <Link to="/signup.html">Sign Up</Link>
          <br />
          <br />
          <Link to="/password.html">Reset Password</Link>
          <br />
          <br />
          <br />
        </center>
      </div>
    </div>
  );
}

export default SignInPage;
