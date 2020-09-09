const defaultState = { data: [], object: {}, search_keys: {} };

function chatsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_CHATS":
      if (JSON.stringify(state) === JSON.stringify(action.data)) {
        return state;
      } else {
        return action.data;
      }
    case "UPDATE_CHATS_PAGE":
      return {
        ...action.data,
        data: [...state.data, ...action.data.data],
        object: { ...state.object, ...action.data.object },
      };
    case "UPDATE_CHAT_MESSAGES_PAGE":
      return {
        ...state,
        object: {
          ...state.object,
          [action.data.recvr_id]: {
            ...action.data,
            messages: [
              ...action.data.messages.reverse(),
              ...state.object[action.data.recvr_id].messages,
            ],
          },
        },
      };
    case "UPDATE_CHAT":
      return {
        ...state,
        object: {
          ...state.object,
          [action.data.recvr_id]: action.data,
        },
      };

    case "CLEAR_UNREAD":
      return {
        ...state,
        object: {
          ...state.object,
          [action.data.recvr_id]: {
            ...state.object[action.data.recvr_id],
            unread_count: 0,
          },
        },
      };

    case "ADD_MESSAGE_TO_CHAT":
      const key = parseInt(action.data.user_id);
      const chat = state.object[key];

      let sl = [];

      const { messages } = chat;

      if (messages.length == 12) {
        sl = messages.slice(1, 12);
      }

      if (messages.length > 12) {
        sl = messages.reverse().slice(0, 11).reverse();
      }

      if (messages.length < 12) {
        sl = messages;
      }

      return {
        ...state,
        object: {
          ...state.object,
          [key]: {
            ...state.object[key],
            messages: [...sl, action.data],
            next_page_url: `/api/chats/${key}?page=2`,
            unread_count: state.object[key].unread_count + 1,
          },
        },
      };

    default:
      return state;
  }
}

export default chatsReducer;
