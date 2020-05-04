import React from "react";
import reducer from "./reducers/rootReducer";
import { getRequest, sendRequest, sendFormRequest } from "../functions";

export const AppContext = React.createContext({});

function AppProvider({ children, initialState }) {
  const [fetching, setFetching] = React.useState(false);

  const [state, callReducer] = React.useReducer(reducer, initialState || {});

  React.useEffect(() => {
    const getBackendState = async () => {
      let response;

      response = await getRequest("/api/admins/auth/status");
      if (response.errors.length === 0) {
        callReducer({ dispatch: "UPDATE_ADMIN", data: response.data });
      }
    };
    getBackendState();
  }, []);

  React.useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  });

  const sendRequestThenDispatch = () => {
    const defResp = { errors: [], message: "", data: {} };
    const [response, setResponse] = React.useState(defResp);

    const callBack = async (url, dispatch, body, onSuccess, type = "POST") => {
      onSuccess = onSuccess || function () {};
      setFetching(true);
      setResponse(defResp);
      try {
        const newResponse = await sendRequest(url, body, type);
        setResponse(newResponse);
        setFetching(false);
        if (newResponse.errors.length === 0) {
          callReducer({ dispatch, data: newResponse.data });
          onSuccess(newResponse);
        }
      } catch (e) {
        console.log(e);
      }
    };

    return {
      response,
      callBack,
    };
  };

  const value = {
    state,
    fetching,
    callReducer,
    sendRequestThenDispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function sendFormRequestThenDispatch() {
  const { state, callReducer } = React.useContext(AppContext);
  const [request, setRequest] = React.useState({
    fetching: false,
    errors: [],
    message: "",
  });

  const callBack = async (url, dispatch, body, onSuccess, type = "POST") => {
    onSuccess = onSuccess || function () {};
    setRequest({
      fetching: true,
      errors: [],
      message: "",
    });
    const { errors, data, message, jsError } = await sendFormRequest(
      url,
      body,
      type
    );
    setRequest({
      fetching: false,
      errors,
      message,
    });
    if (errors.length === 0) {
      callReducer({ dispatch, data });
      onSuccess(data);
    }
  };

  return {
    state,
    request,
    callBack,
  };
}

export function sendRequestThenDispatch() {
  const { state, callReducer } = React.useContext(AppContext);
  const [request, setRequest] = React.useState({
    fetching: false,
    errors: [],
    message: "",
  });

  const callBack = async (url, dispatch, body, onSuccess, type = "POST") => {
    onSuccess = onSuccess || function () {};
    setRequest({
      fetching: true,
      errors: [],
      message: "",
    });
    try {
      const { errors, data, message } = await sendRequest(url, body, type);
      setRequest({
        fetching: false,
        errors,
        message,
      });
      if (errors.length === 0) {
        callReducer({ dispatch, data });
        onSuccess(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    state,
    request,
    callBack,
    callReducer,
  };
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

export default AppProvider;
