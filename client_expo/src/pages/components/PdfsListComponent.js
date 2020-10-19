import React from "react";
import { FlatList } from "react-native";
import { BACKEND_URL } from "../../../env";
import CachedThumbnail from "./CachedThumbnail";
import { TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View, Spinner, Thumbnail, Text } from "native-base";

class SingleTopicComponent extends React.PureComponent {
  render() {
    const { item, navigation } = this.props;

    console.log("rendering pdf", item.id);

    const onPress = () => {
      navigation.navigate("PdfsPreviewPage", item);
    };

    return (
      <TouchableHighlight key={item.id} onPress={onPress}>
        <View>
          <Text style={{ marginLeft: 5 }}>{item.title.substring(0, 22)}</Text>

          <View
            style={{ margin: 1, backgroundColor: "silver", marginBottom: 10 }}
          >
            <CachedThumbnail
              style={{ width: 180, height: 280 }}
              square
              source={{
                uri: `${BACKEND_URL}/uploads/images/${item.image_name}`,
              }}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const keyExtractor = (item) => {
  return item.id.toString();
};

function PdfsListComponent({ list, refreshing, onRefresh, onEndReached }) {
  const navigation = useNavigation();
  const { data } = list;

  const ListFooterComponent = () => {
    if (refreshing) {
      if (Platform.OS == "ios") {
        return <Spinner />;
      } else {
        return <React.Fragment />;
      }
    }
    return <React.Fragment />;
  };

  const renderItem = ({ item }) => {
    return <SingleTopicComponent item={item} navigation={navigation} />;
  };

  const onEndReachedThreshold = 0.1;

  return (
    <FlatList
      contentContainerStyle={{ margin: 7 }}
      {...{
        data,
        onRefresh,
        refreshing,
        renderItem,
        keyExtractor,
        onEndReached,
        ListFooterComponent,
        onEndReachedThreshold,
      }}
      numColumns={2}
    />
  );
}

export default PdfsListComponent;
