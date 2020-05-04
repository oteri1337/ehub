import React from "react";
import AdminContainerComponent from "../admin_components/AdminContainerComponent";
import FormComponent from "../../page_components/FormComponent";
import {
  getRequestThenDispatch,
  sendRequestThenDispatch
} from "../../../hooks";

function MusicUpdateCategoryPage({ location, match, history }) {
  let nav = location.nav || [];
  const id = match.params.slug;

  React.useEffect(() => {
    if (nav.length) {
      nav[nav.length - 1].link = `/control/animations/${id}`;
      nav[nav.length] = { label: "Update Categories" };
    }
  }, []);

  const { state } = getRequestThenDispatch(
    "/api/animationgroups",
    "UPDATE_ANIMATIONGROUPS"
  );

  const { request, callBack } = sendRequestThenDispatch();

  const allGroups = state.animationgroups.data;
  const allSelected = location.data?.groups ?? [];
  const allSelectedIdArray = allSelected.map(obj => obj.id);

  const initialState = {};
  allSelectedIdArray.forEach(id => {
    initialState[id] = true;
  });

  let formArray = allGroups.map(({ id, title }) => {
    if (allSelectedIdArray.indexOf(id) >= 0) {
      return { id, label: title, type: "checkbox", checked: true };
    }

    return { id, label: title, type: "checkbox" };
  });

  const onSuccess = () => {
    history.goBack();
  };

  const onSubmit = data => {
    const groups = Object.keys(data).filter(key => {
      if (data[key] == true) return true;
    });

    const body = {
      slug: id,
      groups
    };

    callBack("/api/animations/sync", "NO_DISPATCH", body, onSuccess, "PATCH");
  };

  return (
    <AdminContainerComponent bread={nav || []}>
      <div className="card-panel">
        <FormComponent
          formArray={formArray}
          initialState={initialState}
          text="Update"
          onSubmit={onSubmit}
          fetching={request.fetching}
          errors={request.errors}
          message={request.message}
        />
      </div>
    </AdminContainerComponent>
  );
}

export default MusicUpdateCategoryPage;
