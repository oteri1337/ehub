import React from "react";
import { FlatList } from "react-native";
import { BACKEND_URL } from "../../../env";
import Text from "../../components/TextComponent";
import HeaderComponent from "../../components/HeaderComponent";
import { getRequestThenDispatch } from "../../providers/AppProvider";
import { Container, List, ListItem, Left, Body, Thumbnail } from "native-base";

function UsersPage({ navigation }) {
  const url = "/api/users";
  const { state, fetching } = getRequestThenDispatch(url, "UPDATE_USERS");

  const refreshing = fetching;
  const data = state.users.data;

  const renderItem = ({ item }) => {
    const onPress = () => {
      navigation.navigate("UsersReadPage", item);
    };

    return (
      <ListItem thumbnail onPress={onPress}>
        <Left>
          <Thumbnail
            source={{
              uri: `${BACKEND_URL}/uploads/images/${item.photo_profile}`,
            }}
          />
        </Left>
        <Body>
          <Text>
            {item.first_name} {item.last_name}
          </Text>
          <Text note>{item.department}</Text>
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
    return <Text style={{ marginLeft: 10 }}>COMMUNITY</Text>;
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
    </Container>
  );
}

export default UsersPage;
