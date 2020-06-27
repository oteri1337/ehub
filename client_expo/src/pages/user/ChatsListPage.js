import React from "react";
import { BACKEND_URL } from "../../../env";
import Text from "../components/TextComponent";
import { FlatList, Platform } from "react-native";
import { getRequestThenDispatch } from "../../providers/AppProvider";
import {
  List,
  Left,
  Body,
  Spinner,
  ListItem,
  Container,
  Thumbnail,
} from "native-base";

class ItemPureComponent extends React.PureComponent {
  render() {
    const { item, navigation } = this.props;

    console.log("rendering chat ", item.id);

    const onPress = () => {
      navigation.navigate("ChatsReadPage", item);
    };

    return (
      <ListItem thumbnail onPress={onPress}>
        <Left>
          <Thumbnail
            source={{
              uri: `${BACKEND_URL}/uploads/images/${item.recvr.photo_profile}`,
            }}
            style={{ backgroundColor: "silver" }}
          />
        </Left>
        <Body>
          <Text style={{ fontWeight: "bold" }}>
            {item.recvr.first_name} {item.recvr.last_name}
          </Text>
          <Text note style={{ fontWeight: "300" }}>
            {item.messages[item.messages.length - 1]?.message.substring(0, 80)}
          </Text>
        </Body>
      </ListItem>
    );
  }
}

function ChatsListPage({ navigation }) {
  const url = "/api/chats";
  const dispatch = "UPDATE_CHATS";
  const { state, refreshing, send } = getRequestThenDispatch(url, dispatch);
  const list = state.chats;
  let { data } = list;

  const onRefresh = async () => {
    send("/api/chats", dispatch);
  };

  const onEndReached = async () => {
    if (!refreshing) {
      const { next_page_url } = list;
      if (next_page_url) {
        console.log("on end reached chats");
        send(next_page_url, `${dispatch}_PAGE`);
      }
    }
  };

  const onEndReachedThreshold = 0.1;

  const keyExtractor = (item) => {
    return item.id.toString();
  };

  const ListFooterComponent = () => {
    if (refreshing) {
      if (Platform.OS == "ios") {
        if (data.length > 11) {
          return <Spinner />;
        }
        return <React.Fragment />;
      } else {
        return <React.Fragment />;
      }
    }
    return <React.Fragment />;
  };

  const renderItem = ({ item }) => {
    return <ItemPureComponent item={item} navigation={navigation} />;
  };

  if (data.length === 0) {
    return (
      <Container style={{ justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>You have no messages</Text>
      </Container>
    );
  }

  return (
    <Container>
      <List style={{ flex: 1 }}>
        <FlatList
          {...{
            data,
            onRefresh,
            onEndReached,
            renderItem,
            refreshing,
            keyExtractor,
            ListFooterComponent,
            onEndReachedThreshold,
          }}
        />
      </List>
    </Container>
  );
}

export default ChatsListPage;
