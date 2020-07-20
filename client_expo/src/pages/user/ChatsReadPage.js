import React from "react";
import { Button, Icon } from "native-base";
import { KeyboardAvoidingView, Platform } from "react-native";
import MessageListComponent from "../components/MessageListComponent";
import MessageFormComponent from "../components/MessageFormComponent";
import { sendRequestThenDispatch } from "../../providers/AppProvider";

function ChatsReadPage({ navigation, route }) {
  const { params } = route;

  const { state, send } = sendRequestThenDispatch();

  const chat = state.chats.object[params.chat_id];

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
    const body = { id: chat_id, data };
    send("/api/chats/messages", "UPDATE_CHATS", body);
  };

  const onImage = (formData) => {
    formData.append("id", chat_id);
    send("/api/chats/messages", "UPDATE_CHATS", formData);
  };

  return (
    <KeyboardAvoidingView
      enabled={avoid}
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={60}
    >
      <MessageListComponent
        data={messages}
        list={chat}
        next_dispatch="UPDATE_CHAT_MESSAGES_PAGE"
      />
      <MessageFormComponent onSubmit={onSubmit} onImage={onImage} />
    </KeyboardAvoidingView>
  );
}

export default ChatsReadPage;
