const defaultState = { term: "", refreshing: false };

function searchReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_SEARCH_TERM":
      return {
        ...state,
        term: action.data,
      };
    case "UPDATE_SEARCH_REFRESHING":
      return {
        ...state,
        refreshing: action.data,
      };
    default:
      return state;
  }
}

export default searchReducer;
