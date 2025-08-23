function savedReducer(state = { data: [], object: {} }, action) {
  switch (action.dispatch) {
    case "SAVE_PDF":
      return {
        ...state,
        data: [...state.data, action.data],
        object: {
          ...state.object,
          [action.data.id]: action.data,
        },
      };
    case "REMOVE_PDF":
      const data = state.data.filter((book) => book.id != action.data.id);

      const object = { ...state.object };

      delete object[action.data.id];

      return {
        data,
        object,
      };
    default:
      return state;
  }
}

export default savedReducer;
