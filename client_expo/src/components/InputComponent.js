import React from "react";
import { Platform } from "react-native";
import { Input } from "native-base";

function InputComponent(props) {
  if (Platform.OS == "web") {
    return (
      <Input {...props} style={{ padding: props.padding, ...props.style }} />
    );
  }

  return <Input {...props} />;
}

export default InputComponent;
