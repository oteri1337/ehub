import React from "react";
import { FlatList } from "react-native";
import { BACKEND_URL } from "../../../../env";
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
} from "native-base";
import { AppContext } from "../../../providers/AppProvider";
import HeaderComponent from "../../../components/HeaderComponent";

function MessagesPage({ navigation }) {
  const { state } = React.useContext(AppContext);

  const data = state.user.chats;

  const keyExtractor = (item) => {
    return item.id.toString();
  };

  const renderItem = ({ item }) => {
    const onPress = () => {
      navigation.navigate("MessagesReadPage", item);
    };

    return (
      <ListItem thumbnail>
        <Left>
          <Thumbnail
            source={{
              uri: `${BACKEND_URL}/uploads/images/girl1.jpg`,
            }}
          />
        </Left>
        <Body>
          <Text style={{ fontWeight: "bold" }}>{item.recvr_id}</Text>
          <Text note>Last Message</Text>
        </Body>
      </ListItem>
    );
  };

  const ListHeaderComponent = () => {
    return <Text style={{ marginLeft: 15, marginTop: 5 }}>INBOX</Text>;
  };

  return (
    <Container>
      {/* <HeaderComponent navigation={navigation} title="Messages" /> */}
      <List>
        <FlatList {...{ data, renderItem, keyExtractor }} />
      </List>
    </Container>
  );
}

export default MessagesPage;
