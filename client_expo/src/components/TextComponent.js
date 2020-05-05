import React from "react";
import { Platform } from "react-native";
import { Text as NativeText } from "react-native";
import { Text } from "native-base";

function TextComponent(props) {
  if (Platform.OS == "web") {
    return (
      <NativeText
        {...props}
        style={{ padding: props.padding, ...props.style }}
      />
    );
  }

  return (
    <Text
      {...props}
      style={{
        color: "rgba(28, 28, 30, 0.68)",
        ...props.style,
      }}
    />
  );
}

export default TextComponent;
