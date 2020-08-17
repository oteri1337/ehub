import React from "react";

// actions
const updateTopics = (data) => ({
  type: "UPDATE_TOPICS",
  data,
});

const updateTopicsFetching = (data) => ({
  type: "UPDATE_TOPICS_FETCHING",
  data,
});

// thunk action
const fetchTopics = async () => {
  return async (dispatch) => {
    dispatch({ type: "UPDATE_TOPICS_FETCHING", data: true });

    let response = await fetch("/api/topics");
    response = await response.json();
    if (response.errors.length === 0) {
      dispatch(updateTopics(response.data));
    }
  };
};

// store
const Store = React.createContext();

// provider, reducer and middlewares
const AppProvider = ({ children, initialState }) => {
  const [state, callReducer] = React.useReducer(reducer, initialState || {});

  const dispatch = (action) => {
    if (typeof action == "function") {
      action(callReducer);
    }

    callReducer(action);
  };

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

// connect
function connect(mapStateToProps, mapDispatchToProps, Component) {
  const { state, dispatch } = React.useContext(Store);

  let props = {};

  props = { ...mapStateToProps(state), ...mapDispatchToProps(dispatch) };

  return <Component {...props} />;
}

// components
const TopicsComponent = ({ topics, fetchTopics }) => {
  React.useEffect(() => {
    (async () => {
      fetchTopics();
    })();
  }, []);

  return (
    <AppProvider>
      <div>{topics}</div>
    </AppProvider>
  );
};

const mapState = (state) => ({ topics: state.topics });

const mapDispatch = (dispatch) => ({
  fetchTopics: dispatch(fetchTopics),
});

export default connect(mapState, mapDispatch, TopicsComponent);
