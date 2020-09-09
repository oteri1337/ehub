import React from "react";
import { Notifications } from "expo";
import { Button, Icon } from "native-base";
import { KeyboardAvoidingView, Platform } from "react-native";
import MessageListComponent from "../components/MessageListComponent";
import MessageFormComponent from "../components/MessageFormComponent";
import { sendRequestThenDispatch } from "../../providers/AppProvider";

function ChatsReadPage({ navigation, route }) {
  const { recvr_id, recvr } = route.params;

  const { state, callReducer, send } = sendRequestThenDispatch();

  const chat = state.chats.object[recvr_id];

  React.useEffect(() => {
    if (chat) {
      callReducer({ dispatch: "CLEAR_UNREAD", data: chat });
    }
    Notifications.dismissAllNotificationsAsync();
  }, []);

  navigation.setOptions({
    title: `${recvr.first_name} ${recvr.last_name}`,
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
    const body = { recvr_id, data };
    send("/api/chats", "UPDATE_CHATS", body);
  };

  const startWithImage = (formData) => {
    formData.append("id", chat_id);
    formData.append("recvr_id", recvr_id);
    send("/api/chats", "UPDATE_CHATS", formData);
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
        <MessageFormComponent onSubmit={start} onImage={startWithImage} />
      </KeyboardAvoidingView>
    );
  }

  const { chat_id, messages } = chat;

  const onSubmit = (data) => {
    const body = { id: chat_id, recvr_id, data };
    send("/api/chats/messages", "UPDATE_CHATS", body);
  };

  const onImage = (formData) => {
    formData.append("id", chat_id);
    formData.append("recvr_id", recvr_id);
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
