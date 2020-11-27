const defaultState = {};

function topicsunreadReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "ADD_COMMENT_TO_TOPIC":
      return {
        ...state,
        [action.data.id]: state[action.data.id] + 1 ?? 1,
      };
    case "CLEAR_TOPIC_UNREAD":
      return {
        ...state,
        [action.data.id]: 0,
      };
    default:
      return state;
  }
}

export default topicsunreadReducer;
