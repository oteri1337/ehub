import React from "react";
import { View, Text } from "react-native";
import CachedImage from "../components/CachedImage";

function FullImagePage({ route, navigation }) {
  const { title, uri } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title });
  }, []);

  return (
    <View>
      <CachedImage
        source={{ uri }}
        resizeMode="contain"
        style={{ height: "100%" }}
      />
    </View>
  );
}

export default FullImagePage;
