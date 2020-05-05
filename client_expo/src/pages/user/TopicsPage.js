import React from "react";
import { FlatList } from "react-native";
import Text from "../../components/TextComponent";
import HeaderComponent from "../../components/HeaderComponent";
import { getRequestThenDispatch } from "../../providers/AppProvider";
import {
  Container,
  List,
  ListItem,
  Left,
  Body,
  Icon,
  Fab,
  Button,
} from "native-base";

function TopicsPage({ navigation }) {
  const url = "/api/topics";
  const { state, fetching } = getRequestThenDispatch(url, "UPDATE_TOPICS");

  const refreshing = fetching;
  const data = state.topics.data;

  const renderItem = ({ item }) => {
    const onPress = () => {
      navigation.navigate("TopicsReadPage", item);
    };

    return (
      <ListItem thumbnail>
        <Left>
          <Icon
            name="ios-chatboxes"
            style={{ color: "rgba(28, 28, 30, 0.68)" }}
          />
        </Left>
        <Body>
          <Text>{item.title}</Text>
        </Body>
      </ListItem>
    );
  };

  const onRefresh = () => {
    // getRequestThenDispatch(url, "UPDATE_PDFGROUPS");
  };

  const keyExtractor = (item) => {
    return item.id.toString();
  };

  const ListHeaderComponent = () => {
    return <Text style={{ marginLeft: 10 }}>FORUM</Text>;
  };

  return (
    <Container>
      <HeaderComponent navigation={navigation} />
      <List style={{ padding: 10 }}>
        <FlatList
          {...{
            data,
            renderItem,
            refreshing,
            onRefresh,
            keyExtractor,
            ListHeaderComponent,
          }}
        />
      </List>
      <Fab
        active={true}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: "#5067FF" }}
        position="bottomRight"
        onPress={() => navigation.navigate("TopicsCreatePage")}
      >
        <Icon name="add" />
      </Fab>
    </Container>
  );
}

export default TopicsPage;
