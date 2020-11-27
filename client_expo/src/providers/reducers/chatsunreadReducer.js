const defaultState = {};

function chatsunreadReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "ADD_MESSAGE_TO_CHAT":
      return {
        ...state,
        [action.data.id]: state[action.data.id] + 1 ?? 1,
      };
    case "CLEAR_CHAT_UNREAD":
      return {
        ...state,
        [action.data.id]: 0,
      };
    default:
      return state;
  }
}

export default chatsunreadReducer;
