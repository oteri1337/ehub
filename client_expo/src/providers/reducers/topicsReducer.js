const defaultState = { data: [], object: {}, search_keys: {} };

function topicsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_TOPICS":
      if (JSON.stringify(state) === JSON.stringify(action.data)) {
        return state;
      } else {
        return action.data;
      }
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
          [action.data.slug]: action.data,
        },
      };
    case "ADD_COMMENT_TO_TOPIC":
      const slug = action.data.topic.slug;

      return {
        ...state,
        object: {
          ...state.object,
          [slug]: {
            ...state.object[slug],
            comments: [...state.object[slug].comments, action.data],
          },
        },
      };
    case "UPDATE_TOPIC":
      return {
        ...state,
        object: {
          ...state.object,
          [action.data.slug]: action.data,
        },
      };
    // case "ADD_COMMENT_TO_TOPIC":
    //   const { slug, comment } = action.data;
    //   return {
    //     ...state,
    //     object: {
    //       ...state.object,
    //       [slug]: {
    //         ...state.object[slug],
    //         comments: [...state.object[slug].comments, comment],
    //       },
    //     },
    //   };
    default:
      return state;
  }
}

export default topicsReducer;
