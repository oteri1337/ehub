import React from "react";
import { Button, Icon } from "native-base";
import { KeyboardAvoidingView, Platform } from "react-native";
import MessageListComponent from "../components/MessageListComponent";
import MessageFormComponent from "../components/MessageFormComponent";
import { sendRequestThenDispatch } from "../../providers/AppProvider";

function ChatsReadPage({ navigation, route }) {
  const { params } = route;

  const { state, send } = sendRequestThenDispatch();

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
        <Icon name="arrow-back" style={{ color: "black" }} />
      </Button>
    ),
  });

  const start = (data) => {
    const body = { recvr_id: params.recvr_id, data };
    send("/api/chats", "UPDATE_CHATS", body);
  };

  let avoid = false;

  if (Platform.OS == "ios") {
    avoid = true;
  }

  if (!chat) {
    return (
      <KeyboardAvoidingView
        enabled={avoid}
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={60}
      >
        <MessageListComponent />
        <MessageFormComponent onSubmit={start} />
      </KeyboardAvoidingView>
    );
  }

  const { chat_id, title, messages } = chat;

  const onSubmit = (data) => {
    const body = { chat_id: chat_id, data };
    send("/api/chats/message", "UPDATE_CHATS", body);
  };

  return (
    <KeyboardAvoidingView
      enabled={avoid}
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={60}
    >
      <MessageListComponent data={messages} />
      <MessageFormComponent onSubmit={onSubmit} />
    </KeyboardAvoidingView>
  );
}

export default ChatsReadPage;
