import React from "react";
import { FlatList, Platform } from "react-native";
import PdfgroupComponent from "./PdfgroupComponent";
import Text from "../../../components/TextComponent";
import { View, Spinner, Container } from "native-base";
import { getRequestThenDispatch } from "../../../../providers/AppProvider";

class ItemPureComponent extends React.PureComponent {
  render() {
    const { item, navigation } = this.props;
    console.log("rendering pdfgroup ", item.id);
    return (
      <View>
        <Text
          style={{ fontWeight: "bold", marginLeft: 10, marginBottom: 5 }}
          onPress={() => {
            navigation.navigate("PdfGroupPage", item);
          }}
        >
          {item.title}
        </Text>
        <PdfgroupComponent group={item} />
      </View>
    );
  }
}

function PdfgroupsPage({ navigation }) {
  const url = "/api/pdfgroups";
  const dispatch = "UPDATE_PDFGROUPS";
  const { state, refreshing, send } = getRequestThenDispatch(url, dispatch);
  const list = state.pdfgroups;
  const { data } = list;

  const onRefresh = async () => {
    send("/api/pdfgroups", dispatch);
  };

  const keyExtractor = React.useCallback((item) => {
    return item.id.toString();
  }, []);

  const ListFooterComponent = React.memo(() => {
    if (refreshing) {
      if (Platform.os == "ios") {
        return <Spinner />;
      } else {
        return <React.Fragment />;
      }
    }
    return <React.Fragment />;
  });

  const onEndReachedThreshold = 0.1;

  const onEndReached = async () => {
    if (!refreshing) {
      const { next_page_url } = list;
      if (next_page_url) {
        console.log("on end reached pdf groups");
        send(next_page_url, `${dispatch}_PAGE`);
      }
    }
  };

  const renderItem = ({ item }) => {
    return <ItemPureComponent item={item} navigation={navigation} />;
  };

  return (
    <Container>
      <FlatList
        style={{ padding: 5 }}
        {...{
          data,
          onRefresh,
          refreshing,
          renderItem,
          keyExtractor,
          ListFooterComponent,
          onEndReached,
          onEndReachedThreshold,
        }}
      />
    </Container>
  );
}

export default PdfgroupsPage;
