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

  const renderItem = ({ item }) => {
    const onPress = () => {
      navigation.navigate("MessagesReadPage", item);
    };

    return (
      <ListItem thumbnail>
        <Left>
          <Thumbnail
            source={{
              uri: `${BACKEND_URL}/uploads/images/human.png`,
            }}
          />
        </Left>
        <Body>
          <Text>{item.recvr_id}</Text>
          <Text note>Last Message</Text>
        </Body>
      </ListItem>
    );
  };

  const ListHeaderComponent = () => {
    return <Text style={{ marginLeft: 10 }}>INBOX</Text>;
  };

  return (
    <Container>
      <HeaderComponent navigation={navigation} />
      <Content padder>
        <List>
          <FlatList {...{ data, renderItem, ListHeaderComponent }} />
        </List>
      </Content>
    </Container>
  );
}

export default MessagesPage;
