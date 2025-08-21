import React from "react";
import reducer from "./reducers/rootReducer";
import { getRequest, sendRequest, sendFormRequest } from "../functions";

export const Store = React.createContext({});

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

  return <Store.Provider value={value}>{children}</Store.Provider>;
}

export function sendUploadRequestThenDispatch() {
  const { state, callReducer } = React.useContext(Store);
  const [fetching, setFetching] = React.useState(false);
  const [progress, setProgress] = React.useState("0%");
  const [response, setResponse] = React.useState({ errors: [], message: "" });

  const callBack = async (url, dispatch, body, onSuccess) => {
    onSuccess = onSuccess || function () {};

    const xhr = new XMLHttpRequest();

    xhr.open("POST", url);

    xhr.withCredentials = true;

    setFetching(true);

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        let pro = ((e.loaded / e.total) * 100).toFixed(2) + "%";

        setProgress(pro);
      }
    });

    xhr.addEventListener("readystatechange", ({ target }) => {
      if (target.response && target.readyState == 4) {
        const data = JSON.parse(target.response);
        setResponse(data);
        setFetching(false);
        if (data.errors.length === 0) {
          callReducer({ dispatch, data });
          onSuccess(data);
        }
      }
    });

    xhr.send(body);
  };

  return {
    state,
    progress,
    response,
    fetching,
    callBack,
  };
}

export function sendFormRequestThenDispatch() {
  const { state, callReducer } = React.useContext(Store);
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
    const { errors, data, message, jsError } = await sendFormRequest(url, body);
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
  const { state, callReducer } = React.useContext(Store);
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
  const { state, callReducer } = React.useContext(Store);
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
