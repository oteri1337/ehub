const defaultState = { data: [], object: {}, search_keys: {} };

function eventsReducer(state = defaultState, action) {
  switch (action.dispatch) {
    case "UPDATE_EVENTS":
      if (JSON.stringify(state) === JSON.stringify(action.data)) {
        return state;
      } else {
        return action.data;
      }
    case "UPDATE_EVENT":
      return {
        ...state,
        object: {
          [action.data.slug]: {
            ...action.data,
            comments: action.data.comments.reverse(),
          },
        },
      };
    case "UPDATE_EVENTS_PAGE":
      return {
        ...action.data,
        data: [...state.data, ...action.data.data],
      };
    case "UPDATE_EVENT_COMMENTS_PAGE":
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
    case "ADD_COMMENT_TO_EVENT":
      const slug = action.data.event.slug;

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
            next_page_url: action.data.event.next_page_url,
            comments: [...sl, action.data],
          },
        },
      };
    default:
      return state;
  }
}

export default eventsReducer;
