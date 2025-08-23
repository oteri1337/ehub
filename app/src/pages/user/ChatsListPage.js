import React from "react";
import { BACKEND_URL } from "../../../env";
import Text from "../components/TextComponent";
import { FlatList, Platform } from "react-native";
import CachedThumbnail from "../components/CachedThumbnail";
import { getRequestThenDispatch } from "../../providers/AppProvider";

import {
  List,
  View,
  Left,
  Body,
  Right,
  Spinner,
  ListItem,
  Container,
} from "native-base";

class ItemPureComponent extends React.PureComponent {
  render() {
    const { item, navigation } = this.props;

    console.log("rendering chat ", item.recvr_id);

    const onPress = () => {
      navigation.navigate("ChatsReadPage", item);
    };

    const renderLastMessage = () => {
      const lastMessage = item.messages[0];
      // const lastMessage = item.messages[item.messages.length - 1];

      if (lastMessage?.type == 1) {
        return (
          <Text note style={{ fontWeight: "300" }}>
            Photo
          </Text>
        );
      }

      return (
        <Text note style={{ fontWeight: "300" }}>
          {lastMessage?.data?.substring(0, 71)}
        </Text>
      );
    };

    return (
      <ListItem thumbnail onPress={onPress}>
        <Left>
          <CachedThumbnail
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
          {renderLastMessage()}
        </Body>
        <Right>
          {item?.unread_count ? (
            <View
              style={{
                padding: 5,
                borderRadius: 50,
                backgroundColor: "#2588ed",
              }}
            >
              <Text style={{ color: "white" }}>{item.unread_count}</Text>
            </View>
          ) : (
            <React.Fragment />
          )}
        </Right>
      </ListItem>
    );
  }
}

function ChatsListPage({ navigation }) {
  const url = "/api/chats";
  const dispatch = "UPDATE_CHATS";
  const { state, refreshing, send } = getRequestThenDispatch(url, dispatch);
  const list = state?.chats;

  const onRefresh = async () => {
    send("/api/chats", dispatch);
  };

  let { data } = list;

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
    return item.recvr_id.toString();
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
    return (
      <ItemPureComponent
        item={list.object[item.recvr_id]}
        navigation={navigation}
      />
    );
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
      <List>
        <FlatList
          style={{ height: "100%" }}
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
