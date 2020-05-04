import React from "react";
import { FlatList } from "react-native";
import Text from "../../components/TextComponent";
import HeaderComponent from "../../components/HeaderComponent";
import { getRequestThenDispatch } from "../../providers/AppProvider";
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Icon,
} from "native-base";

function PdfsPage({ navigation }) {
  const url = "/api/pdfgroups";
  const { state, fetching } = getRequestThenDispatch(url, "UPDATE_PDFGROUPS");

  const refreshing = fetching;
  const data = state.pdfgroups.data;

  const onRefresh = () => {
    // getRequestThenDispatch(url, "UPDATE_PDFGROUPS");
  };

  const renderItem = ({ item }) => {
    const onPress = () => {
      navigation.navigate("PdfgroupsReadPage", item);
    };

    return (
      <ListItem thumbnail onPress={onPress}>
        <Left>
          <Icon name="ios-copy" />
        </Left>
        <Body>
          <Text>{item.title}</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  };

  const keyExtractor = (item) => {
    return item.id.toString();
  };

  return (
    <Container>
      <HeaderComponent navigation={navigation} />
      <Content padder>
        <Text>E Library</Text>
        <List>
          <FlatList
            {...{
              data,
              renderItem,
              refreshing,
              onRefresh,
              keyExtractor,
            }}
          />
        </List>
      </Content>
    </Container>
  );
}

export default PdfsPage;
