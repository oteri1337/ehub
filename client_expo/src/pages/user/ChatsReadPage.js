import React from "react";
// import { Notifications } from "expo";
import { Button, Icon } from "native-base";
import { KeyboardAvoidingView, Platform, Alert } from "react-native";
import MessageListComponent from "../components/MessageListComponent";
import {
  sendRequestThenDispatch,
  getRequestThenDispatch,
} from "../../providers/AppProvider";

function ChatsReadPage({ navigation, route }) {
  let id = route.params.recvr_id;
  const get = getRequestThenDispatch();
  const { state, callReducer, send } = sendRequestThenDispatch();
  const user_id = state.user.id;

  if (state.user.id == id) {
    id = route.params.user_id;
  }

  const chat = state.chats.object[id];

  // React.useEffect(() => {
  //   if (chat) {
  //     if (state.unread) {
  //       callReducer({ dispatch: "CLEAR_UNREAD", data: chat });
  //     }
  //   }
  //   if (Platform.OS != "ios") {
  //     Notifications.dismissAllNotificationsAsync();
  //   }
  // }, []);

  React.useEffect(() => {
    callReducer({ dispatch: "CLEAR_CHAT_UNREAD", data: id });
  }, []);

  React.useLayoutEffect(() => {
    if (!chat) {
      const { recvr } = route.params;
      navigation.setOptions({
        title: `${recvr.first_name} ${recvr.last_name}`,
      });
    }

    navigation.setOptions({
      headerLeft: () => (
        <Button
          transparent
          onPress={() => {
            get.send("/api/chats", "UPDATE_CHATS");
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
                const body = { recvr_id: id, notifications: 1 };
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
                const body = { recvr_id: id, notifications: 2 };
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
  }, [state.chats]);

  const [opMessages, setData] = React.useState([]);

  const start = (data) => {
    const type = 0;
    const date = Date.now();
    const opMessage = { id: date, user_id, type, data };
    setData([...opMessages, opMessage]);

    const body = { recvr_id: id, data };
    send("/api/chats", "UPDATE_CHATS", body);
  };

  const startWithImage = (formData) => {
    const type = 0;
    const date = Date.now();
    const opMessage = { id: date, user_id, type, data: "Uploading..." };
    setData([...opMessages, opMessage]);

    formData.append("id", chat_id);
    formData.append("recvr_id", id);
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
        <MessageListComponent
          onSubmit={start}
          onImage={startWithImage}
          data={opMessages}
        />
        {/* <MessageFormComponent onSubmit={start} onImage={startWithImage} /> */}
      </KeyboardAvoidingView>
    );
  }

  const { chat_id, messages } = chat;

  const onSubmit = (data) => {
    if (data) {
      const date = Date.now();
      const opBody = { id: date, type: 0, recvr_id: id, data, user_id };
      callReducer({ dispatch: "ADD_OPTIMISTIC_MESSAGE", data: opBody });

      const body = { id: chat_id, type: 0, recvr_id: id, data, user_id };
      send(`/api/chats/${id}`, "UPDATE_CHAT", body);
    }
  };

  const onImage = (formData) => {
    const date = Date.now();
    const opBody = {
      id: date,
      type: 0,
      recvr_id: id,
      data: "Uploading... ",
      user_id,
    };
    callReducer({ dispatch: "ADD_OPTIMISTIC_MESSAGE", data: opBody });

    formData.append("id", chat_id);
    formData.append("recvr_id", id);
    send(`/api/chats/${id}`, "UPDATE_CHAT", formData);
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
