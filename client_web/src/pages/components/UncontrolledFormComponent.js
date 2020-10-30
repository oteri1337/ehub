import React from "react";
import FormTemplateComponent from "./FormTemplateComponent";
import SubmitComponent from "./SubmitComponent";
import MessageComponent from "./MessageComponent";
import { getFormData } from "../../functions";

function UncontrolledFormComponent(props) {
  let formObjects = props.formObjects || [];
  let initialState = props.initialState || {};

  formObjects.forEach((formObject) => {
    if (formObject.type == "select") {
      formObject.value = formObject.options[0].value;
    }
    formObject.ref = React.useRef();
  });

  return (
    <form
      onSubmit={(event) =>
        getFormData(event, formObjects, props.callback, initialState)
      }
      encType="multipart/form-data"
    >
      <FormTemplateComponent formObjects={formObjects} />
      <SubmitComponent
        text={props.text || "Submit"}
        fetching={props.fetching || false}
        className={props.className}
        progress={props.progress}
      />
      <MessageComponent
        errors={props.errors || []}
        message={props.message || ""}
      />
    </form>
  );
}

export default UncontrolledFormComponent;
