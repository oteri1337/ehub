const defaultState = { data: [], object: {}, search_keys: {} };

function pdfsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_PDFS":
      return action.data;
    case "UPDATE_PDF":
      return {
        ...state,
        object: {
          [action.data.slug]: action.data,
        },
      };
    case "UPDATE_PDFS_PAGE":
      return {
        ...action.data,
        data: [...state.data, ...action.data.data],
      };
    default:
      return state;
  }
}

export default pdfsReducer;
