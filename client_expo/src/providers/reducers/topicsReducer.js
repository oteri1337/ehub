const defaultState = { data: [], object: {}, search_keys: {} };

function newsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_TOPICS":
      return action.data;
    case "UPDATE_TOPIC":
      return {
        ...state,
        object: {
          ...state.object,
          [action.data.slug]: action.data,
        },
      };
    case "ADD_COMMENT_TO_TOPIC":
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
    case "UPDATE_TOPICS_PAGE":
      return {
        ...action.data,
        data: [...state.data, ...action.data.data],
      };
    default:
      return state;
  }
}

export default newsReducer;
