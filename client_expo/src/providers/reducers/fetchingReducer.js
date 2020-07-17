const defaultState = { topics: false };

function fetchingReducer(state = defaultState, action) {
  switch (action.type) {
    case "UPDATE_TOPICS_FETCHING":
      return {
        ...state,
        topics: action.data,
      };
    default:
      return state;
  }
}

export default fetchingReducer;
