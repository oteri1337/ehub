function savedReducer(state = {}, action) {
  switch (action.dispatch) {
    case "SAVE_PDF":
      return {
        ...state,
        [action.data.id]: action.data,
      };
    case "REMOVE_PDF":
      const newState = { ...state };

      delete newState[action.data.id];

      return newState;

    default:
      return state;
  }
}

export default savedReducer;
