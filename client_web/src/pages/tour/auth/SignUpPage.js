import React from "react";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "hooks";
import { getPushSubscription } from "functions";
import TourContainerComponent from "components/tour/TourContainerComponent";

function SignUpPage({ location }) {
  const [push_subscription, setSubscription] = React.useState("");
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  React.useEffect(() => {
    async function asyncOperation() {
      const subscription = await getPushSubscription();
      setSubscription(subscription);
    }
    asyncOperation();
  }, []);

  const text = "Sign Up";

  const formArray = [
    {
      id: "email",
      type: "email",
    },
    {
      id: "password",
      type: "password",
    },
    {
      id: "confirm_password",
      type: "password",
      label: "Repeat Password",
    },
    {
      id: "first_name",
    },
    {
      id: "last_name",
    },
    {
      id: "country",
    },
  ];

  const onSubmit = (body) => {
    callBack("/api/users", "UPDATE_USER", { ...body, push_subscription });
  };

  const params = new URLSearchParams(location.search);
  const refid = params.get("refid");

  const initialState = {
    user_id: refid || null,
  };

  return (
    <TourContainerComponent footer={false}>
      <div className="bg bg-secondary app-py-3">
        <div className="row">
          <div className="col l4 s12 offset-l4">
            <br />
            <center>
              <h1>Sign up</h1>
              <p>Please enter your personal information</p>
              <br />
              <Form
                {...{
                  formArray,
                  text,
                  fetching,
                  errors,
                  message,
                  onSubmit,
                  initialState,
                }}
              />
              <br />
              <br />
              <br />
            </center>
          </div>
        </div>
      </div>
    </TourContainerComponent>
  );
}

export default SignUpPage;
