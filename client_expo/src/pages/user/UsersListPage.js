import React from "react";
import { BACKEND_URL } from "../../../env";
import Text from "../../components/TextComponent";
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

class ItemPureComponent extends React.PureComponent {
  render() {
    const { item, navigation } = this.props;

    console.log("rendering user ", item.id);

    const onPress = () => {
      navigation.navigate("UsersReadPage", item);
    };

    const uri = `${BACKEND_URL}/uploads/images/${item.photo_profile}`;

    return (
      <ListItem thumbnail onPress={onPress}>
        <Left>
          <Thumbnail source={{ uri }} />
        </Left>
        <Body>
          <Text style={{ fontWeight: "bold" }}>
            {item.first_name} {item.last_name}
          </Text>
          <Text note style={{ fontWeight: "300" }}>
            {item.department}
          </Text>
        </Body>
      </ListItem>
    );
  }
}

function UsersPage({ navigation }) {
  const context = React.useContext(AppContext);
  const { state, refreshing, getRequestThenDispatch } = context;
  const list = state.users;
  const { data } = list;

  const dispatch = "UPDATE_USERS";

  const onRefresh = async () => {
    console.log("requesting users");
    getRequestThenDispatch("/api/users", dispatch);
  };

  React.useEffect(() => {
    onRefresh();
  }, []);

  const onEndReachedThreshold = 0.1;

  const keyExtractor = (item) => {
    return item.id.toString();
  };

  const ListHeaderComponent = () => {
    return <Text style={{ marginLeft: 15, marginTop: 5 }}>COMMUNITY</Text>;
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
    console.log("on end reached users");
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
      <List style={{ flex: 1 }}>
        <FlatList
          {...{
            data,
            onRefresh,
            renderItem,
            refreshing,
            keyExtractor,
            onEndReached,
            ListFooterComponent,
            onEndReachedThreshold,
          }}
        />
      </List>
    </Container>
  );
}

export default UsersPage;
