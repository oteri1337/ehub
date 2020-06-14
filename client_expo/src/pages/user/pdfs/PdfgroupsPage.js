import React from "react";
import { FlatList, Platform } from "react-native";
import Text from "../../../components/TextComponent";
import PdfgroupComponent from "./PdfgroupComponent";
import { View, Spinner, Container } from "native-base";
import { AppContext } from "../../../providers/AppProvider";

// const renderItem = ({ item }) => {
//   console.log("rendering group ", item.id);

// return (
//   <View>
//     <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
//     <PdfgroupComponent pdfs={item.pdfs} />
//   </View>
// );
// };

class ItemPureComponent extends React.PureComponent {
  render() {
    const { item } = this.props;
    console.log("rendering group", this.props.item.id);
    return (
      <View>
        <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
        <PdfgroupComponent pdfs={item.pdfs} />
      </View>
    );
  }
}

function PdfgroupsPage({ navigation }) {
  const context = React.useContext(AppContext);
  const { state, refreshing, getRequestThenDispatch } = context;
  const list = state.pdfgroups;
  const { data } = list;

  const dispatch = "UPDATE_PDFGROUPS";

  const onRefresh = async () => {
    console.log("requesting group");
    getRequestThenDispatch("/api/pdfgroups", dispatch);
  };

  React.useEffect(() => {
    // if (!data.length) {
    onRefresh();
    // }
  }, []);

  const onEndReachedThreshold = 0.1;

  const keyExtractor = React.useCallback((item) => {
    return item.id.toString();
  }, []);

  const ListHeaderComponent = React.memo(() => {
    return <Text style={{ marginLeft: 15, marginTop: 5 }}>LIBRARY</Text>;
  });

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
        getRequestThenDispatch(next_page_url, `${dispatch}_PAGE`);
      }
    }
  };

  // const renderItem = ({ item }) => {
  //   console.log("rendering group ", item.id);
  //   return React.useMemo(() => {
  //     return (
  //       <View>
  //         <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
  //         <PdfgroupComponent pdfs={item.pdfs} />
  //       </View>
  //     );
  //   }, [state.pdfgroups]);

  //   return <React.Fragment />;
  // };

  const renderItem = ({ item }) => {
    return <ItemPureComponent item={item} />;
  };

  return (
    <Container>
      {/* <HeaderComponent navigation={navigation} title="Library" /> */}
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
