import React from "react";
import Constants from "expo-constants";
import { Vibration } from "react-native";
import reducer from "./reducers/rootReducer";
// import * as Notifications from "expo-notifications";
import { getRequest, sendRequest } from "./functions";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { NOTIFICATIONS, getAsync, askAsync } from "expo-permissions";

export const Store = React.createContext({});

export default function AppProvider({ children, initialState = {} }) {
  const [state, callReducer] = React.useReducer(reducer, {});

  React.useEffect(() => {
    // if (Object.keys(initialState).length) {
    //   callReducer({dispatch: "UPDATE_STATE", data: initialState});
    // }

    const loadPersisted = async () => {
      let data = await AsyncStorage.getItem("state");

      if (data) {
        data = JSON.parse(data);

        console.log("ap", data);

        callReducer({ dispatch: "UPDATE_STATE", data });
      }
    };

    loadPersisted();
  }, []);

  React.useEffect(() => {
    // let debounceTime = setTimeout(() => {
    AsyncStorage.setItem("state", JSON.stringify(state));
    // }, 1000);
    // return () => {
    //   clearTimeout(debounceTime);
    // };
  }, [state]);

  // React.useEffect(() => {
  //   const asyncOperation = async () => {
  //     const network = await NetInfo.fetch();

  //     if (network.isConnected) {
  //       let response = await getRequest("/api/users/auth/status");
  //       if (response.errors.length === 0) {
  //         callReducer({ dispatch: "UPDATE_USER", data: response.data });
  //       }
  //     } else {
  //       console.log("not connected");
  //     }
  //   };

  //   asyncOperation();
  // }, []);

  const signOut = () => {
    callReducer({ dispatch: "UPDATE_USER", data: false });
    getRequest("/api/users/auth/signout");
  };

  const dispatch = (action) => {
    if (typeof action == "function") {
      return action(callReducer, state);
    }

    // callReducer(action);
  };

  return (
    <Store.Provider value={{ state, dispatch, callReducer, signOut }}>
      {children}
    </Store.Provider>
  );
}

export const connect = (mapStateToProps, mapDispatchToProps, Component) => {
  return class extends React.Component {
    static contextType = Store;

    render() {
      const { state, dispatch } = this.context;

      let props = {};

      props = { ...mapStateToProps(state), ...mapDispatchToProps(dispatch) };

      return <Component {...this.props} {...props} />;
    }
  };
};

export const getRequestThenDispatch = (starturl = "", startdispatch = "") => {
  let initialState = false;

  if (starturl.length && startdispatch.length) {
    initialState = true;
  }

  const { state, callReducer } = React.useContext(Store);

  const [refreshing, setRefreshing] = React.useState(initialState);

  // const defaultResponse = { errors: [], data: {}, message: "" };
  // const [response, setResponse] = React.useState(defaultResponse);

  React.useEffect(() => {
    const as = async () => {
      if (starturl.length && startdispatch.length) {
        let fetchResponse = await getRequest(starturl);
        if (fetchResponse.errors.length === 0) {
          callReducer({ dispatch: startdispatch, data: fetchResponse.data });
          setRefreshing(false);
        }
      }
    };

    as();
  }, []);

  const send = async (url, dispatch) => {
    setRefreshing(true);
    // setResponse(defaultResponse);

    let fetchResponse = await getRequest(url);

    setRefreshing(false);
    //  setResponse(fetchResponse);

    if (fetchResponse.errors.length === 0) {
      callReducer({ dispatch, data: fetchResponse.data });
    }
  };

  return { state, refreshing, callReducer, send };
};

export const sendRequestThenDispatch = () => {
  const { state, callReducer } = React.useContext(Store);
  const [refreshing, setRefreshing] = React.useState(false);

  const send = async (url, dispatch, body, method, onSuccess) => {
    onSuccess = onSuccess ?? function () {};

    setRefreshing(true);

    const fetchResponse = await sendRequest(url, body, method);

    setRefreshing(false);

    if (fetchResponse.errors.length === 0) {
      callReducer({ dispatch, data: fetchResponse.data });
      if (fetchResponse.message.length) {
        alert(fetchResponse.message);
        onSuccess();
      }
    } else {
      alert(fetchResponse.errors[0]);
    }

    return fetchResponse;
  };

  return { state, refreshing, callReducer, send };
};

export const useNotification = () => {
  const navigation = useNavigation();
  const { callReducer, send } = getRequestThenDispatch();

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await getAsync(NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await askAsync(NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      // if (!state.user.expo_push_token.length) {
      try {
        const expo_push_token = await Notifications.getExpoPushTokenAsync();

        const url = "/api/users/auth/pushtoken";

        const data = { expo_push_token: expo_push_token.data };

        sendRequest(url, data, "PATCH");
      } catch (error) {
        console.log(error);
        // alert(error, "You will not be able to recieve notifications");
      }
      // }

      // this.setState({ expoPushToken: token });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    // if (Platform.OS === "android") {
    //   Notifications.createChannelAndroidAsync("default", {
    //     name: "default",
    //     sound: true,
    //     priority: "max",
    //     vibrate: [0, 250, 250, 250],
    //   });
    // }
  };

  const respL = ({ notification }) => {
    const { data } = notification.request.content;

    if (data.dispatch == "ADD_MESSAGE_TO_CHAT") {
      callReducer({ dispatch: data.dispatch, data: data.data });
      navigation.navigate("ChatsReadPage", data.data);
      send("/api/chats", "UPDATE_CHATS");
      // navigation.navigate("ChatsListPage");
    }

    if (data.dispatch == "ADD_COMMENT_TO_TOPIC") {
      callReducer({ dispatch: data.dispatch, data: data.data });
      navigation.navigate("TopicsReadPage", { id: data.data.topic_id });
      send("/api/topics", "UPDATE_TOPICS");
      // navigation.navigate("TopicsListPage");
    }

    if (data.dispatch == "ADD_COMMENT_TO_EVENT") {
      // navigation.navigate("EventsListPage");
      callReducer({ dispatch: data.dispatch, data: data.data });
      navigation.navigate("EventsReadPage", { id: data.data.event_id });
      send("/api/events", "UPDATE_EVENTS");
    }

    Notifications.dismissAllNotificationsAsync();
  };

  const recvL = async ({ request }) => {
    const { data } = request.content;
    if (data.dispatch) {
      callReducer({ dispatch: data.dispatch, data: data.data });
    }

    Vibration.vibrate();
    // play sound
  };

  React.useEffect(() => {
    (async () => {
      registerForPushNotificationsAsync();

      try {
        // Notifications.removeAllNotificationListeners();
      } catch (e) {}

      Notifications.addNotificationReceivedListener(recvL);
      Notifications.addNotificationResponseReceivedListener(respL);

      return () => {
        // s1.remove();
        // s2.remove();
        // Notifications.removeAllNotificationListeners();
      };
    })();

    return () => {
      console.log("removing listeners 2");
    };
  }, []);
};
