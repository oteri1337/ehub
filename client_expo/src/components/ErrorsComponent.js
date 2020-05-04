import React from "react";
import { View, Text } from "native-base";

function ErrorsComponent({ errors = [] }) {
  const rendered = errors.map((error) => {
    return (
      <Text key={error} style={{ textAlign: "center", color: "white" }}>
        {error}
      </Text>
    );
  });
  return <View style={{ marginTop: 5 }}>{rendered}</View>;
}

export default ErrorsComponent;
