import React from "react";
import { AsyncStorage } from "react-native";
import reducer from "./reducers/rootReducer";
import NetInfo from "@react-native-community/netinfo";
import { getRequest, sendRequest } from "./functions";

export const AppContext = React.createContext({});

export default function AppProvider({ children, initialState }) {
  const [state, callReducer] = React.useReducer(reducer, initialState || {});

  React.useEffect(() => {
    let debounceTime = setTimeout(() => {
      AsyncStorage.setItem("state", JSON.stringify(state));
    }, 5000);
    return () => {
      clearTimeout(debounceTime);
    };
  }, [state]);

  React.useEffect(() => {
    const asyncOperation = async () => {
      const network = await NetInfo.fetch();

      if (network.isConnected) {
        console.log("connected");
        let response = await getRequest("/api/users/auth/status");
        if (response.errors.length === 0) {
          callReducer({ dispatch: "UPDATE_USER", data: response.data });
        }
      } else {
        console.log("not connected");
      }
    };

    asyncOperation();
  }, []);

  const signOut = () => {
    callReducer({ dispatch: "UPDATE_USER", data: false });
    getRequest("/api/users/auth/signout");
  };

  return (
    <AppContext.Provider value={{ state, callReducer, signOut }}>
      {children}
    </AppContext.Provider>
  );
}

export const getRequestThenDispatch = (starturl, startdispatch) => {
  const { state, callReducer } = React.useContext(AppContext);
  const defaultResponse = { errors: [], data: {}, message: "" };
  const [refreshing, setRefreshing] = React.useState(true);
  const [response, setResponse] = React.useState(defaultResponse);

  const send = async (url, dispatch) => {
    setRefreshing(true);
    setResponse(defaultResponse);

    let fetchResponse = await getRequest(url);

    setRefreshing(false);
    setResponse(fetchResponse);

    if (fetchResponse.errors.length === 0) {
      callReducer({ dispatch, data: fetchResponse.data });
    }
  };

  React.useEffect(() => {
    const as = async () => {
      let fetchResponse = await getRequest(starturl);
      if (fetchResponse.errors.length === 0) {
        callReducer({ dispatch: startdispatch, data: fetchResponse.data });
        setRefreshing(false);
      }
    };

    as();
  }, []);

  return { state, refreshing, response, send };
};

export const sendRequestThenDispatch = () => {
  const { state, callReducer } = React.useContext(AppContext);
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
  };

  return { state, refreshing, send };
};
