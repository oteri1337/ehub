import React from "react";
import { FlatList } from "react-native";
import { Container, Text, View } from "native-base";
import PdfsListComponent from "./PdfsListComponent";

function PdfsParentPage({ route }) {
  const data = route.params?.groups ?? [];

  console.log(route.params);

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 15 }}>
        <Text>{item.title}</Text>
        <PdfsListComponent data={item.pdfs} />
      </View>
    );
  };

  const keyExtractor = (item) => {
    return item.id.toString();
  };

  return (
    <Container style={{ justifyContent: "center" }}>
      <FlatList {...{ data, renderItem, keyExtractor }} />
    </Container>
  );
}

export default PdfsParentPage;
