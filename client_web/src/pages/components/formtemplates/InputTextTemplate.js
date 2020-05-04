import React from "react";

function InputTextTemplate() {
  this.ref = React.useRef();
  this.getState = function() {
    return this.ref.current.value;
  };
  return (
    <input
      key={this.id}
      defaultValue={this.defaultValue ?? ""}
      ref={this.ref}
      placeholder={this.id}
    />
  );
}

export default InputTextTemplate;
