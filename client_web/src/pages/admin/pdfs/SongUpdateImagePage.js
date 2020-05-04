import React from "react";
import {
  getRequestThenDispatch,
  sendFormRequestThenDispatch
} from "../../../hooks";
import UncontrolledFormComponent from "../../page_components/UncontrolledFormComponent";
import ContainerComponent from "../admin_components/AdminContainerComponent";

function SongUpdateImagePage({ location, history, match }) {
  const dispatch = "UPDATE_SONG";
  const { slug } = match.params;
  const { state } = getRequestThenDispatch(`/api/songs/${slug}`, dispatch);
  const { request, callBack } = sendFormRequestThenDispatch();
  const { fetching, errors, message } = request;

  let bread = JSON.parse(JSON.stringify(location.nav || []));
  const data = state.animations.object[slug] || location.data;

  if (bread.length) {
    bread[bread.length - 1].link = `/control/songs/${slug}`;
    bread[bread.length] = { label: "Update Image" };
  } else {
    bread = [
      {
        label: data?.title ?? ""
      }
    ];
  }

  const formObjects = [
    {
      id: "image",
      type: "file"
    }
  ];

  const initialState = [
    {
      key: "id",
      value: data?.id
    }
  ];

  const onSuccess = () => {
    history.push(`/control/songs/${slug}`);
  };

  const callback = async body => {
    callBack("/api/songs/image", dispatch, body, onSuccess);
  };

  return (
    <ContainerComponent {...{ bread }}>
      <div className="card-panel">
        <UncontrolledFormComponent
          {...{
            formObjects,
            initialState,
            callback,
            fetching,
            errors,
            message
          }}
        />
      </div>
    </ContainerComponent>
  );
}

export default SongUpdateImagePage;
