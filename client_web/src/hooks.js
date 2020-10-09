import React from "react";
import { Store } from "./providers/AppProvider";
import { getRequest, sendRequest, sendFormRequest } from "./functions";

export const getNavClassName = () => {
  const [className, setClassName] = React.useState("app-no-shadow");

  const eventListener = () => {
    if (pageYOffset === 0) {
      setClassName("app-no-shadow");
    } else {
      setClassName("");
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", eventListener);
    return () => {
      window.removeEventListener("scroll", eventListener);
    };
  }, []);

  return className;
};

export function useRequestAndDispatch() {
  const [fetching, setFetching] = React.useState(false);
  const { state, callReducer } = React.useContext(Store);

  const getRequestThenDispatch = async (url, dispatch) => {
    setFetching(true);
    const response = await getRequest(url);
    setFetching(false);
    if (response.errors.length === 0) {
      callReducer({ dispatch, data: response.data });
    }
  };

  return {
    fetching,
    getRequestThenDispatch,
    state,
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

export function useFetch() {
  const blank = {
    fetching: false,
    errors: [],
    message: "",
  };
  const [request, setResponse] = React.useState(blank);

  return {
    request,
    setResponse,
    blank,
  };
}
