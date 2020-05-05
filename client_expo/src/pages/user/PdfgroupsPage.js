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
  Right,
  Icon,
} from "native-base";

function PdfgroupsPage({ navigation }) {
  const url = "/api/pdfgroups";
  const { state, fetching } = getRequestThenDispatch(url, "UPDATE_PDFGROUPS");

  const refreshing = fetching;
  const data = state.pdfgroups.data;

  const renderItem = ({ item }) => {
    const onPress = () => {
      navigation.navigate("PdfgroupsReadPage", item);
    };

    return (
      <ListItem thumbnail onPress={onPress}>
        <Left>
          <Icon name="ios-copy" style={{ color: "rgba(28, 28, 30, 0.68)" }} />
        </Left>
        <Body>
          <Text>{item.title}</Text>
          <Text note>{item.pdfs_count} Books</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
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
    return <Text style={{ marginLeft: 10 }}>LIBRARY</Text>;
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

export default PdfgroupsPage;
