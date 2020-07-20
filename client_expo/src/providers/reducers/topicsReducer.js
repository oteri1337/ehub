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
            comments: action.data.comments.reverse(),
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
              ...action.data.comments.reverse(),
              ...state.object[action.data.id].comments,
            ],
          },
        },
      };

    case "ADD_COMMENT_TO_TOPIC":
      const slug = action.data.topic_id;

      let sl = [];

      const { comments } = state.object[slug];

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
            next_page_url: `/api/topics/${slug}?page=2`,
            comments: [...sl, action.data],
          },
        },
      };

    default:
      return state;
  }
}

export default topicsReducer;
