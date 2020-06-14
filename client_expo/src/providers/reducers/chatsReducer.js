const defaultState = { data: [], object: {}, search_keys: {} };

function chatsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_CHATS":
      return action.data;
    case "UPDATE_CHATS_PAGE":
      return {
        ...action.data,
        data: [...state.data, ...action.data.data],
        object: { ...state.object, ...action.data.object },
      };
    case "UPDATE_CHAT":
      return {
        ...state,
        object: {
          ...state.object,
          [action.data.recvr_id]: action.data,
        },
      };
    case "ADD_COMMENT_TO_CHAT":
      const { slug, comment } = action.data;
      return {
        ...state,
        object: {
          ...state.object,
          [slug]: {
            ...state.object[slug],
            comments: [...state.object[slug].comments, comment],
          },
        },
      };
    default:
      return state;
  }
}

export default chatsReducer;
