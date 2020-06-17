import React from "react";
import { BACKEND_URL } from "../../../env";
import Text from "../components/TextComponent";
import { AppContext } from "../../providers/AppProvider";
import { FlatList, Platform } from "react-native";
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
  const context = React.useContext(AppContext);
  const { state, refreshing, getRequestThenDispatch } = context;

  const list = state.chats;
  let { data } = list;

  const dispatch = "UPDATE_CHATS";

  const onRefresh = async () => {
    getRequestThenDispatch("/api/chats", dispatch);
  };

  React.useEffect(() => {
    onRefresh();
  }, []);

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

  const onEndReached = async () => {
    console.log("on end reached topics");
    if (!refreshing) {
      const { next_page_url } = list;
      if (next_page_url) {
        getRequestThenDispatch(next_page_url, `${dispatch}_PAGE`);
      }
    }
  };

  const renderItem = ({ item }) => {
    return <ItemPureComponent item={item} navigation={navigation} />;
  };

  return (
    <Container>
      {/* <StatusBar barStyle="light-content" backgroundColor="#f0f0f0" /> */}
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

// import React from "react";
// import { FlatList } from "react-native";
// import { BACKEND_URL } from "../../../env";
// import {
//   Container,
//   Text,
//   List,
//   ListItem,
//   Left,
//   Thumbnail,
//   Body,
// } from "native-base";
// import { AppContext } from "../../providers/AppProvider";

// function MessagesPage({ navigation }) {
//   const { state } = React.useContext(AppContext);

//   console.log(state.user);

//   const data = state.user.chats;

//   const keyExtractor = (item) => {
//     return item.id.toString();
//   };

//   const renderItem = ({ item }) => {
//     const onPress = () => {
//       navigation.navigate("ChatsReadPage", item);
//     };

//     return (
//       <ListItem thumbnail onPress={onPress}>
// <Left>
//   <Thumbnail
//     source={{
//       uri: `${BACKEND_URL}/uploads/images/girl1.jpg`,
//     }}
//   />
// </Left>
//         <Body>
//           <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
//           <Text note style={{ fontWeight: "300" }}>
//             {item.messages[item.messages.length - 1].message}
//           </Text>
//         </Body>
//       </ListItem>
//     );
//   };

//   const ListHeaderComponent = () => {
//     return <Text style={{ marginLeft: 15, marginTop: 5 }}>INBOX</Text>;
//   };

//   return (
//     <Container>
//       {/* <HeaderComponent navigation={navigation} title="Messages" /> */}
//       <List>
//         <FlatList {...{ data, renderItem, keyExtractor }} />
//       </List>
//     </Container>
//   );
// }

// export default MessagesPage;
