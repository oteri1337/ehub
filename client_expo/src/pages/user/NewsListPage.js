import React from "react";
import { BACKEND_URL } from "../../../env";
import Text from "../components/TextComponent";
import { FlatList, Platform } from "react-native";
import { AppContext } from "../../providers/AppProvider";
import {
  List,
  Left,
  Body,
  Spinner,
  ListItem,
  Container,
  Thumbnail,
} from "native-base";

function NewsPage({ navigation }) {
  console.log(" ");
  console.log("news page opened");

  const context = React.useContext(AppContext);
  const { state, refreshing, getRequestThenDispatch } = context;
  const list = state.news;
  const { data } = list;

  const dispatch = "UPDATE_NEWS";

  const onRefresh = async () => {
    console.log("requesting news");
    getRequestThenDispatch("/api/news", dispatch);
  };

  React.useEffect(() => {
    if (!data.length) {
      onRefresh();
    }
  }, []);

  const onEndReachedThreshold = 0.9;

  const keyExtractor = (item) => {
    return item.id.toString();
  };

  const ListHeaderComponent = () => {
    return <Text style={{ marginLeft: 15, marginTop: 5 }}>News</Text>;
  };

  const ListFooterComponent = () => {
    if (refreshing) {
      if (Platform.os == "ios") {
        return <Spinner />;
      } else {
        return <React.Fragment />;
      }
    }
    return <React.Fragment />;
  };

  const onEndReached = async () => {
    if (!refreshing) {
      const { next_page_url } = list;
      if (next_page_url) {
        getRequestThenDispatch(next_page_url, `${dispatch}_PAGE`);
      }
    }
  };

  const renderItem = ({ item }) => {
    console.log("rendering news ", item.id);

    const onPress = () => {
      navigation.navigate("NewsReadPage", item);
    };

    const uri = `${BACKEND_URL}/uploads/images/${item.image}`;

    return (
      <ListItem thumbnail onPress={onPress}>
        <Left>
          <Thumbnail source={{ uri }} />
        </Left>
        <Body>
          <Text style={{ fontWeight: "bold" }}>
            {item.id} {item.title}
          </Text>
          <Text note>0 Comments</Text>
        </Body>
      </ListItem>
    );
  };

  return (
    <Container>
      {/* <HeaderComponent navigation={navigation} /> */}
      <List style={{ flex: 1 }}>
        <FlatList
          {...{
            data,
            onRefresh,
            renderItem,
            refreshing,
            keyExtractor,
            onEndReached,
            ListHeaderComponent,
            ListFooterComponent,
            onEndReachedThreshold,
          }}
        />
      </List>
    </Container>
  );
}

export default NewsPage;
