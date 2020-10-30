import React from "react";
import { BACKEND_URL } from "../../../../env";
import { View, Thumbnail } from "native-base";
import { FlatList, TouchableHighlight } from "react-native";

function PdfsListComponent({ data }) {
  const horizontal = true;

  const renderItem = ({ item }) => {
    return (
      <View style={{ margin: 1, backgroundColor: "silver" }}>
        <TouchableHighlight>
          <Thumbnail
            style={{ width: 120, height: 180 }}
            square
            source={{
              uri: `${BACKEND_URL}/uploads/images/${item.image_name}`,
            }}
          />
        </TouchableHighlight>
      </View>
    );
  };

  const keyExtractor = (item) => {
    return item.id.toString();
  };

  return <FlatList {...{ data, renderItem, horizontal, keyExtractor }} />;
}

export default PdfsListComponent;
