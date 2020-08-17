import React from "react";
import { Platform } from "react-native";
import { Container, View } from "native-base";

function ContainerComponent(props) {
  if (Platform.OS == "web") {
    return (
      <View
        {...props}
        style={{
          width: "100%",
          maxWidth: props.maxWidth,
          marginLeft: props.marginLeft,
          marginRight: props.marginRight,
          ...props.style,
        }}
      >
        {props.children}
      </View>
    );
  }

  return <Container>{props.children}</Container>;
}

export default ContainerComponent;
