import React from "react";
import { Keyboard } from "react-native";
import { sendRequestThenDispatch } from "../../providers/AppProvider";
import { Container, Textarea, Button, Text, Spinner } from "native-base";

function CommentReadPage({ route, navigation }) {
  navigation.setOptions({ title: "Update" });
  const [message, setMessage] = React.useState(route.params.message);
  const { refreshing } = sendRequestThenDispatch();

  return (
    <Container style={{ padding: 5 }}>
      <Textarea
        bordered
        rowSpan={7}
        value={message}
        onChangeText={(text) => setMessage(text)}
        onBlur={() => {
          Keyboard.dismiss();
        }}
      />

      {!refreshing && (
        <Button
          full
          bordered
          dark
          onPress={() => {
            console.log("update comment");
            ///send("/api/comments")
          }}
          style={{ marginTop: 5 }}
        >
          <Text>Update</Text>
        </Button>
      )}

      {!refreshing && (
        <Button
          dark
          full
          onPress={() => {
            console.log("delete comment");
            ///send("/api/comments")
          }}
          style={{ marginTop: 5 }}
        >
          <Text>Delete</Text>
        </Button>
      )}

      {refreshing && <Spinner />}
    </Container>
  );
}

export default CommentReadPage;
