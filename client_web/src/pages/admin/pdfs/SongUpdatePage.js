import React from "react";
import AdminContainerComponent from "../admin_components/AdminContainerComponent";
import FormComponent from "../../page_components/FormComponent";
import {
  sendRequestThenDispatch,
  getRequestThenDispatch
} from "../../../hooks";

function SongUpdatePage(props) {
  const { slug } = props.match.params;
  const get = getRequestThenDispatch(`/api/songs/${slug}`, "UPDATE_SONG");
  const { request, callBack, state } = sendRequestThenDispatch();

  const data = state.songs.object[slug];

  if (data === undefined && get.request.fetching) {
    return (
      <AdminContainerComponent bread={[]}>
        <div className="card-panel">Fetching Data ...</div>
      </AdminContainerComponent>
    );
  }

  if (data === undefined && !get.request.fetching) {
    return (
      <AdminContainerComponent bread={[]}>
        <div className="card-panel">Data Not Found</div>
      </AdminContainerComponent>
    );
  }

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html"
    },
    {
      label: "Songs",
      link: "/control/songs/index.html"
    },
    {
      label: "List",
      link: "/control/songs/list.html"
    },
    {
      label: `${data.title}`,
      link: `/control/songs/${data.slug}`
    },
    {
      label: "Update"
    }
  ];

  const formArray = [
    {
      id: "title"
    },
    {
      id: "description",
      type: "textarea"
    },
    {
      id: "stars",
      type: "select",
      options: [
        {
          value: 1
        },
        {
          value: 2
        },
        {
          value: 3
        },
        {
          value: 4
        },
        {
          value: 5
        }
      ]
    }
  ];

  const initialState = {
    ...data
  };

  const onSuccess = () => {
    props.history.push(`/control/songs/${data.slug}`);
  };

  const onSubmit = body => {
    callBack("/api/songs", "UPDATE_SONG", body, onSuccess, "PATCH");
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <FormComponent
          initialState={initialState}
          formArray={formArray}
          onSubmit={onSubmit}
          fetching={request.fetching}
          errors={request.errors}
          message={request.message}
        />
      </div>
    </AdminContainerComponent>
  );
}

export default SongUpdatePage;
