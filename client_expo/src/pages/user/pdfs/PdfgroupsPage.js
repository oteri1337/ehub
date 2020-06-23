import React from "react";
import { BACKEND_URL } from "../../../../env";
import Text from "../../components/TextComponent";
import PdfgroupComponent from "./PdfgroupComponent";
import { AppContext } from "../../../providers/AppProvider";
import { View, Spinner, Container, Button } from "native-base";
import { FlatList, Platform, ImageBackground } from "react-native";

class ItemPureComponent extends React.PureComponent {
  render() {
    const { item } = this.props;
    console.log("rendering group", this.props.item.id);
    return (
      <View>
        <Text style={{ fontWeight: "bold", marginLeft: 10, marginBottom: 5 }}>
          {item.title}
        </Text>
        <PdfgroupComponent pdfs={item.pdfs} />
      </View>
    );
  }
}

function PdfgroupsPage({ navigation }) {
  // navigation.setOptions({ headerShown: false });

  const context = React.useContext(AppContext);
  const { state, getRequestThenDispatch } = context;
  const list = state.pdfgroups;
  const { data } = list;

  const dispatch = "UPDATE_PDFGROUPS";
  const { refreshing, send } = getRequestThenDispatch(
    "/api/pdfgroups",
    dispatch
  );

  const onRefresh = async () => {
    console.log("requesting group");
    send("/api/pdfgroups", dispatch);
  };

  // React.useEffect(() => {
  //   console.log("on month pdf groups page");
  //   // if (!data.length) {
  //   onRefresh();
  //   // }
  // }, []);

  const onEndReachedThreshold = 0.1;

  const keyExtractor = React.useCallback((item) => {
    return item.id.toString();
  }, []);

  // const ListHeaderComponent = React.memo(() => {
  //   return <Text style={{ marginLeft: 15, marginTop: 5 }}>LIBRARY</Text>;
  // });

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

  const uri = `${BACKEND_URL}/uploads/images/event6.jpg`;

  const ListHeaderComponent = () => {
    return (
      <View style={{ marginBottom: 5 }}>
        <ImageBackground
          source={{ uri }}
          style={{ width: "100%", height: 350 }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Button
              transparent
              onPress={() => {
                navigation.navigate("PdfsListPage");
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>
                ALL BOOKS
              </Text>
            </Button>
            <Button
              transparent
              onPress={() => {
                navigation.navigate("EventsListPage");
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>
                NEWS AND EVENTS
              </Text>
            </Button>
          </View>
        </ImageBackground>
      </View>
    );
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
          ListHeaderComponent,
          ListFooterComponent,
          onEndReached,
          onEndReachedThreshold,
        }}
      />
    </Container>
  );
}

export default PdfgroupsPage;
