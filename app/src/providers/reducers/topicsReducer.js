const defaultState = { data: [], object: {}, search_keys: {} };

function topicsReducer(state = defaultState, action) {
  switch (action.dispatch || action.type) {
    case "UPDATE_TOPICS":
      if (JSON.stringify(state) === JSON.stringify(action.data)) {
        return state;
      } else {
        return action.data;
      }
    case "UPDATE_TOPIC":
      return {
        ...state,
        object: {
          ...state.object,
          [action.data.id]: {
            ...action.data,
            comments: action.data.comments,
          },
        },
      };
    case "UPDATE_TOPICS_PAGE":
      return {
        ...action.data,
        data: [...state.data, ...action.data.data],
        object: { ...state.object, ...action.data.object },
      };
    case "ADD_TOPIC":
      const sliced = state.data.slice(0, state.data.length - 1);
      return {
        ...state,
        data: [action.data, ...sliced],
        object: {
          ...state.object,
          [action.data.id]: action.data,
        },
      };
    case "UPDATE_TOPIC_COMMENTS_PAGE":
      return {
        ...state,
        object: {
          ...state.object,
          [action.data.id]: {
            ...action.data,
            comments: [
              ...state.object[action.data.id].comments,
              ...action.data.comments,
            ],
          },
        },
      };

    case "ADD_COMMENT_TO_TOPIC":
      const { topic_id } = action.data;
      const { comments } = state.object[topic_id];

      return {
        ...state,
        object: {
          ...state.object,
          [topic_id]: {
            ...state.object[topic_id],
            next_page_url: `/api/topics/${topic_id}?page=2`,
            comments: [action.data, ...comments],
          },
        },
      };

    default:
      return state;
  }
}

export default topicsReducer;
