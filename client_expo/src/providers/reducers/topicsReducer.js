const defaultState = { data: [], object: {}, search_keys: {} };

function topicsReducer(state = defaultState, action) {
  switch (action.dispatch || action.type) {
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
    case "UPDATE_TOPIC_COMMENTS_PAGE":
      return {
        ...state,
        object: {
          [action.data.slug]: {
            ...action.data,
            comments: [
              ...action.data.comments.reverse(),
              ...state.object[action.data.slug].comments,
            ],
          },
        },
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

      const { comments } = state.object[slug];

      let sl;

      if (comments.length == 12) {
        sl = comments.slice(1, 12);
      }

      if (comments.length > 12) {
        sl = comments.reverse().slice(0, 11).reverse();
      }

      if (comments.length < 12) {
        sl = comments;
      }

      return {
        ...state,
        object: {
          ...state.object,
          [slug]: {
            ...state.object[slug],
            next_page_url: action.data.topic.next_page_url,
            comments: [...sl, action.data],
          },
        },
      };
    case "UPDATE_TOPIC":
      return {
        ...state,
        object: {
          ...state.object,
          [action.data.slug]: {
            ...action.data,
            comments: action.data.comments.reverse(),
          },
        },
      };
    default:
      return state;
  }
}

export default topicsReducer;
