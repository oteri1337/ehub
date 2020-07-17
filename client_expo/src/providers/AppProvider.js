import React from "react";
import { AsyncStorage, View, Text } from "react-native";
import reducer from "./reducers/rootReducer";
import NetInfo from "@react-native-community/netinfo";
import { getRequest, sendRequest } from "./functions";

export const Store = React.createContext({});

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
    // console.log(fetchResponse);

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
