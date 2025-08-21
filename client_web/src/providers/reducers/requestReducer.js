const defaultState = { errors: [], fetching: false, message: "" };

function programsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_FETCHING":
      return {
        ...state,
        fetching: action.data
      };
    default:
      return state;
  }
}

export default programsReducer;
