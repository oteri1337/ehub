import React from "react";
import { FlatList } from "react-native";
import { BACKEND_URL } from "../../../env";
import Text from "../../components/TextComponent";
import HeaderComponent from "../../components/HeaderBackComponent";
import { AppContext } from "../../providers/AppProvider";
import { Container, List, ListItem, Left, Body, Thumbnail } from "native-base";

function PdfgroupsReadPage({ navigation, route }) {
  const { title, slug } = route.params;
  const { state } = React.useContext(AppContext);
  // const url = "/api/pdfgroups";
  //  const { state, fetching } = getRequestThenDispatch(url, "UPDATE_PDFGROUPS");

  // const refreshing = fetching;
  const refreshing = false;
  // const data = state.pdfgroups.data;
  const data = state.pdfgroups.object[slug].pdfs.data;

  const renderItem = ({ item }) => {
    const onPress = () => {
      navigation.navigate("PdfsReadPage", item);
    };

    return (
      <ListItem thumbnail onPress={onPress}>
        <Left>
          <Thumbnail
            square
            source={{
              uri: `${BACKEND_URL}/uploads/images/${item.image_name}`,
            }}
          />
        </Left>
        <Body>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Roboto_medium",
              textTransform: "uppercase",
              color: "#59595a",
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 11,
              textTransform: "capitalize",
              color: "#5a5a62",
            }}
          >
            {item.description}
          </Text>
          <Text style={{ fontSize: 11, color: "#5a5a62" }}>
            {item.file_size}
          </Text>
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
    return <Text style={{ marginLeft: 10 }}>{title.toUpperCase()}</Text>;
  };

  return (
    <Container>
      <HeaderComponent navigation={navigation} title={title} />
      <List style={{ padding: 10 }}>
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
    </Container>
  );
}

export default PdfgroupsReadPage;
