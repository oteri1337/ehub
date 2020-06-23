import React from "react";
import { AsyncStorage } from "react-native";
import reducer from "./reducers/rootReducer";
import NetInfo from "@react-native-community/netinfo";
import { getRequest, sendRequest, debounce } from "./functions";

export const AppContext = React.createContext({});

export default function AppProvider({ children, initialState }) {
  const [state, callReducer] = React.useReducer(reducer, initialState || {});

  React.useEffect(() => {
    // console.log("state changed");
    let debounceTime = setTimeout(() => {
      // console.log("caching state");
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

  const getRequestThenDispatch = (starturl, startdispatch) => {
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

      // send(starturl, startdispatch);
    }, []);

    return { refreshing, response, send };
  };

  const sendRequestThenDispatch = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const defaultResponse = { errors: [], data: {}, message: "" };
    const [response, setResponse] = React.useState(defaultResponse);

    const send = async (url, dispatch, body, method) => {
      setRefreshing(true);
      setResponse(defaultResponse);

      const fetchResponse = await sendRequest(url, body, method);
      console.log(fetchResponse);

      setResponse(fetchResponse);
      setRefreshing(false);

      if (fetchResponse.errors.length === 0) {
        callReducer({ dispatch, data: fetchResponse.data });
        if (fetchResponse.message.length) {
          alert(fetchResponse.message);
        }
      } else {
        alert(fetchResponse.errors[0]);
      }
    };

    return { refreshing, response, send };
  };

  return (
    <AppContext.Provider
      value={{
        state,
        users: state.users,
        callReducer,
        getRequestThenDispatch,
        sendRequestThenDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// export function getRequestThenDispatch(url, dispatch, prop) {
//   const { state, callReducer } = React.useContext(AppContext);
//   const [fetching, setFetching] = React.useState(true);
//   const [response, setResponse] = React.useState({
//     errors: [],
//     message: "",
//     data: {},
//   });

//   React.useEffect(() => {
//     async function asyncOperation() {
//       const response = await getRequest(url);
//       setFetching(false);
//       setResponse(response);
//       if (response.errors.length === 0) {
//         callReducer({ dispatch, data: response.data });
//       }
//     }
//     asyncOperation();
//   }, [prop]);

//   return { state, fetching, response, callReducer };
// }

// export function sendRequestThenDispatch(url, dispatch, onError) {
//   const defResp = {
//     errors: [],
//     message: "",
//     data: {},
//   };
//   const { state, callReducer } = React.useContext(AppContext);
//   const [fetching, setFetching] = React.useState(false);
//   const [response, setResponse] = React.useState(defResp);

//   const send = async (body, method) => {
//     setFetching(true);

//     setResponse(defResp);

//     const response = await sendRequest(url, body, method);

//     setFetching(false);

//     setResponse(response);

//     if (response.errors.length === 0) {
//       callReducer({ dispatch, data: response.data });
//     }

//     if (response.errors.length) {
//       setTimeout(() => {
//         Toast.show({ text: response.errors[0].toUpperCase(), duration: 2500 });
//       }, 700);
//     }

//     if (response.message) {
//       setTimeout(() => {
//         Toast.show({ text: response.message, duration: 2500 });
//       }, 700);
//     }

//     return response;
//   };

//   return { state, fetching, response, send };
// }
