import React from "react";
import { AsyncStorage } from "react-native";
import reducer from "./reducers/rootReducer";
import { getRequest, sendRequest } from "./functions/http";
import { Toast } from "native-base";

export const AppContext = React.createContext({});

export default function AppProvider({ children, initialState }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [state, callReducer] = React.useReducer(reducer, initialState || {});

  React.useEffect(() => {
    const asyncOperation = async () => {
      let response = await getRequest("/api/users/auth/status");
      if (response.errors.length === 0) {
        if (typeof state.user != typeof response.data) {
          callReducer({ dispatch: "UPDATE_USER", data: response.data });
        }
      }
    };

    asyncOperation();
  }, []);

  React.useEffect(() => {
    AsyncStorage.setItem("state", JSON.stringify(state));
  });

  const getRequestThenDispatch = async (url, dispatch) => {
    setRefreshing(true);
    const response = await getRequest(url);
    setRefreshing(false);
    if (!response.errors.length) {
      callReducer({ dispatch, data: response.data });
    }
    return response;
  };

  const sendRequestThenDispatch = async (url, dispatch, body, method) => {
    setRefreshing(true);
    const response = await sendRequest(url, body, method);
    setRefreshing(false);
    if (!response.errors.length) {
      callReducer({ dispatch, data: response.data });
    }
    return response;
  };

  return (
    <AppContext.Provider
      value={{
        state,
        topics: state.topics,
        refreshing,
        callReducer,
        getRequestThenDispatch,
        sendRequestThenDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function getRequestThenDispatch(url, dispatch, prop) {
  const { state, callReducer } = React.useContext(AppContext);
  const [fetching, setFetching] = React.useState(true);
  const [response, setResponse] = React.useState({
    errors: [],
    message: "",
    data: {},
  });

  React.useEffect(() => {
    async function asyncOperation() {
      const response = await getRequest(url);
      setFetching(false);
      setResponse(response);
      if (response.errors.length === 0) {
        callReducer({ dispatch, data: response.data });
      }
    }
    asyncOperation();
  }, [prop]);

  return { state, fetching, response, callReducer };
}

export function sendRequestThenDispatch(url, dispatch, onError) {
  const defResp = {
    errors: [],
    message: "",
    data: {},
  };
  const { state, callReducer } = React.useContext(AppContext);
  const [fetching, setFetching] = React.useState(false);
  const [response, setResponse] = React.useState(defResp);

  const send = async (body, method) => {
    setFetching(true);

    setResponse(defResp);

    const response = await sendRequest(url, body, method);

    setFetching(false);

    setResponse(response);

    if (response.errors.length === 0) {
      callReducer({ dispatch, data: response.data });
    }

    if (response.errors.length) {
      setTimeout(() => {
        Toast.show({ text: response.errors[0].toUpperCase(), duration: 2500 });
      }, 700);
    }

    if (response.message) {
      setTimeout(() => {
        Toast.show({ text: response.message, duration: 2500 });
      }, 700);
    }

    return response;
  };

  return { state, fetching, response, send };
}
