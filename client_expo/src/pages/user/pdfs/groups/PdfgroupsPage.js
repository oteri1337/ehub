import React from "react";
import { FlatList, Platform } from "react-native";
import PdfgroupComponent from "./PdfgroupComponent";
import Text from "../../../components/TextComponent";
import { View, Spinner, Container } from "native-base";
import { getRequestThenDispatch } from "../../../../providers/AppProvider";

class ItemPureComponent extends React.PureComponent {
  render() {
    const { item } = this.props;
    console.log("rendering group", this.props.item.id);
    return (
      <View>
        <Text style={{ fontWeight: "bold", marginLeft: 10, marginBottom: 5 }}>
          {item.title}
        </Text>
        <PdfgroupComponent data={item.pdfs} />
      </View>
    );
  }
}

function PdfgroupsPage() {
  const url = "/api/pdfgroups";
  const dispatch = "UPDATE_PDFGROUPS";
  const { state, refreshing, send } = getRequestThenDispatch(url, dispatch);
  const list = state.pdfgroups;
  const { data } = list;

  const onRefresh = async () => {
    send("/api/pdfgroups", dispatch);
  };

  const onEndReachedThreshold = 0.1;

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

  const onEndReached = async () => {
    console.log("on end reached pdfs");
    if (!refreshing) {
      const { next_page_url } = list;
      if (next_page_url) {
        send(next_page_url, `${dispatch}_PAGE`);
      }
    }
  };

  const renderItem = ({ item }) => {
    return <ItemPureComponent item={item} />;
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
