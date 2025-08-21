import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import ContainerComponent from "components/container/AdminContainerComponent";

function TopicsUpdatePage({ match, history }) {
  const { id } = match.params;
  const { state, request, callBack } = sendRequestThenDispatch();
  const { errors, fetching, message } = request;

  const data = state.topics.object[id];

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Topics",
      link: "/control/topics/list.html",
    },
    {
      label: `${data.title}`,
      link: `/control/topics/${data.id}`,
    },
    {
      label: `Update`,
    },
  ];

  const text = "Update";

  const formArray = [
    {
      id: "allow_comments",
      type: "select",
      options: [
        {
          value: "yes",
        },
        {
          value: "no",
        },
      ],
    },
  ];

  const onSuccess = () => {
    history.push(`/control/topics/${id}`);
  };

  const onSubmit = (body) => {
    callBack("/api/topics", "UPDATE_TOPIC", body, onSuccess, "PATCH");
  };

  const initialState = {
    id: data.id,
    data: data.data,
    allow_comments: data.allow_comments,
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <FormComponent
          {...{
            text,
            formArray,
            onSubmit,
            initialState,
            errors,
            fetching,
            message,
          }}
        />
      </div>
    </ContainerComponent>
  );
}

export default TopicsUpdatePage;
