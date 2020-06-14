import React from "react";
import Text from "../../components/TextComponent";
import { AppContext } from "../../providers/AppProvider";
import { FlatList, Platform } from "react-native";
import {
  Icon,
  List,
  Left,
  Body,
  View,
  Spinner,
  ListItem,
  Container,
} from "native-base";

class ItemPureComponent extends React.PureComponent {
  render() {
    const { item, navigation } = this.props;

    console.log("rendering topic ", item.id);

    const onPress = () => {
      navigation.navigate("TopicsReadPage", item);
    };

    return (
      <ListItem thumbnail onPress={onPress}>
        <Left>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: item.color,
              justifyContent: "center",
            }}
          >
            <Icon
              name="message-square"
              type="Feather"
              style={{
                color: "#FFFFFF",
                textAlign: "center",
              }}
            />
          </View>
        </Left>
        <Body>
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <Text note style={{ fontWeight: "300" }}>
            {item.content.substring(0, 78)}
          </Text>
        </Body>
      </ListItem>
    );
  }
}

function TopicsPage({ navigation }) {
  const context = React.useContext(AppContext);
  const { topics, refreshing, getRequestThenDispatch, state } = context;

  console.log(state);

  const list = topics;
  let { data } = list;

  const dispatch = "UPDATE_TOPICS";

  const onRefresh = async () => {
    getRequestThenDispatch("/api/topics", dispatch);
  };

  React.useEffect(() => {
    if (!data.length) {
      onRefresh();
    }
  }, []);

  const onEndReachedThreshold = 0.1;

  const keyExtractor = (item) => {
    return item.id.toString();
  };

  const ListFooterComponent = () => {
    if (refreshing) {
      if (Platform.OS == "ios") {
        return <Spinner />;
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

export default TopicsPage;
