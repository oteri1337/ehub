import React from "react";
import { Keyboard } from "react-native";
import { sendRequestThenDispatch } from "../../providers/AppProvider";
import { Container, Textarea, Button, Text, Spinner, Icon } from "native-base";

function CommentReadPage({ route, navigation }) {
  //  console.log(route.params);
  const { tag, update, message } = route.params;
  let { endpoint, dispatch, body = {} } = update;
  const { id } = message;

  navigation.setOptions({
    title: `Update ${tag}`,
    headerLeft: () => (
      <Button
        transparent
        onPress={() => {
          navigation.pop();
        }}
      >
        <Icon name="arrow-back" style={{ color: "black" }} />
      </Button>
    ),
    headerRight: () => (
      <Button transparent>
        <Icon name="trash" type="Feather" style={{ color: "black" }} />
      </Button>
    ),
  });

  const [data, setdata] = React.useState(message.data);

  const { refreshing, send } = sendRequestThenDispatch();

  return (
    <Container style={{ padding: 5 }}>
      <Textarea
        bordered
        rowSpan={11}
        value={data}
        onChangeText={(text) => setdata(text)}
        onBlur={() => {
          Keyboard.dismiss();
        }}
      />

      {!refreshing && (
        <Button
          full
          bordered
          dark
          style={{ marginTop: 5 }}
          onPress={() => {
            body = {
              id,
              data,
              ...body,
            };
            send(endpoint, dispatch, body, "PATCH");
          }}
        >
          <Text>Update</Text>
        </Button>
      )}

      {refreshing && <Spinner />}
    </Container>
  );
}

export default CommentReadPage;
