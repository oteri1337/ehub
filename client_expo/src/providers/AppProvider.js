import React from "react";
import { AsyncStorage } from "react-native";
import reducer from "./reducers/rootReducer";
import { getRequest, sendRequest } from "./functions/http";

export const AppContext = React.createContext({});

export default function AppProvider({ children, initialState }) {
  const [state, callReducer] = React.useReducer(reducer, initialState || {});

  React.useEffect(() => {
    const asyncOperation = async () => {
      let response = await getRequest("/api/users/auth/status");
      if (response.errors.length === 0) {
        callReducer({ dispatch: "UPDATE_USER", data: response.data });
      }
    };

    asyncOperation();
  }, []);

  React.useEffect(() => {
    AsyncStorage.setItem("state", JSON.stringify(state));
  });

  return (
    <AppContext.Provider value={{ state, callReducer }}>
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

  return { state, fetching, response };
}

export function sendRequestThenDispatch(url, dispatch) {
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
  };

  return { state, fetching, response, send };
}
