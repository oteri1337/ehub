import React from "react";
import PDFReader from "rn-pdf-reader-js";
import { BACKEND_URL } from "../../../env";
import { Keyboard, Image } from "react-native";
import { sendRequestThenDispatch } from "../../providers/AppProvider";
import { Container, Textarea, Button, Text, Spinner, Icon } from "native-base";

function CommentReadPage({ route, navigation }) {
  const { state, refreshing, send } = sendRequestThenDispatch();
  const [data, setdata] = React.useState(route.params.data);
  const { id, type, user_id } = route.params;

  let title = "";
  let dispatch = "";
  let endpoint = "";
  let body = { id };

  if (route.params.user_id) {
    title = "Update Topic";
    dispatch = "UPDATE_TOPIC";
    endpoint = "/api/topics";
  }

  if (route.params.event_id) {
    title = "Update Comment";
    dispatch = "UPDATE_EVENT";
    endpoint = "/api/events/comments";
    body.event_id = route.params.event_id;
  }

  if (route.params.topic_id) {
    title = "Comment";
    dispatch = "UPDATE_TOPIC";
    endpoint = "/api/topics/comments";
    body.topic_id = route.params.topic_id;
  }

  if (route.params.chat_id) {
    title = "Message";
    dispatch = "UPDATE_CHAT";
    endpoint = "/api/chats/comments";
    body.chat_id = route.params.chat_id;
  }

  // return (
  //   <Container>
  //     <Text>Refactor in progress</Text>
  //   </Container>
  // );

  //  console.log(route.params);
  // const { title, message, update, deleteData } = route.params;
  // const { id, type } = message;

  navigation.setOptions({
    title,
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
      if (title == "Update Topic") {
        return <React.Fragment />;
      }

      if (refreshing) {
        return <Spinner />;
      }

      if (user_id != state.user.id) {
        return <React.Fragment />;
      }

      return (
        <Button
          transparent
          onPress={async () => {
            // let { endpoint, dispatch, body } = deleteData;
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

  if (type == 1) {
    const uri = `${BACKEND_URL}/uploads/images/${data}`;
    return (
      <Container>
        <Image source={{ uri }} style={{ height: 500 }} />
      </Container>
    );
  }

  if (type == 2) {
    const uri = `${BACKEND_URL}/uploads/pdfs/${data}`;
    return (
      <React.Fragment>
        <PDFReader source={{ uri }} />
      </React.Fragment>
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
            // let { endpoint, dispatch, body = {} } = update;
            body.data = data;
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
