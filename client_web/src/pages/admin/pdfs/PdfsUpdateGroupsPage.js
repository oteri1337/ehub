import React from "react";
import FormComponent from "components/FormComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";
import {
  getRequestThenDispatch,
  sendRequestThenDispatch,
} from "providers/AppProvider";

function PdfUpdateCategoryPage({ match, location, history }) {
  const url = "/api/pdfgroups";
  const { slug } = match.params;
  const { state } = getRequestThenDispatch(url, "UPDATE_PDFGROUPS");
  const { request, callBack } = sendRequestThenDispatch();

  const allGroups = state.pdfgroups.data;
  const allSelected = location.data?.groups ?? [];
  const allSelectedIdArray = allSelected.map((obj) => obj.id);

  const initialState = {};
  allSelectedIdArray.forEach((id) => {
    initialState[id] = true;
  });

  let formArray = allGroups.map(({ id, title }) => {
    if (allSelectedIdArray.indexOf(id) >= 0) {
      return { id, label: title, type: "checkbox", checked: true };
    }

    return { id, label: title, type: "checkbox" };
  });

  const onSubmit = (data) => {
    const groups = Object.keys(data).filter((key) => {
      if (data[key] == true) return true;
    });

    const body = {
      slug,
      groups,
    };

    callBack("/api/pdfs/sync", "NO_DISPATCH", body, onSuccess, "PATCH");
  };

  const onSuccess = () => {
    history.goBack();
  };

  const pdf = state.pdfs.object[slug];

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Pdfs",
      link: "/control/pdfs/index.html",
    },
    {
      label: "List",
      link: "/control/pdfs/list.html",
    },
    {
      label: pdf.title,
      link: `/control/pdfs/${slug}`,
    },
    {
      label: `Update Groups`,
    },
  ];

  return (
    <AdminContainerComponent bread={nav}>
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

export default PdfUpdateCategoryPage;
