import React from "react";
import { View } from "native-base";
import { BACKEND_URL } from "../../../../env";
import { useNavigation } from "@react-navigation/native";
import Thumbnail from "../../components/CachedThumbnail";
import { FlatList, TouchableHighlight } from "react-native";

function PdfsListComponent({ data }) {
  const navigation = useNavigation();

  const horizontal = true;

  const renderItem = ({ item }) => {
    const onPress = () => {
      navigation.navigate("PdfsPreviewPage", item);
    };

    return (
      <View style={{ margin: 1, backgroundColor: "silver" }}>
        <TouchableHighlight onPress={onPress}>
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
