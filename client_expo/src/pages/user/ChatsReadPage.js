import React from "react";
import { Notifications } from "expo";
import { Button, Icon } from "native-base";
import { KeyboardAvoidingView, Platform, Alert } from "react-native";
import MessageListComponent from "../components/MessageListComponent";
import { sendRequestThenDispatch } from "../../providers/AppProvider";

function ChatsReadPage({ navigation, route }) {
  const { recvr_id, recvr } = route.params;

  const { state, callReducer, send } = sendRequestThenDispatch();

  const chat = state.chats.object[recvr_id];

  React.useEffect(() => {
    if (chat) {
      callReducer({ dispatch: "CLEAR_UNREAD", data: chat });
    }
    if (Platform.OS != "ios") {
      Notifications.dismissAllNotificationsAsync();
    }
  }, []);

  console.log("chat", chat);

  React.useLayoutEffect(() => {
    if (!chat) {
      navigation.setOptions({
        title: `${recvr.first_name} ${recvr.last_name}`,
      });
    }

    navigation.setOptions({
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

    if (chat) {
      const enableNotifications = () => {
        Alert.alert(
          "Confirm",
          "recieve notifications from this user?",
          [
            {
              text: "Recieve",
              onPress: () => {
                const body = { recvr_id, notifications: 1 };
                send("/api/chats", "UPDATE_CHAT", body, "PATCH");
              },
            },
            {
              text: "Cancel",
              onPress: () => {},
            },
          ],
          { cancelable: false }
        );
      };

      const disableNotifications = () => {
        Alert.alert(
          "Confirm",
          "block notifications from this user?",
          [
            {
              text: "Block",
              onPress: () => {
                const body = { recvr_id, notifications: 2 };
                send("/api/chats", "UPDATE_CHAT", body, "PATCH");
              },
            },
            {
              text: "Cancel",
              onPress: () => {},
            },
          ],
          { cancelable: false }
        );
      };

      navigation.setOptions({
        title: `${chat.recvr.first_name} ${chat.recvr.last_name}`,
        headerRight: () => {
          if (chat.notifications == 1) {
            return (
              <React.Fragment>
                <Button transparent onPress={disableNotifications}>
                  <Icon
                    type="Feather"
                    name="bell-off"
                    style={{ color: "black" }}
                  />
                </Button>
              </React.Fragment>
            );
          }

          return (
            <React.Fragment>
              <Button transparent onPress={enableNotifications}>
                <Icon type="Feather" name="bell" style={{ color: "black" }} />
              </Button>
            </React.Fragment>
          );
        },
      });
    }
  }, []);

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
        <MessageListComponent onSubmit={start} onImage={startWithImage} />
        {/* <MessageFormComponent onSubmit={start} onImage={startWithImage} /> */}
      </KeyboardAvoidingView>
    );
  }

  const { chat_id, messages } = chat;

  const user_id = state.user.id;

  const onSubmit = (data) => {
    if (data) {
      const id = Date.now();
      const opBody = { id, type: 0, recvr_id, data, user_id };
      callReducer({ dispatch: "ADD_OPTIMISTIC_MESSAGE", data: opBody });

      const body = { id: chat_id, type: 0, recvr_id, data, user_id };
      send(`/api/chats/${recvr_id}`, "UPDATE_CHAT", body);
    }
  };

  const onImage = (formData) => {
    formData.append("id", chat_id);
    formData.append("recvr_id", recvr_id);
    send(`/api/chats/${recvr_id}`, "UPDATE_CHATS", formData);
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
        onSubmit={onSubmit}
        onImage={onImage}
        type="chat"
      />
      {/* <MessageFormComponent onSubmit={onSubmit} onImage={onImage} /> */}
    </KeyboardAvoidingView>
  );
}

export default ChatsReadPage;
