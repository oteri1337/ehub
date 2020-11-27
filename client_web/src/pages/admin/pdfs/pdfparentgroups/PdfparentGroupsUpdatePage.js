import React from "react";
import FormComponent from "components/FormComponent";
import { getRequestThenDispatch, sendRequestThenDispatch } from "hooks";
import PdfParentGroupUpdatComponent from "./PdfParentGroupsUpdateComponent";
import AdminContainerComponent from "components/container/AdminContainerComponent";

function PdfGroupUpdatePage({ location, match, history }) {
  const dispatch = "UPDATE_PDFPARENTGROUP";
  const { slug } = match.params;
  const { state } = getRequestThenDispatch(
    `/api/pdfparentgroups/${slug}`,
    dispatch
  );
  const { request, callBack } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const data = state.pdfparentgroups.object[slug] || location.props;

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
      label: "Parent Groups",
      link: "/control/pdfparentgroups/list.html",
    },
    {
      label: data?.title ?? "",
    },
  ];

  const formArray = [
    {
      id: "title",
    },
    {
      id: "icon",
      type: "select",
      options: [
        {
          value: "droplet",
        },
        {
          value: "anchor",
        },
        {
          value: "cpu",
        },
        {
          value: "thermometer",
        },
        {
          value: "settings",
        },
      ],
    },
  ];

  const initialState = {
    id: data?.id,
    title: data?.title,
    icon: data?.icon,
  };

  const onSuccess = () => {
    history.push("/control/pdfparentgroups/list.html");
  };

  const onSubmit = (body) => {
    callBack("/api/pdfparentgroups", dispatch, body, onSuccess, "PATCH");
  };

  const text = "Update";

  return (
    <AdminContainerComponent bread={nav}>
      <div className="card-panel">
        <FormComponent
          {...{
            formArray,
            initialState,
            fetching,
            errors,
            message,
            onSubmit,
            text,
          }}
        />
        <PdfParentGroupUpdatComponent
          slug={slug}
          allSelected={data.pdfgroups}
        />
      </div>
    </AdminContainerComponent>
  );
}

export default PdfGroupUpdatePage;
