import React from "react";
import { FlatList } from "react-native";
import { Container, Text, View } from "native-base";
import HorizontalPdfsListComponent from "./HorizontalPdfsListComponent";

function PdfsParentPage({ route, navigation }) {
  const data = route.params?.pdfgroups ?? [];

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 15 }}>
        <Text
          style={{ marginLeft: 10, marginBottom: 5 }}
          onPress={() => {
            navigation.navigate("PdfGroupPage", item);
          }}
        >
          {item.title}
        </Text>
        <HorizontalPdfsListComponent data={item.pdfs} />
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
