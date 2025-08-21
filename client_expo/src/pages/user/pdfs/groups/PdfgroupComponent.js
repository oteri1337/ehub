import React from "react";
import { BACKEND_URL } from "../../../../../env";
import { Thumbnail, View, Spinner } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { FlatList, TouchableHighlight } from "react-native";
import { getRequestThenDispatch } from "../../../../providers/AppProvider";

class ItemPureComponent extends React.PureComponent {
  render() {
    const { item, navigation } = this.props;

    console.log("rendering pdf", item.id);

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
  }
}

function PdfgroupComponent({ group }) {
  const { send, refreshing } = getRequestThenDispatch();

  const data = group.pdfs;

  const navigation = useNavigation();

  const horizontal = true;

  const keyExtractor = (item) => {
    return item.id.toString();
  };

  const renderItem = ({ item }) => {
    return <ItemPureComponent item={item} navigation={navigation} />;
  };

  const onEndReachedThreshold = 0.1;

  const onEndReached = async () => {
    if (!refreshing) {
      const { next_page_url } = group;
      if (next_page_url) {
        send(next_page_url, `UPDATE_PDFGROUP_PAGE`);
      }
    }
  };

  const ListFooterComponent = () => {
    if (refreshing) {
      return (
        <View
          style={{ paddingLeft: 20, justifyContent: "center", height: 180 }}
        >
          <Spinner />
        </View>
      );
    }
    return <React.Fragment />;
  };

  return (
    <FlatList
      style={{ marginBottom: 10 }}
      {...{
        data,
        horizontal,
        renderItem,
        keyExtractor,
        onEndReached,
        ListFooterComponent,
        onEndReachedThreshold,
      }}
    />
  );
}

export default PdfgroupComponent;
