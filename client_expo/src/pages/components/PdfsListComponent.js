import React from "react";
import { FlatList, Dimensions } from "react-native";
import { BACKEND_URL } from "../../../env";
import CachedThumbnail from "./CachedThumbnail";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View, Spinner, Text } from "native-base";

class SingleTopicComponent extends React.PureComponent {
  render() {
    const { item, navigation } = this.props;

    // console.log("rendering pdf", item.id);

    const onPress = () => {
      navigation.navigate("PdfsPreviewPage", item);
    };

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
      <TouchableOpacity key={item.id} onPress={onPress}>
        <View style={{width: windowWidth/ 1.9, marginBottom: 30}}>
          <Text style={{ fontSize: 18,marginBottom: 2, textAlign: "center" }}>{item.title.substring(0, 34)}</Text>

          <View
            style={{ margin: 1, marginBottom: 10 }}
          >
            <CachedThumbnail
              style={{ width: windowWidth/2, height: windowHeight/2.3 }}
              square
              source={{
                uri: `${BACKEND_URL}/uploads/images/${item.image_name}`,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
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
