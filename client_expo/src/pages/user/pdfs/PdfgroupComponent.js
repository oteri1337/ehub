import React from "react";
import { BACKEND_URL } from "../../../../env";
import { Thumbnail, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { FlatList, TouchableHighlight } from "react-native";

function PdfgroupComponent({ pdfs }) {
  const navigation = useNavigation();

  const { data } = pdfs;

  const horizontal = true;

  const keyExtractor = (item) => {
    return item.id.toString();
  };

  const renderItem = ({ item }) => {
    const onPress = () => {
      navigation.navigate("PdfsPreviewPage", item);
    };

    return (
      <View style={{ margin: 1, backgroundColor: "silver" }} onPress={onPress}>
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

  return (
    <FlatList
      style={{ marginBottom: 10 }}
      {...{ data, horizontal, renderItem, keyExtractor }}
    />
  );
}

export default PdfgroupComponent;
