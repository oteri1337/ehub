const defaultState = { data: [], object: {}, search_keys: {} };

function newsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_NEWS":
      return action.data;
    case "UPDATE_NEWS_IN_NEWS":
      return {
        ...state,
        object: {
          [action.data.id]: action.data,
        },
      };
    case "UPDATE_NEWS_PAGE":
      return {
        ...action.data,
        data: [...state.data, ...action.data.data],
      };
    default:
      return state;
  }
}

export default newsReducer;
