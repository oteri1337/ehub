import React from "react";
import PDFReader from "rn-pdf-reader-js";
import { BACKEND_URL } from "../../../../env";
import { Button, Icon, Spinner } from "native-base";
import { sendRequestThenDispatch } from "../../../providers/AppProvider";

function PdfsCommentPage({ navigation, route }) {
  const { state, refreshing, send } = sendRequestThenDispatch();
  const { user_id, data, id } = route.params;

  let dispatch = "";
  let endpoint = "";
  let body = { id };

  if (route.params.event_id) {
    dispatch = "UPDATE_EVENT";
    endpoint = "/api/events/comments";
    body.event_id = route.params.event_id;
  }

  if (route.params.topic_id) {
    dispatch = "UPDATE_TOPIC";
    endpoint = "/api/topics/comments";
    body.topic_id = route.params.topic_id;
  }

  if (route.params.chat_id) {
    dispatch = "UPDATE_CHAT";
    endpoint = "/api/chats/comments";
    body.chat_id = route.params.chat_id;
  }

  navigation.setOptions({
    title: data,
    headerRight: () => {
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

  const uri = `${BACKEND_URL}/uploads/pdfs/${data}`;

  return (
    <React.Fragment>
      <PDFReader source={{ uri }} />
    </React.Fragment>
  );
}

export default PdfsCommentPage;
