import React from "react";
import { Platform } from "react-native";
import { View } from "native-base";

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

  return <View>{props.children}</View>;
}

export default ContainerComponent;
