import React from "react";
import { FlatList } from "react-native";
import { BACKEND_URL } from "../../../env";
import Text from "../../components/TextComponent";
import { AppContext } from "../../providers/AppProvider";
import HeaderComponent from "../../components/HeaderBackComponent";
import { Container, List, Thumbnail, View } from "native-base";

function PdfgroupsReadPage({ navigation, route }) {
  const { title, slug } = route.params;
  const { state } = React.useContext(AppContext);
  // const url = "/api/pdfgroups";
  //  const { state, fetching } = getRequestThenDispatch(url, "UPDATE_PDFGROUPS");

  // const refreshing = fetching;
  const refreshing = false;
  // const data = state.pdfgroups.data;
  const data = state.pdfgroups.object[slug].pdfs.data;

  // const renderItem = ({ item }) => {
  //   const onPress = () => {
  //     navigation.navigate("PdfsReadPage", item);
  //   };

  //   return (
  //     <ListItem thumbnail onPress={onPress}>
  //       <Left>
  //         <Thumbnail
  //           square
  //           source={{
  //             uri: `${BACKEND_URL}/uploads/images/${item.image_name}`,
  //           }}
  //         />
  //       </Left>
  //       <Body>
  //         <Text
  //           style={{
  //             fontSize: 12,
  //             fontFamily: "Roboto_medium",
  //             textTransform: "uppercase",
  //             color: "#59595a",
  //           }}
  //         >
  //           {item.title}
  //         </Text>
  //         <Text
  //           style={{
  //             fontSize: 11,
  //             textTransform: "capitalize",
  //             color: "#5a5a62",
  //           }}
  //         >
  //           {item.description}
  //         </Text>
  //         <Text style={{ fontSize: 11, color: "#5a5a62" }}>
  //           {item.file_size}
  //         </Text>
  //       </Body>
  //     </ListItem>
  //   );
  // };

  const renderItem = ({ item }) => {
    const onPress = () => {
      navigation.navigate("PdfsReadPage", item);
    };

    return (
      <View style={{ margin: 1 }}>
        <Thumbnail
          style={{ width: 120, height: 180 }}
          square
          source={{
            uri: `${BACKEND_URL}/uploads/images/${item.image_name}`,
          }}
        />
      </View>
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
    </Container>
  );
}

export default PdfgroupsReadPage;
