import React from "react";
import FormComponent from "components/FormComponent";
import { sendRequestThenDispatch } from "providers/AppProvider";
import ContainerComponent from "components/container/AdminContainerComponent";

function SendPushPage({ match, location }) {
  const { id } = match.params;
  const { state, request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const user = location.data || state.users.object[id];

  if (!user) {
    return (
      <ContainerComponent bread={[]}>
        <div className="card-panel">
          <p>User Not Found</p>
        </div>
      </ContainerComponent>
    );
  }

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Users",
      link: "/control/users/list.html",
    },
    {
      label: `${user.first_name} ${user.last_name}`,
      link: `/control/users/${id}`,
    },
    {
      label: "Send Push",
    },
  ];

  if (!user.push_subscription) {
    return (
      <ContainerComponent bread={nav}>
        <div className="card-panel">
          <p>This User Has Denied Permission For Push Notifications</p>
        </div>
      </ContainerComponent>
    );
  }

  const formArray = [
    {
      id: "subject",
    },
    {
      id: "body",
      type: "textarea",
    },
  ];

  const onSubmit = async (body) => {
    callBack("/api/users/send/push", "NONE", body);
  };

  const initialState = {
    user_id: user.id,
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <FormComponent
          {...{
            formArray,
            initialState,
            fetching,
            errors,
            message,
            onSubmit,
          }}
        />
      </div>
    </ContainerComponent>
  );
}

export default SendPushPage;
