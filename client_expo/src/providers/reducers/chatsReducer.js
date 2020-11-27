import { removeDuplicateObjects } from "../functions";
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

    case "ADD_MESSAGE_TO_CHAT":
      const key = parseInt(action.data.user_id);
      const chat = state.object[key];

      return {
        ...state,
        object: {
          ...state.object,
          [key]: {
            ...state.object[key],
            messages: [action.data, ...chat.messages],
            //messsages: removeDuplicateObjects(chat.messages, action.data),
            next_page_url: `/api/chats/${key}?page=2`,
            unread_count: state.object[key].unread_count + 1,
          },
        },
      };

    case "UPDATE_CHAT_MESSAGES_PAGE":
      return {
        ...state,
        object: {
          ...state.object,
          [action.data.recvr_id]: {
            ...action.data,
            messages: [
              ...state.object[action.data.recvr_id].messages,
              ...action.data.messages,
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

    case "ADD_OPTIMISTIC_MESSAGE":
      const keyo = parseInt(action.data.recvr_id);
      const chato = state.object[keyo];

      let slo = chato.messages;

      // if (chato.messages.length == 15) {
      //   slo = chato.messages.slice(1, 15);
      // } else if (chato.messages.length > 14) {
      //   slo = chato.messages.slice(1, 14);
      // } else if (chato.messages.length < 14) {
      //   slo = chato.messages;
      // }

      return {
        ...state,
        object: {
          ...state.object,
          [keyo]: {
            ...state.object[keyo],
            messages: [action.data, ...slo],
            next_page_url: `/api/chats/${keyo}?page=2`,
            unread_count: state.object[keyo].unread_count + 1,
          },
        },
      };

    default:
      return state;
  }
}

export default chatsReducer;
