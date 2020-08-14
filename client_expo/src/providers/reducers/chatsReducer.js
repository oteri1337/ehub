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
          [action.data.chat_id]: {
            ...action.data,
            messages: [
              ...action.data.messages.reverse(),
              ...state.object[action.data.chat_id].messages,
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
    // case "ADD_COMMENT_TO_CHAT":
    //   const { slug, comment } = action.data;
    //   return {
    //     ...state,
    //     object: {
    //       ...state.object,
    //       [slug]: {
    //         ...state.object[slug],
    //         messages: [...state.object[slug].messages, comment],
    //       },
    //     },
    //   };
    case "ADD_MESSAGE_TO_CHAT":
      const slug = action.data.chat_id;

      let sl = [];

      const { messages } = state.object[slug];

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
          [slug]: {
            ...state.object[slug],
            next_page_url: `/api/chats/${slug}?page=2`,
            messages: [...sl, action.data],
          },
        },
      };

    default:
      return state;
  }
}

export default chatsReducer;
