import React from "react";
import SubmitComponent from "./SubmitComponent";
import MessageComponent from "./MessageComponent";

function FormComponent(props) {
  const [state, setState] = React.useState({});
  const initialState = props.initialState || {};
  const onChangeCallBack = props.onChangeCallBack || function () {};

  React.useEffect(() => {
    setState({ ...state, ...initialState });
  }, []);

  React.useEffect(() => {
    M.updateTextFields();

    const textarea = document.querySelector("textarea");
    if (textarea) M.textareaAutoResize(textarea);
  });

  const onChange = ({ target }) => {
    const newState = { ...state, [target.id]: target.checked || target.value };
    setState(newState);
    onChangeCallBack(newState);
  };

  const createForm = (formObject) => {
    if (formObject.type === "component") {
      return formObject.component;
    }

    // password -- not required
    if (formObject.type === "password") {
      return (
        <div className="input-field" key={formObject.id}>
          <input
            type={formObject.type || "text"}
            id={formObject.id}
            name={formObject.id}
            className="validate"
            value={state[formObject.id] || ""}
            onChange={onChange}
            autoComplete={"new-password"}
            required
          />
          <label className="active" htmlFor={formObject.id}>
            {formObject.label || formObject.id.replace(/_/g, " ")}
          </label>
        </div>
      );
    }

    //  email -- not required
    if (formObject.type === "email") {
      return (
        <div className="input-field" key={formObject.id}>
          <input
            type={formObject.type || "text"}
            id={formObject.id}
            name={formObject.id}
            className="validate"
            value={state[formObject.id] || ""}
            onChange={onChange}
            autoComplete={"new-email"}
            required
          />
          <label className="active" htmlFor={formObject.id}>
            {formObject.label || formObject.id.replace(/_/g, " ")}
          </label>
        </div>
      );
    }

    // text or password -- not required
    if (formObject.required === false) {
      return (
        <div className="input-field" key={formObject.id}>
          <input
            type={formObject.type || "text"}
            id={formObject.id}
            name={formObject.id}
            className="validate"
            value={state[formObject.id] || ""}
            onChange={onChange}
          />
          <label className="active" htmlFor={formObject.id}>
            {formObject.label || formObject.id.replace(/_/g, " ")}
          </label>
        </div>
      );
    }

    // textarea
    if (formObject.type === "textarea") {
      return (
        <div className="input-field" key={formObject.id}>
          <textarea
            id={formObject.id}
            name={formObject.id}
            className="materialize-textarea"
            value={state[formObject.id] || ""}
            onChange={onChange}
          />
          <label htmlFor={formObject.id}>{formObject.id}</label>
        </div>
      );
    }

    // select
    if (formObject.type === "select") {
      const options = formObject.options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        );
      });

      return (
        <div key={formObject.id}>
          <label>{formObject.label || formObject.id.replace(/_/g, " ")}</label>
          <select
            id={formObject.id}
            onChange={onChange}
            className="browser-default"
            defaultValue={initialState[formObject.id]}
          >
            {options}
          </select>
        </div>
      );
    }

    // number
    if (formObject.type === "number") {
      return (
        <div className="input-field" key={formObject.id}>
          {formObject.prefix && (
            <span className=" prefix">{formObject.prefix || ""}</span>
          )}
          <input
            type={"number"}
            id={formObject.id}
            min={formObject.min || ""}
            max={formObject.max || ""}
            step="any"
            name={formObject.id}
            className={formObject.className || "validate"}
            value={state[formObject.id] || ""}
            onChange={onChange}
            required
          />
          {!formObject.removeLabel && (
            <label className="active" htmlFor={formObject.id}>
              {formObject.label || formObject.id.replace(/_/g, " ")}
            </label>
          )}
        </div>
      );
    }

    // text
    if (
      formObject.type === "text" ||
      formObject.type === undefined ||
      formObject.type === "date" ||
      formObject.type === "tel"
    ) {
      return (
        <div
          className={formObject.parentClassName || "input-field"}
          key={formObject.id}
        >
          <input
            type={formObject.type ?? "text"}
            id={formObject.id}
            name={formObject.id}
            maxLength={formObject.maxLength || 300}
            className={formObject.className || "validate"}
            value={state[formObject.id] || ""}
            inputMode={formObject.inputMode || "text"}
            onChange={onChange}
            required
          />
          {!formObject.removeLabel && (
            <label className="active" htmlFor={formObject.id}>
              {formObject.label || formObject.id.replace(/_/g, " ")}
            </label>
          )}
        </div>
      );
    }

    // check box
    if (formObject.type === "checkbox") {
      // const link = formObject.link || "";
      // const title = formObject.title || "";
      return (
        <p key={formObject.label} key={formObject.id}>
          <label>
            <input
              id={formObject.id}
              type="checkbox"
              defaultChecked={formObject.checked || false}
              onChange={onChange}
              name={formObject.id}
            />
            <span>
              {formObject.label || formObject.id}
              {/* <a href={link}>{title}</a> */}
            </span>
          </label>
        </p>
      );
    }

    // text or password -- required
    // return (
    //   <div className="input-field" key={formObject.id}>
    //     <input
    //       type={formObject.type || "text"}
    //       id={formObject.id}
    //       name={formObject.id}
    //       className={formObject.className || "validate"}
    //       value={state[formObject.id] || ""}
    //       onChange={onChange}
    //       required
    //     />
    //     <label className="active" htmlFor={formObject.id}>
    //       {formObject.label || formObject.id.replace(/_/g, " ")}
    //     </label>
    //   </div>
    // );
  };

  const renderSubmit = () => {
    if (!hideSubmitButton) {
      return (
        <React.Fragment>
          <br />

          <SubmitComponent
            text={props.text || "Submit"}
            fetching={props.fetching || false}
            className={props.className}
          />
        </React.Fragment>
      );
    }
  };

  const formArray = props.formArray || [];
  const elements = formArray.map(createForm);

  const onSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(state);
  };

  const hideSubmitButton = props.hideSubmitButton || false;

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      {elements}
      <MessageComponent
        errors={props.errors || []}
        message={props.message || ""}
      />
      {renderSubmit()}
    </form>
  );
}

export default FormComponent;
