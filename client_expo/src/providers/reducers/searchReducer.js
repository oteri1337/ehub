const defaultState = { term: "", fetching: false };

function searchReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_SEARCH_TERM":
      return {
        ...state,
        term: action.data,
      };
    case "UDPATE_SEARCH_FETCHING":
      return {
        ...state,
        fetching: action.data,
      };
    default:
      return state;
  }
}

export default searchReducer;
