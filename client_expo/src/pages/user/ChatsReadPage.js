import React from "react";
import { AppContext } from "../../providers/AppProvider";
import { Container, Button, Icon } from "native-base";
import MessageListComponent from "../components/MessageListComponent";
import MessageFormComponent from "../components/MessageFormComponent";

function ChatsReadPage({ navigation, route }) {
  const { params } = route;

  console.log(params);

  const { state, sendRequestThenDispatch } = React.useContext(AppContext);

  const { send } = sendRequestThenDispatch();

  const chat = state.chats.object[params.recvr_id];

  navigation.setOptions({
    title: `${params.recvr.first_name} ${params.recvr.last_name}`,
    headerLeft: () => (
      <Button
        transparent
        onPress={() => {
          navigation.pop();
        }}
      >
        <Icon name="arrow-left" type="Feather" style={{ color: "black" }} />
      </Button>
    ),
  });

  const start = (message) => {
    const body = { recvr_id: params.recvr_id, message };
    send("/api/chats", "UPDATE_CHATS", body);
  };

  if (!chat) {
    console.log("new chat");
    return (
      <Container>
        <MessageListComponent />
        <MessageFormComponent onSubmit={start} />
      </Container>
    );
  }

  const { chat_id, title, messages } = chat;

  const onSubmit = (message) => {
    const body = { chat_id: chat_id, message };
    // error coming from here
    send("/api/chats/message", "UPDATE_CHATS", body);
  };

  return (
    <Container>
      <MessageListComponent messages={messages} />
      <MessageFormComponent onSubmit={onSubmit} />
    </Container>
  );
}

export default ChatsReadPage;
