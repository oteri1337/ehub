import React from "react";
import { BACKEND_URL } from "../../../env";
import { Keyboard, Image } from "react-native";
import { sendRequestThenDispatch } from "../../providers/AppProvider";
import { Container, Textarea, Button, Text, Spinner, Icon } from "native-base";

function CommentReadPage({ route, navigation }) {
  //  console.log(route.params);
  const { tag, message, update, deleteData } = route.params;
  const { id, type } = message;

  console.log(tag);

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
    headerRight: () => {
      if (tag == "Topic") {
        return <React.Fragment />;
      }
      return (
        <Button
          transparent
          onPress={async () => {
            let { endpoint, dispatch, body } = deleteData;
            const response = await send(endpoint, dispatch, body, "DELETE");
            if (response.errors.length === 0) {
              navigation.pop();
            }
          }}
        >
          <Icon name="trash" type="Feather" style={{ color: "black" }} />
        </Button>
      );
    },
  });

  const [data, setdata] = React.useState(message.data);

  const { refreshing, send } = sendRequestThenDispatch();

  if (type == 1) {
    return (
      <Container>
        <Image
          source={{
            uri: `${BACKEND_URL}/uploads/images/${message.data}`,
          }}
          style={{ height: 400 }}
        />
      </Container>
    );
  }

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
          onPress={async () => {
            let { endpoint, dispatch, body = {} } = update;

            body = {
              id,
              data,
              ...body,
            };
            const response = await send(endpoint, dispatch, body, "PATCH");
            if (response.errors.length === 0) {
              navigation.pop();
            }
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
