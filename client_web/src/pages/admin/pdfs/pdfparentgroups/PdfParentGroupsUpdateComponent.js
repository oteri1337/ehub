import React from "react";
import Form from "components/FormComponent";
import { useHistory } from "react-router-dom";
import {
  getRequestThenDispatch,
  sendRequestThenDispatch,
} from "providers/AppProvider";

function PdfParentGroupsUpdateComponent({ slug, allSelected }) {
  const history = useHistory();

  const url = "/api/pdfgroups";
  const { state } = getRequestThenDispatch(url, "UPDATE_PDFGROUPS");
  const { request, callBack } = sendRequestThenDispatch();
  const { errors, message, fetching } = request;

  const allGroups = state.pdfgroups.data;

  const allSelectedIdArray = allSelected?.map((obj) => obj.id);

  const initialState = {};

  allSelectedIdArray?.forEach((id) => {
    initialState[id] = true;
  });

  let formArray = allGroups.map(({ id, title }) => {
    if (allSelectedIdArray?.indexOf(id) >= 0) {
      return { id, label: title, type: "checkbox", checked: true };
    }

    return { id, label: title, type: "checkbox" };
  });

  const onSuccess = () => {
    history.goBack();
  };

  const onSubmit = (data) => {
    const groups = Object.keys(data).filter((key) => {
      if (data[key] == true) return true;
    });

    const body = {
      slug,
      groups,
    };

    callBack(
      "/api/pdfparentgroups/sync",
      "NO_DISPATCH",
      body,
      onSuccess,
      "PATCH"
    );
  };

  return (
    <div className="app-py-3">
      <Form
        {...{
          initialState,
          formArray,
          errors,
          message,
          fetching,
          onSubmit,
        }}
      />
    </div>
  );
}

export default PdfParentGroupsUpdateComponent;
