const defaultState = 0;

function unreadReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "CLEAR_UNREAD":
      return 0;
    case "ADD_MESSAGE_TO_CHAT":
      return state + 1;
    case "UPDATE_CHATS_PAGE":
    default:
      return state;
  }
}

export default unreadReducer;
