import React from "react";
import { BACKEND_URL } from "../../../env";
import { TouchableHighlight } from "react-native";
import { AppContext } from "../../providers/AppProvider";
import { Container, View, Thumbnail, Content, Text } from "native-base";

function SavedPdfsPage({ navigation }) {
  const { state } = React.useContext(AppContext);
  const { saved } = state;

  const renderBooks = () => {
    return Object.keys(saved).map((id) => {
      const book = saved[id];

      const onPress = () => {
        navigation.navigate("PdfsPreviewPage", book);
      };

      return (
        <TouchableHighlight key={book.id} onPress={onPress}>
          <View style={{ margin: 1 }}>
            <Thumbnail
              style={{ width: 170, height: 280 }}
              square
              source={{
                uri: `${BACKEND_URL}/uploads/images/${book.image_name}`,
              }}
            />
          </View>
        </TouchableHighlight>
      );
    });
  };

  if (Object.keys(saved).length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>
          You can save books for offline use
        </Text>
      </View>
    );
  }

  return (
    <Container>
      <Content
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {renderBooks()}
      </Content>
    </Container>
  );
}

export default SavedPdfsPage;
