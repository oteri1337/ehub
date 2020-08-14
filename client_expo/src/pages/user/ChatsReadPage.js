import React from "react";

import { Notifications } from "expo";
import Constants from "expo-constants";
import { Button, Icon } from "native-base";
import * as Permissions from "expo-permissions";
import { sendRequest } from "../../providers/functions";
import { KeyboardAvoidingView, Platform, Vibration } from "react-native";
import MessageListComponent from "../components/MessageListComponent";
import MessageFormComponent from "../components/MessageFormComponent";
import { sendRequestThenDispatch } from "../../providers/AppProvider";

function ChatsReadPage({ navigation, route }) {
  const { params } = route;

  const { state, callReducer, send } = sendRequestThenDispatch();

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      if (!state.user.expo_push_token.length) {
        const expo_push_token = await Notifications.getExpoPushTokenAsync();
        const response = await sendRequest(
          "/api/users/auth/pushtoken",
          {
            expo_push_token,
          },
          "PATCH"
        );
        console.log(response);

        // alert(expo_push_token, "send token to server");
      }

      // this.setState({ expoPushToken: token });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  const handleNotification = ({ data }) => {
    Vibration.vibrate();
    const id = Date.now();
    console.log(data);
    // callReducer({ dispatch: "ADD_MESSAGE_TO_CHAT", data: { id, ...data } });
    // this.setState({ notification: notification });
  };

  React.useEffect(() => {
    (async () => {
      registerForPushNotificationsAsync();
      Notifications.addListener(handleNotification);
    })();
  }, []);

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

  const { chat_id, recvr_id, messages } = chat;

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
