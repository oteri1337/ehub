const defaultState = { data: [], object: {}, search_keys: {} };

function topicsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_TOPICS":
      return action.data;
    case "UPDATE_TOPIC":
      return {
        ...state,
        object: {
          [action.data.id]: action.data,
        },
      };
    case "UPDATE_TOPICS_PAGE":
      return {
        ...action.data,
        data: [...state.data, ...action.data.data],
      };
    default:
      return state;
  }
}

export default topicsReducer;
